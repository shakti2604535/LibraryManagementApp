import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from 'src/app/author/author.service';
import { PersonService } from 'src/app/person/person.service';
import { CreatebookService } from '../createbook.service';

@Component({
  selector: 'app-bookrented',
  templateUrl: './bookrented.component.html',
  styleUrls: ['./bookrented.component.scss']
})
export class BookrentedComponent implements OnInit {

 

  displayedColumns: string[] = [ 'title', 'booktrack.startDate', 'expectedReturnDate','booktrack.actualReturnDate','personName','update'];
  dataSource!: MatTableDataSource<any>;
  posts:any;
  filteroption:any;
  filteroption1:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id:any;
  currentdate :any = new Date();
  constructor(private formBuilder: FormBuilder, private router:Router,private service:CreatebookService,private service1:PersonService,private route :ActivatedRoute,private navig:Router,private toastr:ToastrService) { }

  @ViewChild(FormGroupDirective) myForm:any;
  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
allbook:any;
allperson:any;
changeonassign:boolean = true;
changeonassigndata:any;
  ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  

  if(this.id)
  {  
    console.log(this.route.snapshot.data['data'])
    console.log(this.route.snapshot.data)
    // this.service.RentedBookByID(+this.id).subscribe((val)=>{
    if(this.route.snapshot.data['data'])
    {
    // this.createForm();
    this.changeonassigndata = this.id;
    this.changeonassign = false;
    this.posts = this.route.snapshot.data['data'];
   
    // console.log( typeof this.posts[0].publishDate)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.posts);
       this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
       this.service.fetchposts().subscribe((val)=>{
                 this.allbook = val;
                 this.filteroption1 = val;
      })
      this.service1.fetchposts().subscribe((val)=>{
        this.allperson = val;
        this.filteroption =val;
      })
    }
    else{
      console.log('hello')
   this.navig.navigate(['home/dashboard'])
    }
    // })
       
    // this.formGroup = this.formBuilder.group({
    //   'bookId': [+this.id, [Validators.required]],
    //   'personId': [null, [Validators.required]],
    //   'startDate': [null, [Validators.required,this.RangeValidator()]],
    //   'expectedReturnDate': [null, [Validators.required,this.ExpectedRangeValidator()]],
    //   'actualReturnDate': [null,],
    //   'validate': ''
    // });    
  }
  else{
    this.changeonassign =true;
    this.service.fetchrentedBook().subscribe((data:any) => {
      console.log(data);
      this.posts = data;
   
      // console.log( typeof this.posts[0].publishDate)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.service.fetchposts().subscribe((val)=>{
                 this.allbook = val;
                //  console.log(val);
                 this.filteroption1 = val;

      })
      this.service1.fetchposts().subscribe((val)=>{
        this.allperson = val;
        this.filteroption = val;
      })
    });
  }
  this.createForm()
    // this.service.fetchrentedBook().subscribe((data:any) => {
    //   console.log(data);
    //   this.posts = data;
   
    //   // console.log( typeof this.posts[0].publishDate)
    //   // Assign the data to the data source for the table to render
    //   this.dataSource = new MatTableDataSource(this.posts);

    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;

    //   this.service.fetchposts().subscribe((val)=>{
    //              this.allbook = val;
    //   })
    //   this.service1.fetchposts().subscribe((val)=>{
    //     this.allperson = val;
    //   })
    // });
  }

   ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }

   navigatetoassign(){
    if(!this.changeonassign)
    {
      this.router.navigate(['home/booktrack/assignbook/'+this.changeonassigndata])
    }
    else{

    
    this.router.navigate(['home/booktrack/assignbook'])
    }
   }

   navigateto(data:any){
    this.router.navigate(['home/booktrack/assignbook/'+data])   }
  //////////////////
  createForm() {
  
    this.formGroup = this.formBuilder.group({
      'bookId': [null, [Validators.required]],
      'personId': [null, [Validators.required]],
      'startDate': [null, [Validators.required,this.RangeValidator()]],
      'expectedReturnDate': [null, [Validators.required,this.ExpectedRangeValidator()]],
      'actualReturnDate': [null,],
      'validate': ''
    });
    this.formGroup.get('bookId')?.valueChanges.subscribe((res1)=>{

      this.filterdata1(res1);
    })
    this.formGroup.get('personId')?.valueChanges.subscribe((res1)=>{

      this.filterdata(res1);
    })
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
    return this.formGroup!.get('startDate')!.hasError('required') ? 'Field is required' :
    this.formGroup!.get('startDate')!.hasError('startdate') ? 'Enter today date' :'';
  }
  getPagecountError() {
    return this.formGroup!.get('expectedReturnDate')!.hasError('required') ? 'Enter Valid Date' :
    this.formGroup!.get('expectedReturnDate')!.hasError('expectdate') ? 'Enter future date' :'';
  }
  getAvailableStockError() {
    return this.formGroup!.get('actualReturnDate')!.hasError('required') ? 'Enter Valid Date' :
    'Enter Valid';
  }
 
nostock:any = false;
///////////////////////////////////////
  onSubmit(post: any) {
    this.post = {
      
        "actualReturnDate": null,
        "bookId": post.bookId.bookId,
        "expectedReturnDate": post.expectedReturnDate,
        "personId": post.personId.personId,
        "startDate": post.startDate,
        
      
    };
    console.log('hi')
   console.log( this.post)
   console.log('hi')
    
   this.service.RenteBook(this.post).subscribe((val)=>{

    console.log(val+'<<<<');  
    if(val)
    {
      this.toastr.success('Success', 'Message');
    }
   if(!val)
   {
    this.toastr.warning('Failed', 'Alert');
    this.nostock = true;
   }
  
   this.service.fetchrentedBook().subscribe((data:any) => {
    console.log(data);
    this.posts = data;
        
    // console.log(this.posts[0].publishDate)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.posts);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
   
  });
    
    // else{
    //         this.nostock = true;
    // }

}) 

if (this.myForm) {
  this.myForm.resetForm();
}

  }

////////////////////////

updatevalue(row:any){
  const today  = new Date(); 
  this.post = {
    "trackId":row.trackId,
    "actualReturnDate": today,
    "bookId": row.bookId.bookId,
    "expectedReturnDate": row.expectedReturnDate,
    "personId": row.personId.id,
    "startDate": row.startDate,
    
  
};
  console.log(row.trackId)
  console.log(row);
  if(row.actualReturnDate === null)
  {
  console.log(  row.actualReturnDate)
  row.actualReturnDate = today;
  console.log(  this.post)
  this.service.returnissuebook(this.post).subscribe((val)=>{

    this.service.fetchrentedBook().subscribe((data:any) => {
      // console.log(data+'<<<<<<<');
      this.posts = data;
      this.toastr.success('Success', 'Message');

   
      // console.log( typeof this.posts[0].publishDate)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  })
  }


}












//   navigatetoupdate(){
// this.router.navigate(['home/booktrack'])
//   }

  /////////////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

////////////////////////////////////

RangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
     
     const date = new Date();
     const date2 =  new Date(control.value);

    //  console.log(date2.getDate())
    //  console.log( control.value !== null);
    //  console.log(date2.getFullYear(),date.getFullYear() )
      if ( date2.getDate() != date.getDate() ) {
        console.log(date );
          return { 'startdate': true };

      }
      return null;
  };
}

  ExpectedRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
       
       const date = new Date();
       const date2 =  new Date(control.value);
  
      //  console.log(date2.getDate())
      //  console.log( control.value !== null);
      //  console.log(date2.getFullYear(),date.getFullYear() )
       if ( date2.getFullYear() < date.getFullYear() ) {
        return { 'expectdate': true };
       }
       else if (date2.getFullYear() > date.getFullYear()){

        return null;
      
       }

       if(date2.getMonth() < date.getMonth() )
       {
        return { 'expectdate': true };
       }
       if(date2.getDate() < date.getDate() && date2.getMonth() < date.getMonth() )
       {
        return { 'expectdate': true };
       }
       if(date2.getDate() < date.getDate() && date2.getMonth() > date.getMonth() )
       {
        return null
       }
       if(date2.getDate() < date.getDate())
       {
        return { 'expectdate': true };
       }

       return null;
    };


 


    
}




displayFn1(brand:any) {

  return brand ? brand.title :null;

}
displayFn(brand:any) {

  return brand ? brand.personName :null;

}


filterdata(res:any){
   console.log(res);
  this.filteroption = this.allperson.filter((item:any) =>{
    return item.personName.toLowerCase().indexOf(res)>-1
  })
}

filterdata1(res:any){
     
  this.filteroption1 = this.allbook.filter((item:any) =>{
    console.log(item.title)
    return item.title.toLowerCase().indexOf(res)>-1
  })

  // console.log(this.filteredOptions1)
}















}
