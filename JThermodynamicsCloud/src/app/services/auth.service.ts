import { Injectable, Injector, NgZone, runInInjectionContext } from '@angular/core';
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from "@angular/fire/auth";
import { Auth, onAuthStateChanged, User, idToken } from '@angular/fire/auth';
import { ServiceUtilityRoutines } from './serviceutilityroutines';
import { environment } from '../../environments/environment';
import { Login } from '../const/routes.const';
import { SessiondatamanagementService } from '../services/sessiondatamanagement.service';
import { Router } from '@angular/router';
import { Ontologyconstants } from '../const/ontologyconstants';
import { __assign } from 'tslib';
import { Observable, BehaviorSubject, map, from,catchError, of,switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { setLogLevel, LogLevel } from "@angular/fire";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private userSubject = new BehaviorSubject<User | null>(null); // Use BehaviorSubject
	public user$: Observable<User | null> = this.userSubject.asObservable(); // Expose as Observable
	isLoggedIn$: Observable<boolean>;

	public userData: User | null = null; // Save logged in user data
	constructor(
		public session: SessiondatamanagementService,
		public auth: Auth,
		public router: Router,
		public ngZone: NgZone, // NgZone service to remove outside scope warning
		private httpClient: HttpClient,
		private injector: Injector // Inject the Angular Injector
	) {
        setLogLevel(LogLevel.VERBOSE);
		this.isLoggedIn$ = this.user$.pipe(map(user => !!user))
		onAuthStateChanged(this.auth, (user) => {
			this.userSubject.next(user); // Update the BehaviorSubject
		});
	};
	
	public isLoggedIn(): boolean {
		return this.userData != null;
	}
	public loggedInUser(): User | null {
		return this.userData;
	}
	get isRegistered(): boolean {
		const uid = this.session.getUID()
		return uid != null && uid != this.session.getGuestuidlabel();
	}
	get isValidated(): boolean {
		return true;
		/*
		var ans = false;
		if (environment.production) {
			const user = this.auth.currentUser;
			if (user !== null) {
				const emailVerified = user.emailVerified;
				ans = emailVerified;
			}

		} else {
			ans = this.session.getLoginStatus() != null;
		}
		return ans;
		*/
	}


	// Sign in with Google
	GoogleAuth() {
		return this.AuthLogin(new GoogleAuthProvider());
	}
	GithubAuth() {
		return this.AuthLogin(new GithubAuthProvider());
	}
	FacebookAuth() {
		return this.AuthLogin(new FacebookAuthProvider())
	}

	async AuthLogin(provider: any) {
		try {
			const result = await signInWithPopup(this.auth, provider); // Sign in with popup
			// The signed-in user info.
			const user = result.user;
			this.SetUserData(user);
		} catch (error: any) {
			console.error('Error signing in with Google:', error);
			// ... handle error (e.g., display error message to the user)
		}
	}
	SetUserData(user: any): void {
		try {
			if (user) { // Check if user is not null
				const token = user.getIdToken(false); // Now safe to call getIdToken
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
					const logintransaction: any = {};
					const userdata: any = {};
					logintransaction['service'] = 'dataset:FirstLoginService';
					userdata.email = email;
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
					console.log("Authorization data already exists. No need to fetch token.");
				}
			} else {
				console.error("Error user is null:");
				this.router.navigateByUrl('/toppage');
			}
		} catch (error) {
			console.error("Error getting ID token:", error);
		}
	}
/*
getToken(): Observable<string | null> {
    const tk = idToken(this.auth);
    return from(tk).pipe(
      catchError((error) => {
        console.error('Error getting ID token:', error);
        return of(null); // Return an Observable of null in case of error
      })
    );
  }
  */
  getToken(): Observable<string | null> {
      
      // 1. Define the asynchronous operation using runInInjectionContext
      const tokenPromise = runInInjectionContext(this.injector, () => {
          // The idToken function is called within a valid injection context here.
          return idToken(this.auth); 
      });
      
      // 2. Convert the resulting Promise to an Observable and handle errors
      return from(tokenPromise).pipe(
        catchError((error) => {
          console.error('Error getting ID token:', error);
          return of(null); // Return an Observable of null in case of error
        })
      );
  }
  postData(httpaddr: string, data: any): Observable<any> {
        return this.getToken().pipe( // Use getToken() as an Observable
            switchMap((token) => {
                if (!token) {
                    return of(null); // Or handle the absence of a token as needed
                }
                this.session.setToken(token);
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                });
                return this.httpClient.post(httpaddr, data, { headers });
            })
        );
    }

  getData(httpaddr: string): Observable<any> {
        return this.getToken().pipe( // Use getToken() as an Observable
            switchMap((token) => {
                if (!token) {
                   return of(null); // Or handle the absence of a token as needed
                }
                this.session.setToken(token);
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                });
                return this.httpClient.get(httpaddr, { headers });
            })
        );
    }

	getUserInformationFromServer(logintransaction: any, token: string, user: any) {
		/*
		const headerdata = ServiceUtilityRoutines.setupHeader(token);
		const httpaddr = environment.apiURL + '/' + Login;
		console.log("getUserInformationFromServer: " + token);
		console.log("getUserInformationFromServer: " + JSON.stringify(headerdata));
		//window.alert("getUserInformationFromServer: '" + httpaddr + "'");
		//window.alert("getUserInformationFromServer: '" + JSON.stringify(logintransaction) + "'");
		this.httpClient.post(httpaddr, logintransaction, { headers: headerdata })
		*/
		const httpaddr = environment.apiURL + '/' + Login;
		this.postData(httpaddr,logintransaction)
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
						window.alert('Login Failed and session will be cleared:\n' + JSON.stringify(message));
						this.session.clearSession();
					}
				}
			});

	}
	// Sign out
	public logout() {
		this.session.clearSession();
		return this.auth.signOut().then(() => {
			this.session.clearSession();
			this.router.navigate(['sign-in']);
		});
	}
}
