import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { ShowauthorbookModule } from '../showauthorbook/showauthorbook.module';
import { TryresolveGuard } from '../tryresolve.guard';
import { SecondGuard } from '../second.guard';
import { UnsavechangeGuard } from '../unsavechange.guard';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,HomeRoutingModule,MaterialModule,
    DashboardModule,RouterModule,ShowauthorbookModule
  ],
  exports:[HomeComponent],
  providers:[
    DatePipe,TryresolveGuard,SecondGuard,UnsavechangeGuard
  ]
})
export class HomeModule { }
