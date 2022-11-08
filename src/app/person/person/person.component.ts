import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm:any;
  formGroup!: FormGroup;

  post: any = '';


  displayedColumns: string[] = ['personId', 'personDob', 'personName', 'personAddress','RentedBooks','Overdue','update'];
  dataSource!: MatTableDataSource<any>;
  posts:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:PersonService,private formBuilder: FormBuilder,public datepipe: DatePipe) {
  }
  ngOnInit(){
    this.service.fetchposts().subscribe((data:any) => {
      // console.log(data);
      this.posts = data;
   
      console.log(data)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
    this.createForm();
  }
//////////////////////////////////////////////////////////////
  createForm() {
  
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'address': [null, [Validators.required,Validators.minLength(5)]],
      // 'pageCount': [null, [Validators.required,Validators.min(50) ]],
      'dob': [null, [Validators.required,this.RangeValidator()]],
      // 'availableStock': [null, [Validators.required,Validators.min(2)]],
      'validate': ''
    });
  }


  
  getErrorTitle() {
    return this.formGroup!.get('name')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('name')!.hasError('minlength') ? 'Enter Valid length' :
    this.formGroup!.get('name')!.hasError('maxlength') ? 'Enter Valid length' :
    '';
  }
  getDiscriptionError() {
    return this.formGroup!.get('address')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('address')!.hasError('minlength') ? 'Enter Valid length' :'';
  }
  getPublishedError() {
    return this.formGroup!.get('dob')!.hasError('required') ? 'Enter Valid Date' :
    this.formGroup!.get('dob')!.hasError('startdate') ? 'Age should be greater then ten' :'';
  
  }
  // getPagecountError() {
  //   return this.formGroup!.get('pageCount')!.hasError('required') ? 'Field is required' :
  //   this.formGroup!.get('pageCount')!.hasError('min') ? 'Enter Valid page' :'';
  // }
  // getAvailableStockError() {
  //   return this.formGroup!.get('availableStock')!.hasError('required') ? 'Field is required' :
  //   this.formGroup!.get('availableStock')!.hasError('min') ? 'Enter Valid page' :'';
  // }

  ///////////////////////
  submitorupdate:boolean = false;
  first:string = ''


  updatevalue(row:any){
    this.submitorupdate = true;
    this.formGroup.markAllAsTouched;console.log(row);
    const curr = this.datepipe.transform(row.personDob, 'yyyy-MM-dd')
    this.formGroup = this.formBuilder.group({
      'personId':[row.personId],
      'name': [row.personName, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'address': [row.personAddress, [Validators.required,Validators.minLength(5)]],
      // 'pageCount': [null, [Validators.required,Validators.min(50) ]],
      'dob': [curr, [Validators.required,this.RangeValidator()]],
      // 'availableStock': [null, [Validators.required,Validators.min(2)]],
      'validate': ''
    });
  }
  ////

  onSubmit(post: any) {
    this.post = post;
   console.log( this.post)
   if(!this.submitorupdate)
   {
   this.service.Createbook(this.post).subscribe((val)=>{
    console.log(val);
    // this.createForm();
    this.service.fetchposts().subscribe((data:any) => {
      // console.log(data);
      this.posts = data;
   
      console.log(data.bookId)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
 })
if (this.myForm) {
  this.myForm.resetForm();
}
   }
   else {

    this.service.updateperson(this.post).subscribe((val)=>{
      console.log(val);
      // this.createForm();
      this.service.fetchposts().subscribe((data:any) => {
        // console.log(data);
        this.posts = data;
     
        console.log(data.bookId)
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.posts);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      
   })
  if (this.myForm) {
    this.myForm.resetForm();
  }
   }

 
      

 
}

  ///////////////////////////////////////////////////// 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  ////////////////////////////////////////////////////////////////



  RangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
       
       const date = new Date();
       const date2 =  new Date(control.value);
  
      //  console.log(date2.getDate())
      //  console.log( control.value !== null);
      //  console.log(date2.getFullYear(),date.getFullYear() )
        if ( date.getFullYear() - date2.getFullYear() <12 ) {
          console.log(date );
            return { 'startdate': true };
  
        }
        return null;
    };
  }
}
