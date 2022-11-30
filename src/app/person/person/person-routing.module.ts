import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonidGuard } from 'src/app/personid.guard';
import { UpdatepersonComponent } from '../updateperson/updateperson.component';

import { PersonComponent } from './person.component';



const routes: Routes = [
  {path:'',component:PersonComponent},
  {path:'create',component:UpdatepersonComponent},
  {path:'update/:id',resolve:{data:PersonidGuard},component:UpdatepersonComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }