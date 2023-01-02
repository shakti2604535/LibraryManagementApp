import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatebookService {
  error: any;

  constructor(private http:HttpClient) { }

  Createbook(postData:any){
    console.log(postData)
   return  this.http.post(environment.apiServer +'books/addbook',postData)
  }


 ftechbookbyid(data:any){
  // console.log(data)
   return  this.http.get(environment.apiServer +'books/'+data)

 }
 ftechbookbyids(data:any){
     this.http.get(environment.apiServer +'books/'+data).subscribe((val:any)=>{
      this.value =  val;
      console.log(val)
      return this.value;
     })

}
  fetchposts(){
   
    
    return  this.http.get(environment.apiServer +'books/onlybooks');
    }

    updateposts(postData:any){
      
      return this.http.put(environment.apiServer +'books/updatebook/'+postData.bookId,postData)

    }
    fetchrentedBook(){
   
    
      return  this.http.get(environment.apiServer +'booktrack/detailed');
      }

      returnissuebook(postData:any){
        return this.http.put(environment.apiServer +'booktrack/returnbook/'+postData.trackId,postData)
      }
      AssignBook(postData:any){
        console.log(postData.bookId,postData.authorid );
        return this.http.put(environment.apiServer +'author/'+postData.bookId.bookId+'/book/'+postData.authorid.authorid,postData );
      }
  RenteBook(postData:any){
    console.log(postData)
   return  this.http.post(environment.apiServer +'booktrack/assignbook',postData)
  }
  RentedBookByID(data:any){
    return this.http.get(environment.apiServer +'booktrack/book/'+data)
  }
  value:any;
  RentedBookByIDs(data:any){
       this.http.get(environment.apiServer +'booktrack/book/'+data).subscribe((val:any)=>{
        this.value = val
       })
        return this.value
  }

  paginatorapi(offset:any, pagesize:any)
  {
      return this.http.get(environment.apiServer +'books/bookscount/'+offset+'/'+pagesize);
  }
  paginatorapiusername(offset:any, pagesize:any,username:any)
  {
      return this.http.get(environment.apiServer +'books/booksbyname/'+offset+'/'+pagesize+'/'+username);
  }

}
