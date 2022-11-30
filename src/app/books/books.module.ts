import { createComponent, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreatebookComponent } from './createbook/createbook.component';
import { CreatebookRoutingModule } from './createbook/createbook-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookrentedComponent } from './bookrented/bookrented.component';
import { SecondGuard } from '../second.guard';
import { RentbookComponent } from './rentbook/rentbook.component';



@NgModule({
  declarations: [
    CreatebookComponent,
    BookrentedComponent,
    RentbookComponent
  ],
  imports: [
    CommonModule,CreatebookRoutingModule,
    RouterModule,MaterialModule,ReactiveFormsModule,HttpClientModule,FormsModule
  ],
  exports:[
    CreatebookComponent
  ],
  providers:[
    DatePipe,SecondGuard
  ]
})
export class BooksModule { }
