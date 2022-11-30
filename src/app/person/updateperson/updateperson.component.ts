import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-updateperson',
  templateUrl: './updateperson.component.html',
  styleUrls: ['./updateperson.component.scss']
})
export class UpdatepersonComponent implements OnInit {
  formGroup!: FormGroup;
  @ViewChild(FormGroupDirective) myForm:any;
  post: any = '';
  submitorupdate:boolean = false;
  first:string = ''
  constructor(private formBuilder: FormBuilder,public datepipe: DatePipe,private service:PersonService,private route:ActivatedRoute,private navig:Router) { }
  personid:any;
  novalue:boolean = false;
  action:string='Create Person'
val1:any;
  ngOnInit(): void {
    this.novalue= false;
     this.personid = this.route.snapshot.params['id']
     this.val1 = this.route.snapshot.data['data']
     if(this.personid)
     {     console.log(this.val1)
      this.action = 'Update Person Details'
      if(this.val1.id !== 0)
      { 
        console.log(this.val1.status)
      this.createForm(); 
      //  console.log(this.service.details)
         this.submitorupdate =true;
        this.updatevalue(this.val1)
      }
      else {
        // console.log("hhiiiiiiiii")
             this.novalue = true;
      }
     }
     else{
    this.createForm()
     }
   
  }


  updatevalue(row:any){
    this.submitorupdate = true;
    // this.formGroup.markAllAsTouched;
    console.log(row);
    const curr = this.datepipe.transform(row.dob, 'yyyy-MM-dd')
    this.formGroup = this.formBuilder.group({
      'personId':[row.id],
      'name': [row.name, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      'address': [row.address, [Validators.required,Validators.minLength(5)]],
      // 'pageCount': [null, [Validators.required,Validators.min(50) ]],
      'dob': [curr, [Validators.required,this.RangeValidator()]],
      // 'availableStock': [null, [Validators.required,Validators.min(2)]],
      'validate': ''
    });
  }

  resetit(){
    // this.myForm.resetForm();
    this.navig.navigate(['home/addperson/create'])
   
   }
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
  onSubmit(post: any) {
    this.post = post;
   console.log( this.post)
   if(!this.submitorupdate)
   {
   this.service.Createbook(this.post).subscribe((val)=>{
    console.log(val);
    // this.createForm();
 
    
 })
if (this.myForm) {
  this.myForm.resetForm();
}
   }
   else {

    this.service.updateperson(this.post).subscribe((val)=>{
      console.log(val);
      // this.createForm();
     
      
   })
  if (this.myForm) {
    this.myForm.resetForm();
  }
   }

 
      

 
}

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
