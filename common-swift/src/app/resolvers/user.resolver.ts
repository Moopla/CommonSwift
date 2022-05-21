import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { of } from "rxjs";

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(){}

    resolve(route: ActivatedRouteSnapshot) {
        return of(true);
    }
}