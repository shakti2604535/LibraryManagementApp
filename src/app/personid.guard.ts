
  import { Injectable } from '@angular/core';
  import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
  import { Observable } from 'rxjs';
  import { CreatebookService } from './books/createbook.service';
import { PersonService } from './person/person.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class PersonidGuard implements Resolve<any>{
   
   constructor(private service:PersonService)
   {
  
   }
   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.service.fetchpersonbyId(route.paramMap.get('id'));


    }
  
    
  }
  