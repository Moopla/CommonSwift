import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AppState } from "../store/app.state.model";
import { User } from "./user.service";
import * as authActions from 'src/app/store/auth/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    static JWT_TOKEN = 'JWT_TOKEN';
    private AUTH_API_URL = environment.apiBaseUrl + "auth/";

    constructor(private httpClient:HttpClient, private store: Store<AppState>){
        debugger;
    }

    async logIn(loginDetails: LoginDetails): Promise<User | any> {
        try {
            const promise =  this.httpClient.post<AuthResponse>(this.AUTH_API_URL, loginDetails).toPromise();
            const {user, token} = await promise;
            
            this.store.dispatch(authActions.loggedIn({user}))
            localStorage.setItem(AuthService.JWT_TOKEN, token);
            return user;
        }
        catch(ex) {
            return ex
        }
    }

    static getJwtToken() {
        return localStorage.getItem(AuthService.JWT_TOKEN);
    }

}

export interface LoginDetails{
    email: string;
    password: string
}

export interface AuthResponse{
    user: User,
    token: string,
    success: boolean
}
