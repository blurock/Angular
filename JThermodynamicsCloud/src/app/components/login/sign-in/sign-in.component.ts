import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { UntypedFormControl, Validators} from '@angular/forms';
//import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
	standalone: true,
	providers: [AuthService],
	imports: [CommonModule,ReactiveFormsModule,
	FormsModule,MatCardModule,MatDivider,MatFormFieldModule,
	MatIconModule,MatProgressSpinnerModule, MatInputModule,MatButtonModule
	]
})
export class SignInComponent implements OnInit {
    hide = true;
    
	password = new UntypedFormControl('password', [Validators.required]);
	email = new UntypedFormControl('', [Validators.required, Validators.email]);
	
	loginprocess: boolean;
	constructor(
		private authService: AuthService,
		//private router: Router
	) {
		this.loginprocess = true;
	 }

	ngOnInit(): void {
		
	}
	signIn() {
		
		this.loginprocess = false;
		
		//this.authService.SignIn(this.email.value, this.password);
	}
	forgot = () => { // Arrow function here!
    //this.router.navigateByUrl('/forgot-password'); // 'this' is now correctly typed
  };
	register = () =>{
		//this.router.navigateByUrl('/register-user');
	}
	async googlelogin() { 
		
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
