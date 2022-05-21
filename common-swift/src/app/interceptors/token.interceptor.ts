import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
    private JWT_TOKEN = 'JWT_TOKEN';
    constructor(){
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(this.JWT_TOKEN) || '';

        return next.handle(req.clone({
            setHeaders: {
                'x-auth-token': token
            }
        }));
    }
}