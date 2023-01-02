import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { CreateauthorbookComponent } from './showauthorbook/createauthorbook/createauthorbook.component';
import { ShowauthorbooksService } from './showauthorbook/showauthorbooks.service';

@Injectable({
  providedIn: 'root'
})
export class TryresolveGuard implements Resolve<any> {
  data:any;
  constructor(private service:ShowauthorbooksService,private toastr:ToastrService,private navig:Router){
    
 
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
       return this.service.fetchauthorbooksbyid(route.paramMap.get('bid'),route.paramMap.get('aid')).pipe(
        catchError(()=>{
       this.navig.navigate(['home/showauthorbooks'])
          return EMPTY
        })
      )
         
  }


}