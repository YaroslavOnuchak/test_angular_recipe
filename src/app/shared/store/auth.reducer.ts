import {User} from '../user.model';
import * as AuthActionsh from "./auth.actions";
import {AUTHENTICATE_FAIL, AUTHENTICATE_SUCCESS} from "./auth.actions";

export interface State {
  user: User;
  authError:string,
  loading: boolean
}

const initialState: State = {
  user: null,
  authError:null,
  loading:false
};

export function authReducer(
  state = initialState,
  action: AuthActionsh.AuthActions
) {
  switch (action.type) {
    case AuthActionsh.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.idToken,
        action.payload.etxpiresIn
      );
      return {
        ...state,
        authError:null,
        loading:false,
        user
      }
    case AuthActionsh.LOGOUT:
      return {
        ...state,
        // loading:false,
        user: null
      }
    case AuthActionsh.LOGIN_START:
    case AuthActionsh.SIGNUP_START:
      return {
        ...state,
        authError:null,
        loading:true,
      }
      case AuthActionsh.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading:false,
        authError: action.payload
      }
    case AuthActionsh.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state

  }
}
