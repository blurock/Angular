import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	hide = true;
	password = "password";
	email = new UntypedFormControl('', [Validators.required, Validators.email]);


	constructor(
		public authService: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
	}
	signUp() {
		this.authService.SignUp(this.email.value, this.password);
	}
	LogIn = function() {
		this.router.navigateByUrl('/sign-in');
	};
	getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
