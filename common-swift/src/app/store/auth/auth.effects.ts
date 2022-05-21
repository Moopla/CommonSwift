import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { defer, iif, of } from "rxjs";
import { mergeMap, startWith, switchMap, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import * as authActions from "./auth.actions";


@Injectable()
export class AuthEffects {
    private initialised = false;

    constructor(private actions$: Actions, private authService: AuthService, private userService: UserService, private router: Router){}

    init$ = createEffect(() => 
        this.actions$.pipe(
            startWith('INIT_AUTHENTICATION'),
            take(1),
            switchMap(() => this.userService.getUser()),
            mergeMap(auth => iif(() => !!auth && auth.verified,  
                defer(() => {
                    this.routeToDashboard();
                    return of(authActions.loggedIn({user: auth.user}))
                }), 
                defer(() => this.initialised ? of(authActions.loggedOut()) : of(authActions.loginRequired()))
            )),
            tap(() => {
                this.initialised = true;
            }),
        )
    );

    logout$ = createEffect(() => 
            this.actions$.pipe(
            ofType(authActions.logginOut),
            tap(() => {
                localStorage.removeItem('JWT_TOKEN');
                this.router.navigate([`/login`]);

            }),
            mergeMap(val => of(authActions.loggedOut()))
        )
    );


    routeToDashboard(){

    }
}