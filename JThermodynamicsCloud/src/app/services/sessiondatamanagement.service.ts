import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessiondatamanagementService {
  
  loginaccountdata: any;
  
  	guestlabel = 'Guest';
	guestuidlabel = 'Guest';


  constructor(
  ) { }
  
  	getGuestuidlabel(): string {
		return this.guestuidlabel;
	}
	getGuestLabel(): string {
		return this.guestlabel;
	}

  
  public isLoggedIn(): boolean {
    const ans = this.getUID() != null;
    const status = this.getLoginStatus() === 'dataset:LoginRegistration';
    return ans && status;
  }
  
  public getUID(): string {
    var uid = sessionStorage.getItem('dataset:authorizationuid');
    if(uid == null) {
      uid = this.getGuestuidlabel();
    }
    return uid;
  }
public setUID(uid: string): void {
    sessionStorage.setItem('dataset:authorizationuid',uid);
  }
  
  public getUserRole(): string {
    return sessionStorage.getItem('dataset:UserAccountRole') || '';
  }
  
  public getLoginStatus(): string {
  return sessionStorage.getItem('dataset:loginstage') || ''; // Return empty string if null
}
  public setLoginStatus(status: string): void {
    sessionStorage.setItem('dataset:loginstage', status);
  }
  
  public setUserAccount(useracount: any): void {
    localStorage.setItem('prov:SoftwareAgent', JSON.stringify(useracount));
  }
  
  public getUserAccount(): any {
	const agent = localStorage.getItem('prov:SoftwareAgent')
	var ans = null;
	if(agent != null) {
		ans = JSON.parse(agent);
		}
    return ans;
  }
  
  public setDatabasePerson(useracount: any): void {
    sessionStorage.setItem('vcard:Individual', JSON.stringify(useracount));
  }
  
  public getDatabasePerson(): any {
	const ind = sessionStorage.getItem('vcard:Individual')
	var ans = null;
	if(ind != null) {
		ans = JSON.parse(ind);
		}
    return ans;

  }
  
  public getLoginAccountInfo(): any  {
	const ind = sessionStorage.getItem('dataset:loginaccountinfo')
	var ans = null;
	if(ind != null) {
		ans = JSON.parse(ind);
		}
    return ans;
  }
  
  public setLoginAccountInfo(loginaccount: any): void  {
    sessionStorage.setItem('dataset:loginaccountinfo', JSON.stringify(loginaccount));
  }
  
  public setAuthorizationData(user:any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  public getAuthorizationData(): any {
	const user = sessionStorage.getItem('user')
	var ans = null;
	if(user != null) {
		ans = JSON.parse(user);
		}
    return ans;
  }
  public setToken(token: string) {
    sessionStorage.setItem('token',token);
  }
  public getToken(): string {
    return sessionStorage.getItem('token') || '';
    
  }
  
  public storeLoginAccount(loginaccount: any): void {
    this.setLoginAccountInfo(loginaccount);
    //localStorage.setItem('dataset:loginaccountinfo', JSON.stringify(loginaccount));
    sessionStorage.setItem('dataset:authorizationuid', loginaccount['dataset:authorizationuid']);
    sessionStorage.setItem('dataset:UserAccountRole',loginaccount['dataset:UserAccountRole']);
  }
  
  
  
  
  public clearSession() {
    sessionStorage.removeItem('dataset:authorizationuid');
    sessionStorage.removeItem('dataset:loginaccountinfo');
    sessionStorage.removeItem('dataset:UserAccountRole');
    sessionStorage.removeItem('dataset:loginstage');
    localStorage.removeItem('prov:SoftwareAgent');
    sessionStorage.removeItem('vcard:Individual');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }
  
}
