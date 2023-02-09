import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageuserserviceService {
  
  public errormaintainer = 'Error in determining maintainer';

  constructor(private httpClient: HttpClient) { }



   determineMaintainer(): Observable<string> {
     const user = sessionStorage.getItem('user');
     return of('Administrator');
   }
  
}
