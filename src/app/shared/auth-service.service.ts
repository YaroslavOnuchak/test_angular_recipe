import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {Subject, throwError,} from "rxjs";
import {User} from "./user.model";

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

export class AuthServiceService {
  user = new Subject<User>()

  constructor(private http: HttpClient) {
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
