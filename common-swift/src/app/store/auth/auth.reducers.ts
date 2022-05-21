import { Action, createReducer, on } from "@ngrx/store";
import { User } from "src/app/services/user.service";
import * as AuthActions from "./auth.actions";

export interface AuthState {
    loading: boolean;
    user: User;
    authError: any /*{state: LogInErrorState, code: string};*/
  }
  
  export const UserInitialState:AuthState = {
    loading: true,
    user: null,
    authError:null
  };

  export const authReducer = createReducer(
    UserInitialState,
    on(AuthActions.loginRequired, AuthActions.loginError, AuthActions.loggedOut, state => ({...state, user: undefined, loading: false})),
    on(AuthActions.userSet,(state, {user}) => ({...state, user, loading: false})),
    on(AuthActions.loggedIn, (state, {user}) => ({...state, user, loading: false})),
    on(AuthActions.loggingIn, (state) => ({...state, authError:null})),
    on(AuthActions.authError, (state, {authError}) => ({...state, user:undefined, authError: authError})),
  );

  export const reducers = (state: AuthState | undefined, action: Action) => authReducer(state, action);
  