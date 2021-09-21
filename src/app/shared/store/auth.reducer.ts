import {User} from '../user.model';
import * as AuthActionsh from "./auth.actions";

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(
  state = initialState, action: AuthActionsh.AuthActions
) {
  switch (action.type) {
    case AuthActionsh.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.idToken,
        action.payload.etxpiresIn
      );
      return {
        ...state,
        user
      }
    case AuthActionsh.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state

  }
}
