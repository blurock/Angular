import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	userData: any; // Save logged in user data
	constructor(
		public afs: AngularFirestore, // Inject Firestore service
		public afAuth: AngularFireAuth, // Inject Firebase auth service
		public router: Router,
		public ngZone: NgZone // NgZone service to remove outside scope warning
	) {
		/* Saving user data in localstorage when
			  logged in and setting up null when logged out */
this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.SetUserData(user);
				this.userData = user;
				sessionStorage.setItem('user', JSON.stringify(this.userData));
				this.ngZone.run(() => {
					//this.router.navigate(['usersetup']);
				});
			} else {
				sessionStorage.setItem('user', 'null');
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
				window.alert(error.message);
			});
	}
	// Sign up with email/password
	SignUp(email: string, password: string): any {
		return this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				/* Call the SendVerificaitonMail() function when new user sign
				up and returns promise */
				this.SendVerificationMail();
				this.SetUserData(result.user);
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}
	// Send email verfificaiton when new user sign up
	SendVerificationMail(): any {
		return this.afAuth.currentUser
			.then((u: any) => u.sendEmailVerification())
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
		const user = JSON.parse(sessionStorage.getItem('user')!);
		alert(JSON.stringify(user));
		return user !== null && user.emailVerified !== false ? true : false;
	}
	// Sign in with Google
	GoogleAuth() {
		const ans = this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
			this.ngZone.run(() => {
				this.router.navigate(['toppage']);
			});
		});
		return ans;
		
	}
	GithubAuth() {
		const provider = new GithubAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a GitHub Access Token. You can use it to access the GitHub API.
				const credential = GithubAuthProvider.credentialFromResult(result);

				const token = credential.accessToken;
				alert("Github token: " + credential.accessToken);
				// The signed-in user info.
				alert(JSON.stringify(result));
				const user = result.user;
				alert("Github user: " + JSON.stringify(user));
				sessionStorage.setItem('user', JSON.stringify(user));
				// ...
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GithubAuthProvider.credentialFromError(error);
				// ...
			});


		/*
		return this.AuthLogin(new auth.GithubAuthProvider()).then((res: any) => {
			this.ngZone.run(() => {
				this.router.navigate(['toppage']);
			});
		});
		*/
	}
	FacebookAuth() {
		return this.AuthLogin(new auth.FacebookAuthProvider()).then((result: any) => {
			// This gives you a GitHub Access Token. You can use it to access the GitHub API.
			const credential = GithubAuthProvider.credentialFromResult(result);

			const token = credential.accessToken;
			alert("Github token: " + credential.accessToken);
			// The signed-in user info.
			alert(JSON.stringify(result));
			const user = result.user;
			alert("Github user: " + JSON.stringify(user));
			sessionStorage.setItem('user', JSON.stringify(user));
			this.ngZone.run(() => {
				this.router.navigate(['toppage']);
			});
		});
	}
	
	AuthLogin(provider: any) {
		
		return this.afAuth
			.signInWithPopup(provider)
			.then((result) => {
				this.SetUserData(result.user);
				this.ngZone.run(() => {
					this.router.navigate(['usersetup']);
				});
			})
			.catch((error) => {
				window.alert(error);
			});
	}
	/* Setting up user data when sign in with username/password, 
	sign up with username/password and sign in with social auth  
	provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
	SetUserData(user: any) {
		alert("SetUserData: " + JSON.stringify(user));
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`
		);
		sessionStorage.setItem('user', JSON.stringify(user));
		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
		};
		const ans = userRef.set(userData, {
			merge: true,
		});
		alert("SetUserData DONE");
		return ans
		
	}
	// Sign out
	SignOut() {
		return this.afAuth.signOut().then(() => {
			sessionStorage.removeItem('user');
			this.router.navigate(['sign-in']);
		});
	}
}
