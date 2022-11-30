

  import { Injectable } from '@angular/core';
  import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
  import { Observable } from 'rxjs';
import { AuthorService } from './author/author.service';
  import { CreatebookService } from './books/createbook.service';
import { PersonService } from './person/person.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class AuthoridGuard implements Resolve<any>{
   
   constructor(private service:AuthorService)
   {
  
   }
   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.service.fetchbyId(route.paramMap.get('id'));


    }
  
    
  }
  