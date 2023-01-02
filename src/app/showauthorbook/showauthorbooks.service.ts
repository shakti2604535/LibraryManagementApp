import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowauthorbooksService {

  constructor(private http:HttpClient) { }



  fetchauthorbooks(os:any,ps:any){
    return this.http.get(environment.apiServer +'books/pagination/'+os+'/'+ps);
  }
  fetchbyauthorfirstname(os:any,ps:any,val:any){
    return this.http.get(environment.apiServer +'books/namepagination', {params: new HttpParams().set('os', os).set('ps',ps).set('val',val)})
    // .pipe(
    //   catchError((err) => {
    //     console.log('err>>', err);
    //     return of([]);
    //   })
    // )
  }
  fetchauthorbooksbyid(bid:any,aid:any)
  {
    return this.http.get(environment.apiServer +'books/author/'+bid+'/'+aid)
  }

  createnewbook(data:any){
    return this.http.post(environment.apiServer +'books/create/'+data.authorid.authorid,data);
  }
}
