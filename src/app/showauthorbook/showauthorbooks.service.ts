import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowauthorbooksService {

  constructor(private http:HttpClient) { }



  fetchauthorbooks(){
    return this.http.get('http://localhost:8080/author/authorse');
  }
  fetchbyauthorfirstname(val:any){
    return this.http.get('http://localhost:8080/author/authorwith/'+val)
  }
  fetchauthorbooksbyid(bid:any,aid:any)
  {
    return this.http.get('http://localhost:8080/author/author/'+bid+'/'+aid)
  }

  createnewbook(data:any){
    return this.http.put('http://localhost:8080/author/authors/'+data.authorid.authorid,data);
  }
}
