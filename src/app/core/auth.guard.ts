import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";
import {map, take, tap} from "rxjs/operators";
import * as fropmApp from "../shared/store/app.reducer"
import {Store} from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fropmApp.AppState>
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(authUser => {
        return authUser.user
      }),
      map(
        user => {
          const isAuth = !!user;
          if (isAuth) {
            return true
          }
          return this.router.createUrlTree(['/auth'])
        }
      ),
      // tap(isAuth => {
      //     if (!!isAuth) {
      //       this.router.navigate(['/auth'])
      //     }
      //   }
      // )
    )
  }
}
