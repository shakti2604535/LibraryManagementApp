import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavechangeGuard } from 'src/app/unsavechange.guard';
import { CreateauthorbookComponent } from '../createauthorbook/createauthorbook.component';


import { ShowauthorbooksComponent } from './showauthorbooks.component';



const routes: Routes = [
  {path:'',component:ShowauthorbooksComponent},
  {path:'create',canDeactivate:[UnsavechangeGuard],component:CreateauthorbookComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowauthorbooksRoutingModule { }