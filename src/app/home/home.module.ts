import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,HomeRoutingModule,MaterialModule,
    DashboardModule,RouterModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
