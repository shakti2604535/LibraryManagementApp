
  import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
  import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
  import { catchError, EMPTY, map, Observable } from 'rxjs';
  import { CreatebookService } from './books/createbook.service';
import { PersonService } from './person/person.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class PersonidGuard implements Resolve<any>{
   
   constructor(private service:PersonService,private navig:Router)
   {
  
   }
   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.fetchpersonbyId(route.paramMap.get('id')).pipe(
      catchError(()=>{
     this.navig.navigate(['home/person'])
        return EMPTY
      })
    )
       

    }
  
    
  }
  