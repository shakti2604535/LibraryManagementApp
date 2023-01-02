import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-authordetails',
  templateUrl: './authordetails.component.html',
  styleUrls: ['./authordetails.component.scss']
})
export class AuthordetailsComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm:any;
  formGroup!: FormGroup;
 novalue:boolean= false;
 authorid:any
  post: any = '';
  action:string='Create Author'
  buttonval:string = 'Submit'
  val1:any
  submitorupdate: boolean = false;
  onresetchange:boolean = true;
  constructor(private service:AuthorService,private toastr:ToastrService,private formBuilder: FormBuilder,private route:ActivatedRoute,private navig:Router) { }

  ngOnInit(): void {
    this.novalue= false;
     this.authorid = this.route.snapshot.params['id']
     this.val1 = this.route.snapshot.data['data']
     if(this.authorid)
     {     console.log(this.val1)
      this.action = 'Update Author Details'
      this.buttonval = 'update';
      if(this.val1.authorId)
      { 
        this.onresetchange = false;
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
      this.onresetchange = true;
    this.createForm()
     }
   
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
  resetit(){
    // this.myForm.resetForm();
  if(this.onresetchange)
  {
    this.myForm.resetForm();
  }else{
    this.updatevalue(this.val1)
  }
   
   }

  updatevalue(row:any){
    this.submitorupdate = true;
    this.formGroup.markAllAsTouched;

  
 

      this.formGroup = this.formBuilder.group({
        'authorid':[row.authorId],
        'firstName': [row.firstName, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        'lastname': [row.lastname, [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
     
      
    
    })
   
  }
  onSubmit(post: any) {
    this.post = post;
   console.log( this.post)
   if(!this.submitorupdate)
   {
   this.service.Createbook(this.post).subscribe((val)=>{
    console.log(val);
    if(val)
    {
      this.navig.navigate(['/home/addauthor'])
      this.toastr.success('Success', 'Message');
    }
    else{
      this.toastr.error('failed', 'Alert');
    }
    // this.createForm();
   
    
 })
// if (this.myForm) {
//   this.myForm.resetForm();
// }

}
else{
  console.log('hi')
  this.service.updateauthor(this.post).subscribe((val)=>{

    if(val)
    {
      this.navig.navigate(['/home/addauthor'])
      this.toastr.success('Success', 'Message');
    }
    else{
      this.toastr.error('failed', 'Alert');
    }
 }) 
 
//  if (this.myForm) {
//    this.myForm.resetForm();
//  }
this.submitorupdate = false;
 }

      

 
}
}
