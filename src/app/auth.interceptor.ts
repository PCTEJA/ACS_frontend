import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private loginService: LoginService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let newRequest = req;
        let token = this.loginService.getToken();

        console.log("INTERCEPTOR ",token);

        if(token!=null)
        {
            newRequest.clone({setHeaders:{Authorization:`Bearer ${token}`}})
            //newRequest.clone({setHeaders:{Origin: "http://localhost:4200"}})
        }

        return next.handle(newRequest);
        

    }
    
}