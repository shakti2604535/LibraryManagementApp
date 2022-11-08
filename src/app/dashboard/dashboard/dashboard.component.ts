import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['bookId', 'bookName', 'AuthorName', 'AvavilableStock','RentedBooks','Overdue'];
  dataSource!: MatTableDataSource<any>;
  posts:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: DashboardService,private router:Router,private activatedroute:ActivatedRoute) {
  }
  ngOnInit(){
    this.service.fetchposts().subscribe((data:any) => {
      // console.log(data);
      this.posts = data;
   
      console.log(data.bookId)
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.findbytitle();
      this.dataSource.sort = this.sort;
    });

  }
  findbytitle(){
  
      let filterFunction = 
          (data: any, filter: string): boolean => {
            if (filter) {
              const subjects = data.bookName;
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

  


   

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  naviagtetobook(id:any){
    this.router.navigate(['home/createbook/'+id]);

  }
  navigatetotrack(data:any){
    this.router.navigate(['home/booktrack/'+data])
    
  
  }
}
