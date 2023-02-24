import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {SessiondatamanagementService} from '../services/sessiondatamanagement.service';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManageuserserviceService {
  
  public errormaintainer = 'Error in determining maintainer';

  constructor(private httpClient: HttpClient,
  private session: SessiondatamanagementService,
  private router: Router
  ) { }



   determineMaintainer(): Observable<string> {
     const uid = this.session.getUID();
     if(uid == null) {
       alert("User not logged in");
       this.router.navigateByUrl(``);
     }
     return of(uid);
   }
  
}
