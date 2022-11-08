import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { AuthGuard } from 'src/auth.guard';
import { TryresolveGuard } from './tryresolve.guard';
import { SecondGuard } from './second.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule,
    RouterModule,

    MaterialModule
   
    
  ],
  providers: [AuthGuard,TryresolveGuard,SecondGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
