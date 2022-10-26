import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonComponent } from './person/person.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonRoutingModule } from './person/person-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,PersonRoutingModule,HttpClientModule,MaterialModule
  ],
  exports:[
    PersonComponent
  ],
  providers:[
    DatePipe
  ]
})
export class PersonModule { }
