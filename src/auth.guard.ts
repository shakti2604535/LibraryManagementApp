import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './app/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {

  constructor(private service:LoginService,private router:Router){

  }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.service.isAuthenticated().then((val:any)=>{
      
      if(val){
        return true;
      }else{
        this.router.navigate(['/']);
        return true;
      }

    })

    // .then(
    //   (authenticated: boolean) => {
    //     if (authenticated) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/']);
    //     }
    //   }
    // );
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   // return this.service.isauthenticte();
  //   return this.service.isauthenticte();
  // }
  
}
