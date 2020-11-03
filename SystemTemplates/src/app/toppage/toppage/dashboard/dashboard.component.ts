import { Component, OnInit } from '@angular/core';  
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { SocialUsers } from '../../socialusers'  
import { SocialloginService } from '../../../services/sociallogin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  socialusers = new SocialUsers();
  constructor(public OAuth: SocialAuthService,    private router: Router) { }

  ngOnInit() {
    this.socialusers = JSON.parse(localStorage.getItem('socialusers'));
    console.log(this.socialusers.image);
  }
  logout() {
   alert(1);
    this.OAuth.signOut().then(data => {
      debugger;
      this.router.navigate([`/Login`]);
    });
  }

}
