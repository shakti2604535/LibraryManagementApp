import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class SendrequestInterceptor implements HttpInterceptor {

  constructor(private login:LoginService) {} 
  private setHeaders(request: HttpRequest<any>) {
    // const token = this.login.token;
    const token = sessionStorage.getItem('token')
    if (token) {
        request = request.clone({
            setHeaders: {
                // 'content-type': 'application/json', 
                 Authorization: `Bearer ${token}`
            }
         });
    }
    return request;
}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   console.log(this.login.token)
  // console.log(  request.url)
  request = this.setHeaders(request);
        //  request.headers.set('Authorization', 'Bearer ' + this.login.token)
    return next.handle(request);
  }
}
