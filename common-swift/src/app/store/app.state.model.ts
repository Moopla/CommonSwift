import { AuthState } from "./auth/auth.reducers";

export interface AppState {
    readonly authState: AuthState
}