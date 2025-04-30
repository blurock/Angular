import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class UsercreateGuard  {

	constructor(
		public authService: AuthService,
		public router: Router
	) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		var ans = true;
		if (this.authService.isLoggedIn() !== true) {
			if (this.authService.isRegistered) {
				if (this.authService.isValidated) {
					ans = true;
				} else {
					return this.router.navigateByUrl('/verify-email-address');
				}
			} else {
				return this.router.navigateByUrl('');
			}
		} else {
			return this.router.navigateByUrl('/toppage');
		}
		return ans;
	}

}
