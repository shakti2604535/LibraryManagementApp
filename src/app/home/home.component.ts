import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route :Router,private servicd:LoginService) { }

  ngOnInit(): void {
  }

  logout()
  {
     this.route.navigate(['/']);
       this.servicd.logout();

  }

}
