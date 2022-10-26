import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
      // console.log(data);
      this.posts = data;
   
      // console.log( typeof this.posts[0].publishDate)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      ////////////
      this.service1.fetchposts().subscribe((val:any)=>{
          this.author = val;
          console.log(this.author)
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
      'publishDate': [null, [Validators.required,]],
      'availableStock': [null, [Validators.required,Validators.min(2)]]
      

    });
  }


  AssignForm() {
  
    this.assignvalue = this.formBuilder.group({
      
      'authorid': ['', [Validators.required]],
      'bookId':['',[Validators.required]]
      
      

    });
  }



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
    'Enter Valid';
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
    'publishDate': [curr, [Validators.required]],
    'availableStock': [row.pageCount, [Validators.required,Validators.min(2)]]
    

  });

  }
  onSubmitAssign(data:any){
    console.log(data);
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

}
