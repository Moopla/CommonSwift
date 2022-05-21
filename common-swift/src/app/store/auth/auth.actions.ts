import { createAction, props } from "@ngrx/store";
import { User } from "src/app/services/user.service";

export const userSet = createAction(
    '[User] Current User Set',
    props<{user: User}>()
);

export const loggingIn = createAction(
    '[User] User Logging In',
    props<{userInfo: {
        email:string,
        password:string
    }}>()
 );

 export const userEmailUnverified = createAction(
    '[AGENT] User Email unverified'
);

export const loggedIn = createAction(
    '[AGENT] User Logged In',
    props<{user: User}>()
);

export const logginOut = createAction(
    '[AGENT] User Logging Out'
);

 export const loggedOut = createAction(
    '[AGENT] User Logged Out'
);

export const loginRequired = createAction(
    '[AGENT] User LogIn Required'
);

export const authError = createAction(
    '[AGENT] Authentication Error',
    props<{authError}>()
);

export const loginError = createAction(
    '[Auth] Login Error'
);