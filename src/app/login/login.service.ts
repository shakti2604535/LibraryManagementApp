import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

private  logginstatus:boolean = false;
isAuthenticated() {
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
}

logout() {
  this.logginstatus = false;
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
