import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient) { }
  fetchposts(){
   
    
    return  this.http.get('http://localhost:8080/get/personsdetail');
    }

    Createbook(postData:any){
      console.log(postData)
     return  this.http.post('http://localhost:8080/get/addperson',postData)
    }
    updateperson(postData:any){
      
      return this.http.put('http://localhost:8080/get/updateperson/'+postData.personId,postData)
    }
  
}
