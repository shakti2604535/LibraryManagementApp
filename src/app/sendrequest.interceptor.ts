import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './login/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SendrequestInterceptor implements HttpInterceptor {
errors:any;
  constructor(private login:LoginService,private toastr:ToastrService) {} 
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
    return next.handle(request).pipe(catchError((errordata:any)=>{
   if(errordata.status=== 0)
   {
       this.toastr.error("Server not responding")
    this.login.logout()
   }
   else if(errordata.status === 404)
   {
    this.toastr.error("Resource Not found")
   
    
   }
   else if(errordata.status === 401)
   {
    this.toastr.error("Server not responding")
    this.login.logout()

   }
   else if(errordata.status == 400){
    this.errors=Object.values(errordata.error);
    this.toastr.error("Bad Request",this.errors)
   }
   else{
    this.errors=Object.values(errordata.error);
   this.toastr.error("Something went wrong",this.errors,{
    timeOut:10000,
   });
  }
  //  this.login.logout()
  // return of([]);
   return throwError(errordata)
  //  return [];
  }));
  }
}
