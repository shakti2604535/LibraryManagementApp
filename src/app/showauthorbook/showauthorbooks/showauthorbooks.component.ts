import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, from, fromEvent, map, pluck, Subject, switchMap } from 'rxjs';
import { ShowauthorbooksService } from '../showauthorbooks.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-showauthorbooks',
  templateUrl: './showauthorbooks.component.html',
  styleUrls: ['./showauthorbooks.component.scss']
})
export class ShowauthorbooksComponent implements OnInit {

  displayedColumns: string[] = [ 'firstname', 'title','description','AvailableStock','PublishedDate','pageCount'];
  dataSource!: MatTableDataSource<any>;
  posts:any;
  filterValue:any = "";
  forpagination:boolean = true;
  ps:number = 5;
  os:number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder: FormBuilder,private service:ShowauthorbooksService,private route:Router) {
    
   }

  ngOnInit(): void {
        // console.log(this.Inpage,this.Insize)
  
    this.service.fetchauthorbooks(this.os,this.ps).subscribe((val)=>{
      console.log(val)
      this.posts = val;
   
      // console.log(data.bookId)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts.ab);
      
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.filterBySubject();
    }, (err: HttpErrorResponse) => {
      if (err.status === 404) {

      }
    })
    this.subjectKeyUp.pipe(
      // map(data=>console.log(data)),
      // debounceTime(100),
      // distinctUntilChanged(),
      switchMap(s => this.service.fetchbyauthorfirstname(this.os,this.ps,s))).subscribe((val:any)=>{
        console.log(val);
        if(val != null){
        this.posts = val;
         
        // console.log(data.bookId)
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.posts.ab);
        
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      })
   
  // this.$filter.pipe(switchMap(s =>this.service.fetchbyauthorfirstname())).subscribe((val:any)=>{console.log(val)})
   
  }

  filterBySubject() {
    let filterFunction = 
        (data: any, filter: string): boolean => {
          if (filter) {
            const subjects = data.description;
            // console.log(filter)
            // console.log(subjects);
            // console.log(subjects[0])
            // console.log('hi')
            // for (let i = 0; i < subjects.length; i++) {
              if (subjects.indexOf(filter) != -1) {
                console.log(subjects.indexOf(filter))
                return true;
              // }
            }
            return false;
          } else {
            return true;
          }
       };
    return filterFunction;
}

////////////////
pageEvent!: PageEvent;
pagenisation:any;
// Inpage:any = this.pageEvent.pageIndex;
// Insize = this.pageEvent.pageSize;
onPaginateChange(event: PageEvent) {
  let page = event.pageIndex;
  let size = event.pageSize;
  this.os = page;
  this.ps = size;
  // page = page+1;
  // console.log(page,size,2)
  // console.log(this.filterValue.length)

if(this.filterValue.length === 0){
 
  this.service.fetchauthorbooks(page,size).subscribe((val:any)=>{
    this.posts = val
    console.log('1243')
     this.dataSource = new MatTableDataSource(this.posts.ab);

  })
}
else{
  console.log('shaktu')
  this.service.fetchbyauthorfirstname(page,size,this.filterValue).subscribe((val)=>{
    console.log(val)
    this.posts = val;
 
    // console.log(data.bookId)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.posts.ab);
    
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterBySubject();
  })
}
}
//////////////////////////////////////
private $filter: Subject<string> = new Subject<string>();

private subjectKeyUp = new Subject<any>();
onSearch($event: any) {
 
  const value = $event.target.value;
  console.log(value)
  if(value.length != 0){
  this.subjectKeyUp.next(value);
  // this.$filter.next(value)
  }
  else{
    this.service.fetchauthorbooks(this.os,this.ps).subscribe((val)=>{
      console.log(val)
      this.posts = val;
   
      // console.log(data.bookId)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts.ab);
      
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.filterBySubject();
    })
  
  }

 

}





// findByName(username: any) {

  
//   if(username.length>0){
    
//   this.service.fetchbyauthorfirstname(0,5,username).subscribe((val:any)=>{
//     console.log(val);
//     if(val != null){
//     this.posts = val;
     
//     // console.log(data.bookId)
//     // Assign the data to the data source for the table to render
//     this.dataSource = new MatTableDataSource(this.posts.ab);
    
//     // this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }
//   })
// }else{
//   this.service.fetchauthorbooks(0,5).subscribe((val)=>{
//     console.log(val)
//     this.posts = val;
 
//     // console.log(data.bookId)
//     // Assign the data to the data source for the table to render
//     this.dataSource = new MatTableDataSource(this.posts);
    
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//     this.dataSource.filterPredicate = this.filterBySubject();
//   })

// }
 

//}


  applyFilter(event: Event) {
    const filterValue:any = (event.target as HTMLInputElement).value;
 
    this.dataSource.filter = filterValue.trim().toLowerCase();
     console.log(this.dataSource)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ///////////////////////
  // applyFilter1(event: Event) {
  //   const filterValue:any = (event.target as HTMLInputElement).value;
 
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //    console.log(this.dataSource)
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  //////////////////////////
  navigatetoupdate(){
this.route.navigate(['home/showauthorbooks/create'])
  }
  Navidatetoupdate(bid:any,aid:any){
    this.route.navigate(['home/update/'+bid+'/'+aid])
  }

}
