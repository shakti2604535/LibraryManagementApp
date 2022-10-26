import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatebookComponent } from './createbook.component';




const routes: Routes = [
  {path:'',component:CreatebookComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatebookRoutingModule { }