import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient,private login:LoginService) { 
    // console.log(this.login.token.subjects+"hi" )
  }
  


  fetchposts(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.login.token );
    // headers.set("Access-Control-Allow-Origin", "*");
    // let headers = new Headers({ 'Authorization': 'Bearer ' + this.login.token });
    console.log(this.login.token)
    // console.log(this.httpOptions)
  return  this.http.get('http://localhost:8080/books/books');
  }
}
