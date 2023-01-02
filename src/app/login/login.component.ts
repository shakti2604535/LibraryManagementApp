import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/internal/Subject';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  allowsign:boolean = false;
  form1!:FormGroup;
details:any = [];
 loginstatus:boolean = false;
validateuser:string='';
validatepassword:string='';

  constructor(private loginservice:LoginService, private route:Router, private toastr: ToastrService) { }
  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(6)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  get username() {
    return this.form.get('username');
  }
  get username1() {
    return this.form1.get('emailId');
  }
  get password() {
    return this.form.get('password');
  }
  get password1() {
    return this.form1.get('password');
  }
  get name() {
    return this.form1.get('name');
  }
  ngOnInit(): void {
    this.loginservice.logout();
  }
  user1:any;
  submit(user:any) {
    
    if(this.username?.value && this.password?.value) {
              console.log(user)
              this.user1 = {
               "userName":user.username,
               "password":user.password
    
               
              }
      
   this.loginservice.fetchpost(this.user1).subscribe((data:any)=>{
    // console.log(Object.entries(data)[0][1]  ) 
    // console.log(Object.keys(data)[2]) 
    // console.log(data.emailId) ;
    // console.log('hi')
      // console.log(data);

// this.validateuser = data.emailId;
// this.validatepassword = data.password;

  // this.validateuser = Object.values(data)[1],
  // this.validatepassword = Object.values(data)[2]
  // if (this.validateuser=== this.username?.value && this.validatepassword === this.password?.value)
  if(data.status === 200 )
  {
  //  console.log(data)
  //  console.log(this.validatepassword,this.validateuser,this.loginstatus)
   this.loginservice.login(data.token);
   this.toastr.success('login success','Message');
     this.route.navigate(['home/dashboard'])
    //  this.loginservice.islogin(true);
  }
  else{
    this.toastr.error('Login fail', 'Wrong Credential');
    console.log('hi')
  this.loginstatus = true;
  }
  })
// console.log(this.validatepassword,this.validateuser,this.loginstatus)
}
else  {
  this.loginstatus = true;
     }
}
navigatelogin(){
  this.allowsign =false;
}

  signin(){
    this.allowsign = true;

    console.log('ji')
    this.form1 = new FormGroup({
      emailId: new FormControl('',[Validators.required,Validators.minLength(6)]),
      name: new FormControl('',[Validators.required,Validators.minLength(6)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    });

  
  }
  changevalue()
  {
    this.loginstatus = false;
  }
  postadata:any;
  iscreated:any = true;
  changeval(){
    this.iscreated = true;
    // console.log('hi')
  }
  submitted() 
    {
      // console.log(this.form1.value);
      if(this.form1.valid)
      {  this.postadata = this.form1.value;
        // console.log(this.form1.value);
      // this.allowsign =false;
      this.loginservice.createlibrarian(this.postadata).subscribe((val)=>{
        // console.log(val+"<<<<<<");
            this.iscreated = val;
     if(val === true)
     {   this.toastr.success('Signup success','Message');
      this.allowsign =false;
     }
     else{
      this.toastr.success('sign up fail', 'Alert');

     }
      })
      }
    }
  
}


