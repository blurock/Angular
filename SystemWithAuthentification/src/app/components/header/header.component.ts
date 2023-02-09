import { catchError, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../auth.service';
import { FEED } from '../../const/routes.const';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	user$: Observable<firebase.User> = this.auth.user$;

	constructor(
		private readonly auth: AuthService,
		private readonly snackBar: MatSnackBar,
		private readonly router: Router,
	) {
	}

	login() {
		this.router.navigateByUrl('/sign-in');
	}

	logout() {

		this.auth
			.logout()
			.pipe(take(1))
			.subscribe((response) => {
				this.router.navigate([``]);
				this.snackBar.open('Come back soon with treats! 😿', 'Close', {
					duration: 4000,
				});
			});
	}

}