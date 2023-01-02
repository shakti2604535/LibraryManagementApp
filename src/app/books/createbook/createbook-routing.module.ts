import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailablestockGuard } from 'src/app/availablestock.guard';
import { SecondGuard } from 'src/app/second.guard';
import { BookrentedComponent } from '../bookrented/bookrented.component';
import { RentbookComponent } from '../rentbook/rentbook.component';
import { CreatebookComponent } from './createbook.component';




const routes: Routes = [
  // {path:'',component:CreatebookComponent,children:[
  //   {path:':id',component:CreatebookComponent}
  // ]},
  {path:'',component:BookrentedComponent},
  {path:'assignbook',component:RentbookComponent},
  {path:'assignbook/:id', resolve:{data:SecondGuard},canActivate:[AvailablestockGuard],component:RentbookComponent},
  {path:':id',resolve:{data:SecondGuard},component:BookrentedComponent},
 

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatebookRoutingModule { }