import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm:any;
  formGroup!: FormGroup;

  post: any = '';



  displayedColumns: string[] = ['authorId', 'authorName', 'AllBooks', 'outofstocknook','update'];
  dataSource!: MatTableDataSource<any>;
  posts:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:AuthorService,private formBuilder: FormBuilder) {
  }
  ngOnInit(){
    this.service.fetchposts().subscribe((data:any) => {
      // console.log(data);
      this.posts = data;
   
      // console.log(data.bookId)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.createForm();
  }
  createForm() {
    
    this.formGroup = this.formBuilder.group({
      
      'firstName': [null, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'lastname': [null, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
   
      'validate': ''
    });
  }
  getErrorTitle() {
    return this.formGroup!.get('firstName')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('firstName')!.hasError('minlength') ? 'Enter Valid length' :
    this.formGroup!.get('firstName')!.hasError('maxlength') ? 'Enter Valid length' :
    '';
  }
  getDiscriptionError() {
    return this.formGroup!.get('lastname')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('lastname')!.hasError('minlength') ? 'Enter Valid length' :
    this.formGroup!.get('lastname')!.hasError('maxlength') ? 'Enter Valid length' :
    '';
  }


  /////////////////////////////////////////
  submitorupdate:boolean = false;
  first:string = ''


  updatevalue(row:any){
    this.submitorupdate = true;
    this.formGroup.markAllAsTouched;

   this.first = row.authorName.split(' ');
    console.log(this.first);
    this.service.fetchbyId(row.authorid).subscribe((val:any)=>{

      this.formGroup = this.formBuilder.group({
        'authorid':[row.authorid],
        'firstName': [val.firstName, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        'lastname': [val.lastname, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
     
      
      });
    })
   
  }
  //////////////////
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
















  ////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
