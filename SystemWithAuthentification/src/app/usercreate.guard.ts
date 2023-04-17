import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class UsercreateGuard implements CanActivate {

	constructor(
		public authService: AuthService,
		public router: Router
	) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		var ans = true;
		alert("islogged in" + this.authService.isLoggedIn);
		if (this.authService.isLoggedIn !== true) {
            alert("this.authService.isRegistered " + this.authService.isRegistered);
			if (this.authService.isRegistered) {
				if (this.authService.isValidated) {
					ans = true;
				} else {
					return this.router.parseUrl('/verify-email-address');
				}
			} else {
				return this.router.parseUrl('');
			}
		} else {
			return this.router.parseUrl('/toppage');
		}
		return ans;
	}

}
