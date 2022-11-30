import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SendrequestInterceptor } from '../sendrequest.interceptor';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,MaterialModule,DashboardRoutingModule,RouterModule,HttpClientModule
  ],
  exports:[
    DashboardComponent
  ],providers:[{provide: HTTP_INTERCEPTORS,useClass:SendrequestInterceptor,multi:true }]
})
export class DashboardModule { }
