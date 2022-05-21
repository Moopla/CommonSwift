import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state.model";
import { AuthState } from "./auth.reducers";

export const selectFeatureState = (state: AppState) => state.authState;

export const authLoading = createSelector(selectFeatureState, 
    (state: AuthState) =>  state.loading);

export const isUserLoggedIn = createSelector(selectFeatureState,
    (state: AuthState) => !!state.user);

export const loggedInUser = createSelector(selectFeatureState,
    (state: AuthState) => state.user);