import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
/*import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';*/
import { SocialUsers } from '../socialusers';
import { SocialloginService } from '../../services/sociallogin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	errorMessage = 'error';
	response;
	socialusers = new SocialUsers();
	constructor(
		public OAuth: AuthService,
		private SocialloginService: SocialloginService,
		private router: Router
	) { }

	ngOnInit() {
	}
	public socialSignIn(socialProvider: string) {
		let socialPlatformProvider;
		if (socialProvider === 'facebook') {
			socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
		} else if (socialProvider === 'google') {
			socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
		}

		this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
			console.log(socialProvider, socialusers);
			console.log(socialusers);
			this.Savesresponse(socialusers);

		});
	}
	Savesresponse(socialusers: SocialUsers) {

		this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {
			debugger;
			console.log(res);
			this.socialusers = res;
			this.response = res.userDetail;
			localStorage.setItem('socialusers', JSON.stringify(this.socialusers));
			console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));
			this.router.navigate([`/Dashboard`]);
		})
	}
}  