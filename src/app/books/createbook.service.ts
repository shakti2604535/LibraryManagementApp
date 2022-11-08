import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatebookService {
  error: any;

  constructor(private http:HttpClient) { }

  Createbook(postData:any){
    console.log(postData)
   return  this.http.post('http://localhost:8080/books/addbook',postData)
  }


 ftechbookbyid(data:any){
  return this.http.get('http://localhost:8080/books//book/'+data);

 }
  fetchposts(){
   
    
    return  this.http.get('http://localhost:8080/books/onlybooks');
    }

    updateposts(postData:any){
      
      return this.http.put('http://localhost:8080/books/updatebook/'+postData.bookId,postData)

    }
    fetchrentedBook(){
   
    
      return  this.http.get('http://localhost:8080/booktrack/detailed');
      }

      returnissuebook(postData:any){
        return this.http.put('http://localhost:8080/booktrack/returnbook/'+postData.trackId,postData)
      }
      AssignBook(postData:any){
        console.log(postData.bookId,postData.authorid );
        return this.http.put('http://localhost:8080/author/'+postData.bookId.bookId+'/book/'+postData.authorid.authorid,postData );
      }
  RenteBook(postData:any){
    console.log(postData)
   return  this.http.post('http://localhost:8080/booktrack/assignbook',postData)
  }
  RentedBookByID(data:any){
    return this.http.get('http://localhost:8080/booktrack/book/'+data)
  }

  paginatorapi(offset:any, pagesize:any)
  {
      return this.http.get('http://localhost:8080/books/bookscount/'+offset+'/'+pagesize);
  }
  paginatorapiusername(offset:any, pagesize:any,username:any)
  {
      return this.http.get('http://localhost:8080/books/booksbyname/'+offset+'/'+pagesize+'/'+username);
  }

}
