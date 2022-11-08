import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CreatebookService } from './books/createbook.service';

@Injectable({
  providedIn: 'root'
})
export class SecondGuard implements Resolve<any>{
 
 constructor(private service:CreatebookService)
 {

 }
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     return this.service.RentedBookByID(route.paramMap.get('id'))
  }

  
}
