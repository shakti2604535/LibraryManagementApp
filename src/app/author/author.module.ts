import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author/author.component';
import { AuthorRoutingModule } from './author/author-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    AuthorComponent
  ],
  imports: [
    CommonModule,AuthorRoutingModule,HttpClientModule,ReactiveFormsModule,MaterialModule
  ],
  exports:[
    AuthorComponent
  ]
})
export class AuthorModule { }
