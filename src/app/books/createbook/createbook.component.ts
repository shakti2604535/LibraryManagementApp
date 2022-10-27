import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { AuthorService } from 'src/app/author/author.service';
import { PersonService } from 'src/app/person/person.service';
import { CreatebookService } from '../createbook.service';

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.scss']
})
export class CreatebookComponent implements OnInit {
  @ViewChild('commentNgForm') commentNgForm!: NgForm;
  @ViewChild(FormGroupDirective) myForm:any;
  filteredOptions:any;
  filteredOptions1:any;
  // @ViewChild(FormGroupDirective) myForm1:any;
 
 
  displayedColumns: any[] = ['Id', 'Title', 'Discription', 'AvavilableStock','pageCount','publishDate','update'];
  dataSource!: MatTableDataSource<any>;
  posts:any;
  person:any;
  author:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formGroup!: FormGroup;
  assignvalue!:FormGroup;
  @ViewChild(FormGroupDirective) myForm1:any;
  titleAlert: string = 'This field is required';
  post: any = '';

  constructor(private formBuilder: FormBuilder,private service:CreatebookService,public datepipe: DatePipe,private service1:AuthorService) { }

  ngOnInit() {
    this.createForm();
    this.AssignForm();
    this.service.fetchposts().subscribe((data:any) => {
    
      this.posts = data;
      this.filteredOptions1 = data;
      console.log(this.filteredOptions1)
      // console.log( typeof this.posts[0].publishDate)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      ////////////
      this.service1.fetchposts().subscribe((val:any)=>{
          this.author = val;
          this.filteredOptions = val;
          console.log(this.filteredOptions)
      })

     
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
/////////////////////////////////////////////////////
  createForm() {
  
    this.formGroup = this.formBuilder.group({
      
      'title': [null, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'description': [null, [Validators.required,Validators.minLength(5)]],
      'pageCount': [null, [Validators.required,Validators.min(50) ]],
      'publishDate': [null, [Validators.required,,this.RangeValidator()]],
      'availableStock': [null, [Validators.required,Validators.min(2)]]
      

    });
  }

/////////////////////////////////////////////////////
  AssignForm() {
  
    this.assignvalue = this.formBuilder.group({
      
      'authorid': ['', [Validators.required]],
      'bookId':['',[Validators.required]]
    });
    // console.log(this.filteredOptions1)
    this.assignvalue.get('authorid')?.valueChanges.subscribe((res)=>{
    
      this.filterdata(res)
    })
    this.assignvalue.get('bookId')?.valueChanges.subscribe((res1)=>{

      this.filterdata1(res1);
    })
  }


  displayFn(brand:any) {

    return brand ? brand.authorName :null;

  }
  displayFn1(brand:any) {

    return brand ? brand.title :null;

  }

  filterdata(res:any){
      this.filteredOptions = this.author.filter((item:any) =>{
        return item.authorName.toLowerCase().indexOf(res)>-1
      })
      console.log(this.filteredOptions)
  }
  filterdata1(res:any){
   
    this.filteredOptions1 = this.posts.filter((item:any) =>{
      return item.title.toLowerCase().indexOf(res)>-1
    })
 
    // console.log(this.filteredOptions1)
}

//////////////////////////////////

  get authorid() {
    return this.assignvalue!.get('authorid') as FormControl
  }
  get bookId() {
    return this.assignvalue!.get('bookId') as FormControl
  }
  get publishingDate(){
    return this.formGroup!.get('publishDate') as FormControl
  }





  getErrorTitle() {
    return this.formGroup!.get('title')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('title')!.hasError('minlength') ? 'Enter more length' :
    this.formGroup!.get('title')!.hasError('maxlength') ? 'Enter less length' :
    '';
  }
  getDiscriptionError() {
    return this.formGroup!.get('description')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('description')!.hasError('minlength') ? 'Enter Valid length' :'';
  }
  getPublishedError() {
    return this.formGroup!.get('publishDate')!.hasError('required') ? 'Enter Valid Date' :
    this.formGroup!.get('publishDate')!.hasError('startdate') ? 'Enter Past Date' :'';
  }
  getPagecountError() {
    return this.formGroup!.get('pageCount')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('pageCount')!.hasError('min') ? 'Enter Valid page' :'';
  }
  getAvailableStockError() {
    return this.formGroup!.get('availableStock')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('availableStock')!.hasError('min') ? 'Enter Valid page' :'';
  }
/////////////////////////////////////////////////////
  submitorupdate:boolean = false;
  updatevalue(row:any){
  // console.log(row)
  this.submitorupdate = true;
  this.formGroup.markAllAsTouched;
  // this.formGroup.setValidators;
  const curr = this.datepipe.transform(row.publishDate, 'yyyy-MM-dd')
  // if (this.myForm) {
  //   this.myForm.resetForm({
  //     'title': [row.title],
  //     'description': [row.description],
  //     'publishDate': [curr],
  //     'availableStock': [row.availableStock],
  //     'pageCount': [row.pageCount],
  //     'validate': ''
  //   }

  //   );
  // }

  
  this.formGroup = this.formBuilder.group({
    'bookId':[row.bookId],
    'title': [row.title, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    'description': [row.description, [Validators.required,Validators.minLength(5)]],
    'pageCount': [row.pageCount, [Validators.required,Validators.min(50) ]],
    'publishDate': [curr, [Validators.required,this.RangeValidator()]],
    'availableStock': [row.pageCount, [Validators.required,Validators.min(2)]]
    

  });

  }
  onSubmitAssign(data:any){
    console.log(data.bookId.bookId);
    this.assignvalue.markAllAsTouched;
    this.service.AssignBook(data).subscribe((val)=>{
           console.log(val);
    })
  
  
    this.commentNgForm.resetForm();
 
  
    
    

    
  }

  onSubmit(post: any) {
    this.post = post;
   console.log( this.post)
    if(!this.submitorupdate)
    {
   this.service.Createbook(this.post).subscribe((val)=>{

  
 

   this.service.fetchposts().subscribe((data:any) => {
  
    this.posts = data;
 
    // console.log(this.posts[0].publishDate)
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
  else{

    this.service.updateposts(this.post).subscribe((val)=>{

     
   
  
     this.service.fetchposts().subscribe((data:any) => {
     
      this.posts = data;
   
      console.log(this.posts[0].publishDate)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);
  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
     
    });
  }) 
  
  if (this.myForm) {
    this.myForm.resetForm();
  }
 this.submitorupdate = false;
  }
}


RangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
     
     const date = new Date();
     const date2 =  new Date(control.value);

    //  console.log(date2.getDate())
    //  console.log( control.value !== null);
    //  console.log(date2.getFullYear(),date.getFullYear() )
      if ( date.getFullYear() - date2.getFullYear() < 0 ) {
        console.log(date );
          return { 'startdate': true };

      }
      if(date.getFullYear() - date2.getFullYear() === 0)
      { 
        if(date.getMonth() - date2.getMonth() < 0)
        {
          return { 'startdate': true };
        }

      }
      if(date.getFullYear() - date2.getFullYear() === 0)
      { 
        if(date.getMonth() - date2.getMonth() === 0)
        {
         if(date.getDate() - date2.getDate() <= 0 )
         {
          return { 'startdate': true };
         } 
        }

      }
      return null;
  };
}

}
