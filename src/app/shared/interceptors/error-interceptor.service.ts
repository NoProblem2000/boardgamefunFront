import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return new Observable<HttpEvent<any>>((subscriber) => {
      const originalRequestSubscription = next.handle(req)
        .subscribe((response) => {
            subscriber.next(response);
          },
          (error) => {
            if (error.status === 403) {
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
  }
}

export const ErrorInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
]
