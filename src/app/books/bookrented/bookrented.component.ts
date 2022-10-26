import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorService } from 'src/app/author/author.service';
import { PersonService } from 'src/app/person/person.service';
import { CreatebookService } from '../createbook.service';

@Component({
  selector: 'app-bookrented',
  templateUrl: './bookrented.component.html',
  styleUrls: ['./bookrented.component.scss']
})
export class BookrentedComponent implements OnInit {

 

  displayedColumns: string[] = ['trackId', 'bookId', 'startDate', 'expectedReturnDate','actualReturnDate','personId','update'];
  dataSource!: MatTableDataSource<any>;
  posts:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder: FormBuilder,private service:CreatebookService,private service1:PersonService) { }

  @ViewChild(FormGroupDirective) myForm:any;
  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
allbook:any;
allperson:any;
  ngOnInit() {
    this.createForm();
    this.service.fetchrentedBook().subscribe((data:any) => {
      console.log(data);
      this.posts = data;
   
      console.log( typeof this.posts[0].publishDate)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.service.fetchposts().subscribe((val)=>{
                 this.allbook = val;
      })
      this.service1.fetchposts().subscribe((val)=>{
        this.allperson = val;
      })
    });
  }


  //////////////////
  createForm() {
  
    this.formGroup = this.formBuilder.group({
      'bookId': [null, [Validators.required]],
      'personId': [null, [Validators.required]],
      'startDate': [null, [Validators.required]],
      'expectedReturnDate': [null, [Validators.required,]],
      'actualReturnDate': [null,],
      'validate': ''
    });
  }

  get bookId() {
    return this.formGroup!.get('bookId') as FormControl
  }
  ///////
  get personId() {
    return this.formGroup!.get('personId') as FormControl
  }
  
  getErrorTitle() {
    return this.formGroup!.get('bookId')!.hasError('required') ? 'Enter Valid Date' :
    'Enter Valid';
  }
  getDiscriptionError() {
    return this.formGroup!.get('personId')!.hasError('required') ? 'Enter Valid Date' :
    'Enter Valid';
  }
  getPublishedError() {
    return this.formGroup!.get('startDate')!.hasError('required') ? 'Enter Valid Date' :
    'Enter Valid';
  }
  getPagecountError() {
    return this.formGroup!.get('expectedReturnDate')!.hasError('required') ? 'Enter Valid Date' :
    'Enter Valid';
  }
  getAvailableStockError() {
    return this.formGroup!.get('actualReturnDate')!.hasError('required') ? 'Enter Valid Date' :
    'Enter Valid';
  }

///////////////////////////////////////
  onSubmit(post: any) {
    this.post = post;
   console.log( this.post)
    
   this.service.RenteBook(this.post).subscribe((val)=>{

    console.log(val);
 

   this.service.fetchrentedBook().subscribe((data:any) => {
    console.log(data);
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

////////////////////////

updatevalue(row:any){
  const today  = new Date(); 
  console.log(row.trackId)
  if(row.actualReturnDate === null)
  {
  console.log(  row.actualReturnDate)
  row.actualReturnDate = today;
  console.log(  row.actualReturnDate)
  this.service.returnissuebook(row).subscribe((val)=>{

    this.service.fetchrentedBook().subscribe((data:any) => {
      console.log(data);
      this.posts = data;
   
      // console.log( typeof this.posts[0].publishDate)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  })
  }
}














  /////////////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
