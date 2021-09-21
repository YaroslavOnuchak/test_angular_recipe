import {Action} from "@ngrx/store";
import {Ingredient} from "../ingredient.model";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  readonly type = LOGIN

  constructor(public payload: {
                email: string,
                userId: string,
                idToken: string,
                etxpiresIn: Date
              }
  ) {}

}

export class Logout implements Action {
  readonly type = LOGOUT

}

export  type AuthActions = Logout | Login
