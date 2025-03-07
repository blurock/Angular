import { take } from 'rxjs/operators';
import { Component} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import {ProfileCardComponent} from '../profile-card/profile-card.component';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common'; 
import { User } from 'firebase/auth';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: true,
  imports: [MatToolbarModule, MatIconModule,ProfileCardComponent,NgIf,AsyncPipe,MatTooltipModule], // Import MatToolbarModule
})
export class HeaderComponent {
user$: Observable<User | null> = of(null);
    
	constructor(
		private auth: AuthService,
		private router: Router,
		//private session: SessiondatamanagementService
	) {
		this.user$ = this.auth.user$;
		
	}

	login() {
		alert("login from HeaderComponent");
		console.log("login from HeaderComponent");
		this.router.navigateByUrl('/sign-in');
	}

	logout() {
		this.auth.logout();
	}
	
toppage(): void {
	this.router.navigateByUrl('/toppage');
}

home(): void {
	this.router.navigateByUrl('');
}

}