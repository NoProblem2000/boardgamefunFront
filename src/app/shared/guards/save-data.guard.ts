import {Observable} from "rxjs";
import {CanDeactivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

export interface ComponentCanDeactivate{
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class SaveDataGuard implements CanDeactivate<ComponentCanDeactivate>{
  constructor(private router: Router) {
  }
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    // @ts-ignore
    if (this.router.getCurrentNavigation()?.extras?.state?.bypassFormGuard) {
      return true;
    }
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
