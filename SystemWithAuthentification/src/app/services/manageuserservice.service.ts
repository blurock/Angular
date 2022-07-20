import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageuserserviceService {

  constructor(private httpClient: HttpClient) { }


   determineMaintainer(): Observable<string> {
     return of('Administrator');
   }
  
}
