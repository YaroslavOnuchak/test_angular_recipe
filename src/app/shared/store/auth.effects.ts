import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "../store/auth.actions"
import {catchError, switchMap, map, tap} from "rxjs/operators";
import {of, throwError} from "rxjs";
// import {AuthResponseData} from "../../core/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../user.model";
import {AuthService} from "../../core/services/auth.service";


export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
  kind?: string
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    idToken: token,
    etxpiresIn: expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  errorMessage = errorRes.error.error.message.split('_').join(' ').toLocaleLowerCase();
  return of(new AuthActions.AuthenticateFail(errorMessage));
};


@Injectable()
export class AuthEffects {
  @Effect()
  authSign = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmtGzvsvQbDGLDzOuNZvbsqsTDJBe7AnA',
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
              this.authServise.setLogOutTimer(
                +resData.expiresIn * 1000
              )
            }
          ),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );


  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmtGzvsvQbDGLDzOuNZvbsqsTDJBe7AnA',
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap(resData => {
            this.authServise.setLogOutTimer(
              +resData.expiresIn * 1000
            )
          }
        ),
        map(resData => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          return handleAuthentication(
            +resData.expiresIn,
            resData.email,
            resData.localId,
            resData.idToken
          );
        }),
        catchError(error => {
            //non errror obser
            return handleError(error);
          }
        ),
      )
    }),
    // catchError()
  );

  @Effect({
    dispatch: false
  })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/recipes'])
      }
    })
  )

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'xz'};
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        console.log(loadedUser.token)
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authServise.setLogOutTimer(expirationDuration)
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          idToken: loadedUser.token,
          etxpiresIn: new Date(userData._tokenExpirationDate),
          redirect: true
        });
        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return {type: 'DUMMY'};
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authServise.clearLogOutTimer()
      localStorage.removeItem('userData');
      // this.router.navigate(['/auth'])
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private authServise: AuthService
  ) {
  }
}
