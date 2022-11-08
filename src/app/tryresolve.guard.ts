import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateauthorbookComponent } from './showauthorbook/createauthorbook/createauthorbook.component';
import { ShowauthorbooksService } from './showauthorbook/showauthorbooks.service';

@Injectable({
  providedIn: 'root'
})
export class TryresolveGuard implements Resolve<any> {
  data:any;
  constructor(private service:ShowauthorbooksService){
    
 
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    return  this.service.fetchauthorbooksbyid(route.paramMap.get('bid'),route.paramMap.get('aid'))
  }

}
