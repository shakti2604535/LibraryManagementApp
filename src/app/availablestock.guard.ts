import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { CreatebookService } from './books/createbook.service';

@Injectable({
  providedIn: 'root'
})

export class AvailablestockGuard implements CanActivate {
  data:any;
  constructor(private service :CreatebookService, private toastrService: ToastrService,private navig:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

   
      // this.service.ftechbookbyid(route.paramMap.get('id')).pipe(map(res=>res)). subscribe((val:any)=>{
      //      if(val.availableStock === 0){
      //           return false;
      //   }
      //   else{
      //     return true;
      //   }
      //       })
     
       return this.service.ftechbookbyid(route.paramMap.get('id')).pipe(map((val:any)=>{
        console.log(val)
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<")
        if(val.availableStock === 0){
          this.toastrService.error('No stock available');
             return false;
        }
        else{
          return true;
        }
      }),catchError(()=>{
        this.navig.navigate(['home/booktrack'])
           return EMPTY
         }))
        //  return true;
   
  //  const promise = new Promise<boolean>(
  //   (resolve,reject)=>{
      
  //   }
  //  )
     
      // const promise = new Promise(
      //   (resolve, reject) => {
      //     setTimeout(() => {
      //       resolve(  this.service.ftechbookbyid(route.paramMap.get('id')).subscribe((val:any)=>{
      //         console.log(val)
      //         console.log("<<<<<<<<<<<<<<<<<<<<<<<<")
      //          if(val.availableStock === 0)
      //          {
      //            false;
      //          }
               
      //            true;
               
      //        }));
      //     }, 80);
      //   }
      // );
      // console.log(promise)
      // console.log("<<<<<<<<<<<<<<<<<<<<<<<<")
      // return true;
 
}

  }
  

