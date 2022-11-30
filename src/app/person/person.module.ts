import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonComponent } from './person/person.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonRoutingModule } from './person/person-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { UpdatepersonComponent } from './updateperson/updateperson.component';



@NgModule({
  declarations: [
    PersonComponent,
    UpdatepersonComponent
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
