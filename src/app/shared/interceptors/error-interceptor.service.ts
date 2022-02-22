import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, Subscriber} from "rxjs";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {AuthService} from "../services/auth.service";
import {TokenStorageService} from "../services/token-storage.service";

type CallerRequest = {
  subscriber: Subscriber<any>;
  failedRequest: HttpRequest<any>;
};

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  private refreshInProgress!: boolean;
  private requests: CallerRequest[] = [];

  constructor(private router: Router,
              private loaderService: NgxUiLoaderService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private httpClient: HttpClient) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/sign-in') >= 0) {
      return next.handle(req);
    }

    const observable = new Observable<HttpEvent<any>>((subscriber) => {
      const originalRequestSubscription = next.handle(req)
        .subscribe((response) => {
            subscriber.next(response);
          },
          (error) => {
            this.loaderService.stopLoader('app-body');
            if (error.status === 401) {
              this.handleUnauthorizedError(subscriber, req)
            } else if (error.status === 403) {
              this.router.navigate(['/error/forbidden']);
            } else if (error.status === 404) {
              this.router.navigate(['/error/not-found']);
            } else if (error.status === 500) {
              this.router.navigate(['/error/server-error']);
            } else {
              subscriber.error(error);
            }
          },
          () => {
            subscriber.complete();
          });

      return () => {
        originalRequestSubscription.unsubscribe();
      };
    });
    return observable;
  }

  private handleUnauthorizedError(subscriber: Subscriber<any>, request: HttpRequest<any>): void {
    this.requests.push({subscriber, failedRequest: request});
    if (!this.refreshInProgress && this.authService.isLoggedIn) {
      this.refreshInProgress = true;
      this.authService.refreshTokens(this.tokenStorage.getUser().userName, this.tokenStorage.getRefreshToken())
        .subscribe((res) => {
            this.tokenStorage.updateTokens(res.refreshToken, res.accessToken);
            this.repeatFailedRequests();
          },
          () => {
            this.refreshInProgress = false;
            this.tokenStorage.signOut()
          }, () => {
            this.refreshInProgress = false;
          });
    }
    // todo: in subscription in refreshtokens don't get data...don't understand why..
    if (this.refreshInProgress && request.url.indexOf('/refresh-token')){
      this.refreshInProgress = false;
      this.tokenStorage.signOut();
      this.router.navigate(["/"]);
    }
  }

  private repeatFailedRequests(): void {
    this.requests.forEach((c) => {
      this.repeatRequest(c.failedRequest, c.subscriber);
    });
    this.requests = [];
  }

  private repeatRequest(requestWithNewToken: HttpRequest<any>, subscriber: Subscriber<any>): void {
    this.httpClient.request(requestWithNewToken).subscribe((res) => {
        subscriber.next(res);
      },
      (err) => {
        if (err.status === 401) {
          this.tokenStorage.signOut();
        }
        subscriber.error(err);
      },
      () => {
        subscriber.complete();
      });
  }

}


export const ErrorInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
]
