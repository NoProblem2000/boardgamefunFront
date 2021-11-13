import {Component, OnInit} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  NavigationStart,
  Router,
  UrlSegment
} from "@angular/router";
import {Breadcrumb} from "../breadcrumb";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];
  ownBreadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.breadcrumbs = [];
      }
      if (e instanceof ActivationEnd) {
        if (e.snapshot.data['breadcrumb']) {
          const breadcrumb = e.snapshot.data['breadcrumb'] as Breadcrumb;
          if (!breadcrumb.href) {
            const urls = this.getUrlPaths(e.snapshot);
            breadcrumb.href = '/' + urls.join('/');
          }
          this.breadcrumbs.unshift(breadcrumb);
        }
      }
      if (e instanceof NavigationEnd) {
        this.ownBreadcrumbs = JSON.parse(JSON.stringify(this.breadcrumbs));
      }
    });
  }

  private getUrlPaths(snapshot: ActivatedRouteSnapshot): string[] {
    let result: string[] = [];
    let segments = this.aggregateUrlSegments(snapshot, []);

    for (let i = 0; i < segments.length; i++) {
      result.push(segments[i].path);
    }

    return result;
  }

  private aggregateUrlSegments(snapshot: ActivatedRouteSnapshot, array: UrlSegment[]): UrlSegment[] {
    if (snapshot.url) {
      array = snapshot.url.concat(array);
    }

    if (snapshot.parent) {
      array = this.aggregateUrlSegments(snapshot.parent, array);
    }

    return array;
  }

}
