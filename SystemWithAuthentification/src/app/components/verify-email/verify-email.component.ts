import { Component, OnInit } from '@angular/core';
import {SessiondatamanagementService} from '../../services/sessiondatamanagement.service';
import { Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  email: string;
  constructor(
	public session: SessiondatamanagementService,
	private router:Router,
	public authService: AuthService
) { }

  ngOnInit(): void {
    const auth = this.session.getAuthorizationData();
    this.email = auth.email;
  }
login(): void {
   this.router.navigateByUrl(`/sign-in`);
  }
  
  toppage(): void {
    if(this.authService.isLoggedIn) {
      this.router.navigateByUrl(`/toppage`);
			} else {
        if(this.authService.isValidated) {
          this.router.navigateByUrl(`/usersetup`);
        } else {
          alert('Email needs to be validated');
        }
      }
    
  }
  

  
}
