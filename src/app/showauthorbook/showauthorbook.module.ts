import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ShowauthorbooksComponent } from './showauthorbooks/showauthorbooks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { ShowauthorbooksRoutingModule } from './showauthorbooks/showauthorbooks-routing.module';
import { CreateauthorbookComponent } from './createauthorbook/createauthorbook.component';
import { RouterModule } from '@angular/router';
import { TryresolveGuard } from '../tryresolve.guard';
import { UnsavechangeGuard } from '../unsavechange.guard';



@NgModule({
  declarations: [
    ShowauthorbooksComponent,
    CreateauthorbookComponent
  ],
  imports: [
    CommonModule,FormsModule   ,ReactiveFormsModule,ShowauthorbooksRoutingModule,RouterModule,MaterialModule,ReactiveFormsModule,HttpClientModule,FormsModule
  ],
  exports:[
 CreateauthorbookComponent
  ],
  providers:[
    DatePipe,TryresolveGuard,UnsavechangeGuard
  ]
})
export class ShowauthorbookModule { }
