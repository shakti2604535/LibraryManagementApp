import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/author/author.service';
import { CreatebookService } from 'src/app/books/createbook.service';
import { ShowauthorbooksService } from '../showauthorbooks.service';

@Component({
  selector: 'app-createauthorbook',
  templateUrl: './createauthorbook.component.html',
  styleUrls: ['./createauthorbook.component.scss']
})
export class CreateauthorbookComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm:any;
  heading:string='Add Book to library'
  button:string='Submit'
  author:any;
  filteredOptions:any;
  formGroup!: FormGroup;
  bid:any;
  aid:any;
  val1:any;
  update:boolean = false;
  constructor(private service1:AuthorService, private service2:CreatebookService,private datepipe: DatePipe,private formBuilder: FormBuilder,private service:ShowauthorbooksService,private route:ActivatedRoute,private navig:Router,) { }

  ngOnInit(): void {
   console.log( this.route.snapshot.data['data'])
    this.service1.fetchposts().subscribe((val:any)=>{
      this.author = val;
      console.log(val);
      this.filteredOptions = val;
     
  })
    this.bid = +this.route.snapshot.params['bid']
   this.aid = +this.route.snapshot.params['aid']
   if(this.aid && this.bid)
   {
    this.createForm();
    // this.service.fetchauthorbooksbyid(this.bid , this.aid).subscribe((val:any)=>{
      // console.log(val)
      this.val1 = this.route.snapshot.data['data']
      if(this.val1)
      {
      console.log(this.val1)
        this.heading='update book';
        this.button='update'
        this.update = true;
      const curr = this.datepipe.transform(this.val1.publishDate, 'yyyy-MM-dd')
 
      this.formGroup = this.formBuilder.group({
         'bookId':[this.val1.bookId],
        'title': [this.val1.title, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        'description': [this.val1.description, [Validators.required,Validators.minLength(5)]],
        'pageCount': [this.val1.pageCount, [Validators.required,Validators.min(50) ]],
        'publishDate': [curr, [Validators.required,,this.RangeValidator()]],
        'availableStock': [this.val1.availableStock, [Validators.required,Validators.min(2)]],
        'authorid':[{ value:  this.val1.firstname+" "+this.val1.lastname , disabled: true }, Validators.required]
  
       
      });
    }
    else{
      this.navig.navigate(['home/showauthorbooks'])
    }
      // this.formGroup.get('authorid')?.valueChanges.subscribe((res1)=>{
   
      //   this.filterdata(res1)
      // })

    // })
   }
   else{

  this.createForm()

  }
 
}

  createForm() {
  
    this.formGroup = this.formBuilder.group({
      
      'title': [null, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'description': [null, [Validators.required,Validators.minLength(5)]],
      'pageCount': [null, [Validators.required,Validators.min(50) ]],
      'publishDate': [null, [Validators.required,,this.RangeValidator()]],
      'availableStock': [null, [Validators.required,Validators.min(2)]],
      'authorid':[null,Validators.required],
      'validate': ''
      


     
    });
    this.formGroup.get('authorid')?.valueChanges.subscribe((res1)=>{
   
      this.filterdata(res1)
    })
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
  get authorid() {
    return this.formGroup!.get('authorid') as FormControl
  }

  RangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
       
       const date = new Date();
       const date2 =  new Date(control.value);
  
      //  console.log(date2.getDate())
      //  console.log( control.value !== null);
      //  console.log(date2.getFullYear(),date.getFullYear() )
      if(date2.getFullYear()<1900)
      {
        return { 'startdate': true };
      }
        if ( date.getFullYear() - date2.getFullYear() < 0  ) {
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
  


  filterdata(res:any){
    this.filteredOptions = this.author.filter((item:any) =>{
      return item.authorName.toLowerCase().indexOf(res)>-1
    })
    console.log(this.filteredOptions)
}
  displayFn(brand:any) {

    return brand ? brand.authorName :null;

  }
 resetit(){
  // this.myForm.resetForm();
  this.navig.navigate(['home/create'])
  // this.createForm()
  // this.heading='Add Book to library'
  // this.button='Submit'
  // this.update = false
  
 }

  onSubmit(data:any)
  {
    console.log(data)
    if(!this.update){
    this.service.createnewbook(data).subscribe();
    this.myForm.resetForm();
    }
    else{
      
      this.service2.updateposts(data).subscribe((val:any)=>{
        console.log(val);
        if(val != null)
        {
         this.heading='Add Book to library'
         this.button='Submit'
          this.myForm.resetForm();
          this.navig.navigate(['home/showauthorbooks'])
        }
      })
    }

  }
}
