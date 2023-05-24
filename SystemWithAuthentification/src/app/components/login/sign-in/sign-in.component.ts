import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    hide = true;
	password = "password";
	email = new FormControl('', [Validators.required, Validators.email]);
	
	loginprocess: boolean;
	constructor(

		public authService: AuthService,
		private router: Router
	) {
		this.loginprocess = true;
	 }

	ngOnInit(): void {
		
	}
	signIn() {
		this.loginprocess = false;
		this.authService.SignIn(this.email.value, this.password);
	}
	forgot = function() {
		this.router.navigateByUrl('/forgot-password');
	};
	register = function() {
		this.router.navigateByUrl('/register-user');
	}
	googlelogin() {
		this.loginprocess = false;
		this.authService.GoogleAuth();
	}
	githublogin() {
		this.loginprocess = false;
		this.authService.GithubAuth();
	}
	facebooklogin() {
		this.loginprocess = false;
		this.authService.FacebookAuth();
	}
	getErrorMessage() {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}

		return this.email.hasError('email') ? 'Not a valid email' : '';
	}

}
