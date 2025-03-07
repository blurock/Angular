import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class AuthGuard  {

	constructor(
		public authService: AuthService,
		public router: Router
	) { }
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree{
			let ans = true;
		if (this.authService.isLoggedIn !== true) {
			if(this.authService.isRegistered) {
				if(this.authService.isValidated) {
					return this.router.parseUrl('/usersetup');
				} else {
					return this.router.parseUrl('/verify-email-address');
				}
			} else {
				this.router.parseUrl('');
				ans = false;
			}
		} else {
		}
		return ans;
	}
}
