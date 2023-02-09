import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) { }

  ngOnInit(): void {
  }
  
  startclick() {
    alert("start");
    alert(this.auth.isLoggedIn);
    if(this.auth.isLoggedIn) {
      this.router.navigateByUrl('/toppage');
    } else {
      this.router.navigateByUrl('/sign-in');
    }
  }

}
