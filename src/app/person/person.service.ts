import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient) { }

  fetchpersonbyId(data:any)
  {
                return this.http.get(environment.apiServer +'get/person/'+data)
  }
  fetchposts(){
   
    
    return  this.http.get(environment.apiServer +'get/personsdetail');
    }

    Createbook(postData:any){
      console.log(postData)
     return  this.http.post(environment.apiServer +'get/addperson',postData)
    }
    updateperson(postData:any){
      
      return this.http.put(environment.apiServer +'get/updateperson/'+postData.personId,postData)
    }
  
}
