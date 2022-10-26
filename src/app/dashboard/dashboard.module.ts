import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,MaterialModule,DashboardRoutingModule,RouterModule,HttpClientModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
