import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

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
      )
    )
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
