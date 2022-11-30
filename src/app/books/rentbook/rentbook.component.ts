import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, toArray } from 'rxjs';
import { PersonService } from 'src/app/person/person.service';
import { CreatebookService } from '../createbook.service';

@Component({
  selector: 'app-rentbook',
  templateUrl: './rentbook.component.html',
  styleUrls: ['./rentbook.component.scss']
})
export class RentbookComponent implements OnInit {

  posts:any;
  filteroption:any;
  filteroption1:any;

  id:any;
  currentdate :any = new Date();
  constructor(private formBuilder: FormBuilder, private router:Router,private service:CreatebookService,private service1:PersonService,private route :ActivatedRoute,private navig:Router) { }

  @ViewChild(FormGroupDirective) myForm:any;
  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
allbook:any ;
allperson:any;

  ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  

  if(this.id)
  {  
    console.log(this.route.snapshot.data['data'])
   let  val = this.route.snapshot.data['data']
    console.log(val)
    // this.service.RentedBookByID(+this.id).subscribe((val)=>{
    if(this.route.snapshot.data['data'])
    {
    this.createForm();
   
  
       this.service.fetchposts().subscribe((val)=>{
      
                 this.allbook = val;
                 this.filteroption1 = val;
                 this.posts = this.route.snapshot.data['data'];
             
                 console.log(this.id)
                this.filteroption1 = this.filteroption1.filter((val1:any ) => val1.bookId === +this.id )
                if(this.filteroption1.length === 0)
                {
                  this.navig.navigate(['home/booktrack'])
                }
                 console.log(this.filteroption1)
                  this.formGroup = this.formBuilder.group({
                    'bookId': [this.filteroption1[0], [Validators.required]],
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
      })
      this.service1.fetchposts().subscribe((val)=>{
        
        this.allperson = val;
        this.filteroption =val;
      })
    }
    else{
   this.navig.navigate(['home/booktrack'])
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
    this.service.fetchrentedBook().subscribe((data:any) => {
    
      // console.log(234)
      this.posts = data;
   
      // .pipe(filter((data:any)=>data.bookId > 25),toArray())
      this.service.fetchposts().pipe(map((data:any) => data.filter((d: any) => d.availableStock > 0 ) )).subscribe((val)=>{
        console.log('test>>', val)
        console.log(234)

                 this.allbook = val;
                 console.log(val);
                 this.filteroption1 = val;

      })
      this.service1.fetchposts().subscribe((val)=>{
        this.allperson = val;
        this.filteroption = val;
      })
    });
  }
  this.createForm()

  }

  checkdata(data:any)
  {  if(data.availableStock > 0)
        { return true;
        }
        return false;
  }

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

  resetit()
  {
    this.router.navigate(['home/booktrack/assignbook'])
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
wrongval = false;
///////////////////////////////////////
  onSubmit(post: any) {
    this.post = {
      
        "actualReturnDate": null,
        "bookId": post.bookId.bookId,
        "expectedReturnDate": post.expectedReturnDate,
        "personId": post.personId.personId,
        "startDate": post.startDate,
        
      
    };
    // console.log('1234566')
  //  console.log( this.post+'hi')
   if(!this.post.bookId || !this.post.personId)
   {
    this.wrongval = true;
   }
   console.log('hi')
    
   this.service.RenteBook(this.post).subscribe((val)=>{

    console.log(val);  
    console.log('hi')
   if(!val)
   {
    this.nostock = true;
   }
  
   this.service.fetchrentedBook().subscribe((data:any) => {
    console.log(data);
    this.posts = data;
        
    // console.log(this.posts[0].publishDate)
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(this.posts);

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
   
   
  });
    
    // else{
    //         this.nostock = true;
    // }

}) 

if (this.myForm) {
  this.myForm.resetForm();
  this.filteroption1 = this.allbook;
  this.filteroption = this.allperson
  // this.myForm.markAllAsTouched;
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
   
   
    });
  })
  }


}








nostockreset()
{
  this.nostock = false;
  this.wrongval= false
}



  navigatetoupdate(){
this.router.navigate(['home/booktrack'])
  }

  /////////////////////////////////
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   console.log(this.dataSource)
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   console.log(this.dataSource)
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

////////////////////////////////////

RangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
     
     const date = new Date();
     const date2 =  new Date(control.value);

    //  console.log(date2.getDate())
    //  console.log( control.value !== null);
    //  console.log(date2.getFullYear(),date.getFullYear() )
      if ( date2.getDate() !== date.getDate() ) {
        console.log(date );
        console.log('hi')
          return { 'startdate': true };

      }
      if ( date2.getMonth() !== date.getMonth() ) {
        console.log(date );
        console.log('hi')
          return { 'startdate': true };

      }
      if ( date2.getFullYear() !== date.getFullYear() ) {
        console.log(date );
        console.log('hi')
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

