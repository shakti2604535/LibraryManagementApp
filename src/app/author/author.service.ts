import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }
  fetchposts(){
   
    
    return  this.http.get('http://localhost:8080/author/authorsdetails');
    }
    Createbook(postData:any){
      console.log(postData)
     return  this.http.post('http://localhost:8080/author/addauthor',postData)
    }
    updateauthor(postData:any){
      
      return this.http.put('http://localhost:8080/author/authorbyid/'+postData.authorid,postData)

    }
    updateposts(postData:any){
      
      return this.http.put('http://localhost:8080/author/authors/'+postData.authorid,postData)

    }
    fetchbyId(id:any){
      return this.http.get('http://localhost:8080/author/author/'+id);
    }
    
}
