import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, from, fromEvent, Subject } from 'rxjs';
import { ShowauthorbooksService } from '../showauthorbooks.service';

@Component({
  selector: 'app-showauthorbooks',
  templateUrl: './showauthorbooks.component.html',
  styleUrls: ['./showauthorbooks.component.scss']
})
export class ShowauthorbooksComponent implements OnInit {

  displayedColumns: string[] = [ 'firstname', 'title', 'BookId','description','AvailableStock','PublishedDate','pageCount'];
  dataSource!: MatTableDataSource<any>;
  posts:any;
  filterValue:any = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder: FormBuilder,private service:ShowauthorbooksService,private route:Router) { }

  ngOnInit(): void {

  
    this.service.fetchauthorbooks().subscribe((val)=>{
      console.log(val)
      this.posts = val;
   
      // console.log(data.bookId)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.filterBySubject();
    })
    this.subjectKeyUp.pipe(debounceTime(1000),distinctUntilChanged()).subscribe((val:any)=>{
      console.log(val)
      this.findByName(val);
    })
   
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
//////////////////////////////////////
private subjectKeyUp = new Subject<any>();
onSearch($event: any) {
  const value = $event.target.value;
  this.subjectKeyUp.next(value);

 

}





findByName(username: any) {

  
  if(username.length>0){
    
  this.service.fetchbyauthorfirstname(username).subscribe((val:any)=>{
    console.log(val);
    if(val != null){
    this.posts = val;
     
    // console.log(data.bookId)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.posts);
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  })
}else{
  this.service.fetchauthorbooks().subscribe((val)=>{
    console.log(val)
    this.posts = val;
 
    // console.log(data.bookId)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.posts);
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterBySubject();
  })

}
 

}


  applyFilter(event: Event) {
    const filterValue:any = (event.target as HTMLInputElement).value;
 
    this.dataSource.filter = filterValue.trim().toLowerCase();
     console.log(this.dataSource)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ///////////////////////
  applyFilter1(event: Event) {
    const filterValue:any = (event.target as HTMLInputElement).value;
 
    this.dataSource.filter = filterValue.trim().toLowerCase();
     console.log(this.dataSource)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //////////////////////////
  navigatetoupdate(){
this.route.navigate(['home/create'])
  }
  Navidatetoupdate(bid:any,aid:any){
    this.route.navigate(['home/update/'+bid+'/'+aid])
  }

}
