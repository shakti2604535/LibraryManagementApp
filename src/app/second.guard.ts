import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { CreatebookService } from './books/createbook.service';

@Injectable({
  providedIn: 'root'
})
export class SecondGuard implements Resolve<any>{
 
 constructor(private service:CreatebookService,private navig:Router)
 {

 }
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     return this.service.RentedBookByID(route.paramMap.get('id')).pipe(
      catchError(()=>{
     this.navig.navigate(['home/booktrack'])
        return EMPTY
      })
    )
       
  }

  
}
