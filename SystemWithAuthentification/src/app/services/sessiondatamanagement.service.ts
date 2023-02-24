import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessiondatamanagementService {
  
  loginaccountdata: any;

  constructor() { }
  
  public isLoggedIn(): boolean {
    const ans = this.getUID() != null;
    const status = this.getLoginStatus() === 'dataset:LoginRegistration';
    return ans && status;
  }
  
  public getUID(): string {
    return sessionStorage.getItem('dataset:authorizationuid');
  }
  
  public getUserRole(): string {
    return sessionStorage.getItem('dataset:UserAccountRole');
  }
  
  public getLoginStatus(): string {
    return sessionStorage.getItem('dataset:loginstage');
  }
  public setLoginStatus(status: string): void {
    sessionStorage.setItem('dataset:loginstage', status);
  }
  
  public setUserAccount(useracount: any): void {
    sessionStorage.setItem('prov:SoftwareAgent', JSON.stringify(useracount));
  }
  
  public getUserAccount(): any {
    return JSON.parse(sessionStorage.getItem('prov:SoftwareAgent'));
  }
  
  public setDatabasePerson(useracount: any): void {
    sessionStorage.setItem('vcard:Individual', JSON.stringify(useracount));
  }
  
  public getDatabasePerson(): any {
    return JSON.parse(sessionStorage.getItem('vcard:Individual'));
  }
  
  public getLoginAccountInfo(): any  {
    return JSON.parse(sessionStorage.getItem('dataset:loginaccountinfo'));
  }
  public setLoginAccountInfo(loginaccount: any): void  {
    sessionStorage.setItem('dataset:loginaccountinfo', JSON.stringify(loginaccount));
  }
  
  public setAuthorizationData(user:any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  public getAuthorizationData(): any {
    return JSON.parse(sessionStorage.getItem('user'));
  }
  public setToken(token: string) {
    sessionStorage.setItem('token',token);
  }
  public getToken(): string {
    return sessionStorage.getItem('token');
    
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
    sessionStorage.removeItem('prov:SoftwareAgent');
    sessionStorage.removeItem('vcard:Individual');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }
  
}
