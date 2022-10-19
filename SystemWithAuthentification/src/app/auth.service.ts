import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<Observable<firebase.User>>;
       

  user$;

  constructor(private afAuth: AngularFireAuth) {
    
    this.user = new BehaviorSubject<Observable<firebase.User>>(null);
    this.user$ = this.user
    .asObservable()
    .pipe(switchMap((user: Observable<firebase.User>) => user));
    this.user.next(this.afAuth.authState);
  }

  loginViaGoogle(): Observable<firebase.auth.UserCredential> {
    const prov = new firebase.auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(prov));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
