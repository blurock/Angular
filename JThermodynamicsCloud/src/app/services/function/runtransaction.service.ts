import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, getIdToken } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RuntransactionService {

  constructor(
	    private http: HttpClient
  ) { }
  
  async sendTransaction(transactionData: any) {
    const auth = inject(Auth);
    const user = auth.currentUser;

    if (user) {
      // 1. Get the fresh ID Token
      const token = await getIdToken(user);
      
      // 2. Prepare the Body (adding the UID as required by your Java code)
      const body = {
        ...transactionData,
        uid: user.uid
      };

      // 3. Set the Authorization Header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
	  
	  const url = '{$environment.functionsBaseUrl}/processTransaction';
	  const obs$ = this.http.post(url, body, { headers });
	  const result = await firstValueFrom(obs$);
      return result;
    }
	return Promise.reject('User not authenticated');
}
}
