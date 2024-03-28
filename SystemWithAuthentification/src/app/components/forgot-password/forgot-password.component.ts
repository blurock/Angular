import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	email = new UntypedFormControl('', [Validators.required, Validators.email]);

	constructor(
		public authService: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
	}
	getErrorMessage() {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}

		return this.email.hasError('email') ? 'Not a valid email' : '';
	}
	LogIn = function() {
		this.router.navigateByUrl('/sign-in');
	};

	reset = function() {
		this.authService.ForgotPassword(this.email.value);
	}
}
