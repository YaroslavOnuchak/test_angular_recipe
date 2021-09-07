import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError,} from "rxjs";
import {User} from "../../shared/user.model";
import {Router, RouterLink} from "@angular/router";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<User>(null)

  tokenExpirationTimer: number = null
  token: string = null

  constructor(private http: HttpClient, private router: Router) {
  }

  logOut() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userDate')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  autoLogOut(expirationDuration) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration)
  }

  signUp(data) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmtGzvsvQbDGLDzOuNZvbsqsTDJBe7AnA',
      {
        email: data.username,
        password: data.password,
        returnSecureToken: true
      }).pipe(
      catchError(
        this.handlerError
      ),
      tap(
        resData => {
          this.handlerAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        }
      )
    )
  }

  logIn(data) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmtGzvsvQbDGLDzOuNZvbsqsTDJBe7AnA',
      {
        email: data.username,
        password: data.password,
        returnSecureToken: true
      }).pipe(
      catchError(this.handlerError
      ),
      tap(
        resData => {
          console.log(resData.expiresIn)
          this.handlerAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        }
      )
    )
  }

  private handlerAuth(
    email: string,
    userId: string,
    idToken: string,
    etxpiresIn: number
  ) {
    const etxpirationDate = new Date(
      new Date().getTime() + +etxpiresIn * 1000
    )
    const user = new User(
      email,
      userId,
      idToken,
      etxpirationDate
    );
    this.user.next(user)
    this.autoLogOut(etxpiresIn * 1000)
    localStorage.setItem('userDate', JSON.stringify(user))
  }

  autoLogin() {
    const userDate: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userDate'))
    if (!userDate) {
      return
    }
    const loaderUser = new User(
      userDate.email,
      userDate.id,
      userDate._token,
      new Date(userDate._tokenExpirationDate)
    )
    if (loaderUser.token) {
      this.user.next(loaderUser)
      const expirationDuration = new Date(userDate._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogOut(expirationDuration)
      this.router.navigate(['/recipes'])
    }
  }

  private handlerError(error: HttpErrorResponse) {
    let errorMessage = 'xz';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage)
    }
    errorMessage = error.error.error.message.split('_').join(' ').toLocaleLowerCase();
    return throwError(errorMessage)
  }
}
