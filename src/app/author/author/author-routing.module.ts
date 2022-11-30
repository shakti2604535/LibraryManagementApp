import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoridGuard } from 'src/app/authorid.guard';
import { AuthordetailsComponent } from '../authordetails/authordetails.component';
import { AuthorComponent } from './author.component';





const routes: Routes = [
  {path:'',component:AuthorComponent},
  {
    path:'create',component:AuthordetailsComponent
  },
  {path:'update/:id',resolve:{data:AuthoridGuard},component:AuthordetailsComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }