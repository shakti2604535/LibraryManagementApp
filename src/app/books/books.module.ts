import { createComponent, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreatebookComponent } from './createbook/createbook.component';
import { CreatebookRoutingModule } from './createbook/createbook-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookrentedComponent } from './bookrented/bookrented.component';



@NgModule({
  declarations: [
    CreatebookComponent,
    BookrentedComponent
  ],
  imports: [
    CommonModule,CreatebookRoutingModule,
    RouterModule,MaterialModule,ReactiveFormsModule,HttpClientModule
  ],
  exports:[
    CreatebookComponent
  ],
  providers:[
    DatePipe
  ]
})
export class BooksModule { }
