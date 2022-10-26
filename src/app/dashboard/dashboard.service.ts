import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  
  fetchposts(){
   
    
  return  this.http.get('http://localhost:8080/books/books');
  }
}
