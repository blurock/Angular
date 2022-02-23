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
		this.auth
			.loginViaGoogle()
			.pipe(
				take(1),
				catchError((error) => {
					this.snackBar.open(`${error.message} 😢`, 'Close', {
						duration: 4000,
					});
					return EMPTY;
				}),
			)
			.subscribe(
				(response) => {
					if (response != null) {
						alert(JSON.stringify(response.user.providerData));
						alert(JSON.stringify(response.user.refreshToken));
					    alert(JSON.stringify(response.user.tenantId));
						alert(JSON.stringify(response.user.uid));
						this.snackBar.open(
							`You are successfully logged in`,
							'Close',
							{
								duration: 4000,
							},
						);
					}
				}
			);
	}

	logout() {
		this.auth
			.logout()
			.pipe(take(1))
			.subscribe((response) => {
				this.router.navigate([`/${FEED}`]);
				this.snackBar.open('Come back soon with treats! 😿', 'Close', {
					duration: 4000,
				});
			});
	}

}