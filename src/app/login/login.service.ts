import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

private  logginstatus:boolean = true;
isAuthenticated() {
  this.logginstatus = sessionStorage.getItem('logginstatus') === 'Y' ? true : false ;
  // this.logginstatus = localStorage.getItem('logginstatus') === 'Y' ? true : false ;
  // console.log(sessionStorage.getItem('logginstatus'))
  const promise = new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve(this.logginstatus);
      }, 80);
    }
  );
  return promise;
}
 
login() {
  this.logginstatus = true;
  sessionStorage.setItem('logginstatus', 'Y');
  // localStorage.setItem('logginstatus', 'Y');
}

logout() {
  // this.logginstatus = false;
  sessionStorage.setItem('logginstatus', 'N');
  // localStorage.setItem('logginstatus', 'N');
}
// islogin(data:boolean)
// {
//   this.logginstatus = data;
// }
// isauthenticte()
// {
//   return this.logginstatus;
// }



  constructor(private http:HttpClient) { }
  
  fetchposts(user:string){
   
    
  return  this.http.get('http://localhost:8080/get/librarian/'+user);
  }

  createlibrarian(data:any){
    return  this.http.post('http://localhost:8080/get/newlibr',data);
  }
  
}
