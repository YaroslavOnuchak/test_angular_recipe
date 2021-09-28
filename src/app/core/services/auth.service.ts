import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as AppRducer from "../../shared/store/app.reducer"
import * as AuthActions from "../../shared/store/auth.actions"

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
  kind?: string
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private tokenExpirationTimer: number = null
  token: string = null

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppRducer.AppState>
  ) {
  }


  setLogOutTimer(expirationDuration) {
    console.log(expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout())

    }, expirationDuration)
  }

  clearLogOutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
      this.router.navigate(['/auth'])
      this.tokenExpirationTimer = null
    }
  }
}
