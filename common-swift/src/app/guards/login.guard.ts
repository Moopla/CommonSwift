import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { filter, map, mergeMap, take, tap } from "rxjs/operators";
import { AppState } from "../store/app.state.model";
import { loggedIn } from "../store/auth/auth.actions";
import { AuthState } from "../store/auth/auth.reducers";
import * as authSelectors from '../store/auth/auth.selectors';


@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(private store: Store<AppState>, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.runGuard();
    }

    canLoad(route: Route, segments: UrlSegment[]){
        return this.runGuard();
    }

    runGuard(){
        return this.store.pipe(
            select(authSelectors.authLoading),
            filter(loading => !loading),
            mergeMap(() => this.store.select(authSelectors.isUserLoggedIn)),
            take(1),
            tap(authenticated => {
                if(!authenticated){
                    this.router.navigate([`/login`]);
                }              
            })
        )
    }
}

@Injectable()
export class LoginGuard implements CanLoad, CanActivate {

    constructor(private store: Store<AppState>, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.runGuard();
    }

    canLoad(route: Route, segments: UrlSegment[]){
        return this.runGuard();
    }

    runGuard(){
        return this.store.pipe(
            select(authSelectors.authLoading),
            filter(loading => !loading),
            mergeMap(() => this.store.select(authSelectors.isUserLoggedIn).pipe(map(
                val => !val 
            ))),
            take(1),
            tap(notAuth => {
                if(!notAuth){
                    this.router.navigate([`/dashboard`]);
                }              
            })
        )
    }

}

/*
implements CanLoad, CanActivate {

    private readonly isServer: boolean;

    constructor(private store: Store<UserState>, private router: Router, @Inject(PLATFORM_ID) platformId: any, private fireAuth: AngularFireAuth, 
    private route: ActivatedRoute){
        this.isServer = isPlatformServer(platformId);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.runGuard();
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        return this.runGuard();
    }

    runGuard(){
        return this.store
        .pipe(
            select(AuthSelector.isAuthLoading),
            filter(loading => !loading),
            mergeMap(() => this.store.select(AuthSelector.isUserLoggedIn).pipe(map(loggedIn => !loggedIn))),
            take(1),
            tap(notLoggedIn => {
              if(this.isServer){
                this.router.navigate(['/loading']);
              }
              else if(!notLoggedIn){
                this.store.select(AuthSelector.authInfo).pipe(take(1)).subscribe(user => {
                  this.router.navigate([`/agent/${user._id}/dashboard/`]);
                });
              }
            })
          )
    }
    
}
*/