import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { ServiceUtilityRoutines } from './serviceutilityroutines';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../const/routes.const';
import { SessiondatamanagementService } from '../services/sessiondatamanagement.service';
import firebase from 'firebase//compat/app';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Ontologyconstants } from '../const/ontologyconstants';
import { __assign } from 'tslib';


@Injectable({
	providedIn: 'root'
})
export class AuthService {


	userData: any; // Save logged in user data
	constructor(
		public session: SessiondatamanagementService,
		public afs: AngularFirestore, // Inject Firestore service
		public afAuth: AngularFireAuth, // Inject Firebase auth service
		public router: Router,
		public ngZone: NgZone, // NgZone service to remove outside scope warning
		private httpClient: HttpClient
	) {
		/* Saving user data in localstorage when
			  logged in and setting up null when logged out */

		this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.SetUserData(user);
				this.ngZone.run(() => {
				});
			} else {
			}
		});
	}
	// Sign in with email/password
	async SignIn(email: string, password: string) {
		return this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				this.ngZone.run(() => {
					this.router.navigate(['']);
				});
				this.SetUserData(result.user);
			})
			.catch((error) => {
				alert(error.message);
			});
	}
	// Sign up with email/password
	SignUp(email: string, password: string): any {
		return this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				/* Call the SendVerificaitonMail() function when new user sign
				up and returns promise */
				const user = result.user;
				this.SendVerificationMail();
				this.SetUserData(result.user);
			})
			.catch((error) => {
				alert("SignUp: " + error.message);
			});
	}
	// Send email verfificaiton when new user sign up
	SendVerificationMail(): any {
		return this.afAuth.currentUser
			.then((u: any) =>
				u.sendEmailVerification()
			)
			.then(() => {
				this.router.navigate(['verify-email-address']);
			});
	}
	// Reset Forggot password
	ForgotPassword(passwordResetEmail: string): any {
		return this.afAuth
			.sendPasswordResetEmail(passwordResetEmail)
			.then(() => {
				window.alert('Password reset email sent, check your inbox.');
			})
			.catch((error) => {
				window.alert(error);
			});
	}
	// Returns true when user is looged in and email is verified
	get isLoggedIn(): boolean {
		const ans = this.session.isLoggedIn();
		return ans;
	}
	get isRegistered(): boolean {
		const uid = this.session.getUID()
		return uid != null && uid != this.session.getGuestuidlabel();
	}
	get isValidated(): boolean {
		var ans = false;
		if (environment.production) {
			const auth = getAuth();
			const user = auth.currentUser;
			if (user !== null) {
				const emailVerified = user.emailVerified;
				ans = emailVerified;
			}

		} else {
			ans = this.session.getLoginStatus() != null;
		}
		return ans;
	}
	// Sign in with Google
	GoogleAuth() {
		const ans = this.AuthLogin(new auth.GoogleAuthProvider());
	}
	GithubAuth() {
		const ans = this.AuthLogin(new GithubAuthProvider());
	}
	FacebookAuth() {
		return this.AuthLogin(new auth.FacebookAuthProvider())
	}

	AuthLogin(provider: any) {
		this.session.clearSession();
		return this.afAuth
			.signInWithPopup(provider)
			.then((result) => {
				this.SetUserData(result.user);
			})
			.catch((error) => {
				window.alert("Authorization error: " + error);
			});
	}

	/* Setting up user data when sign in with username/password, 
	sign up with username/password and sign in with social auth  
	provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
	SetUserData(user: any): void {
		getAuth().currentUser.getIdToken(true).then((token) => {
			if (this.session.getAuthorizationData() == null || this.session.getUserAccount() == null) {
				const uid = user.uid;
				const email = user.email;
				const displayname = user.displayName;
				let providerId = '';
				const provideridarray = user.providerData;
				if (provideridarray[0] != null) {
					const providerdata = provideridarray[0];
					providerId = providerdata.providerId;
				}
				const logintransaction = {};
				const userdata = {};
				logintransaction['service'] = 'dataset:FirstLoginService';
				userdata['email'] = email;
				userdata['uid'] = uid;
				userdata['token'] = token;
				userdata['displayname'] = displayname;
				userdata['providerId'] = providerId;
				userdata['isValidated'] = user.emailVerified;
				logintransaction['user'] = userdata;
				this.session.setAuthorizationData(userdata);
				this.session.setToken(token);
				this.getUserInformationFromServer(logintransaction, token, user);
			} else {
				this.router.navigateByUrl('/toppage');
			}
		});
	}

	getUserInformationFromServer(logintransaction: any, token: string, user: any) {
		const headerdata = ServiceUtilityRoutines.setupHeader(token);
		const httpaddr = environment.apiURL + '/' + Login;
		this.httpClient.post(httpaddr, logintransaction, { headers: headerdata })
			.subscribe({
				next: (response: any) => {
					if (response[Ontologyconstants.successful] == "true") {
						const loginresult = response[Ontologyconstants.catalogobject];
						if (loginresult != null) {
							const result = loginresult[0];
							const status = result['dataset:loginstage'];


							this.session.setLoginStatus(status);
							const loginaccount = result['dataset:loginaccountinfo'];
							if (status == "dataset:LoginAuthenticated" || status == 'dataset:LoginAccountInformation') {
								this.session.storeLoginAccount(loginaccount);
								if (user.emailVerified) {
									this.router.navigateByUrl('/usersetup');
								} else {
									this.router.navigate(['/verify-email-address']);
								}
							} else if (status == "dataset:LoginRegistration") {
								this.session.storeLoginAccount(loginaccount);
								const person = result[Ontologyconstants.DatabasePerson];
								this.session.setDatabasePerson(person);
								const useraccount = result[Ontologyconstants.UserAccount];
								this.session.setUserAccount(useraccount);
								if (user.emailVerified) {
									this.router.navigateByUrl('/toppage');
								} else {
									this.router.navigate(['/verify-email-address']);
								}

							} else {
								alert('status unknown: ' + status);
								this.router.navigateByUrl('');
							}

						} else {
							alert('No object in response');
							this.router.navigateByUrl('');
						}

					} else {
						const message = response[Ontologyconstants.message];
						alert('Login Failed and session will be cleared:\n' + JSON.stringify(message));
						this.session.clearSession();
					}
				}
			});

	}
	// Sign out
	public logout() {
		this.session.clearSession();
		return this.afAuth.signOut().then(() => {
			this.session.clearSession();
			this.router.navigate(['sign-in']);
		});
	}
}
