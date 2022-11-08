import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateauthorbookComponent } from './showauthorbook/createauthorbook/createauthorbook.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavechangeGuard implements CanDeactivate<CreateauthorbookComponent> {
  canDeactivate(component: CreateauthorbookComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   if(component.formGroup.dirty)
   {
    return window.confirm("Are you sure")
   }
   else{
    return true;
   }
  }

  
}
