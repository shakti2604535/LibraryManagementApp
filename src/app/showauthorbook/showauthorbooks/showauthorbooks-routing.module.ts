import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ShowauthorbooksComponent } from './showauthorbooks.component';



const routes: Routes = [
  {path:'',component:ShowauthorbooksComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowauthorbooksRoutingModule { }