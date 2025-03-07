import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
//import {HomepageComponent} from './layout/homepage/homepage.component';
//import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	//template: `<router-outlet></router-outlet>`,
	styleUrls: ['./app.component.scss'],
	standalone: true,
  imports: [RouterOutlet,HeaderComponent]
})
export class AppComponent {
	title = 'SystemWithAuthentification';
	showFiller = false;
	
		constructor(
		//private router: Router
	) { }
/*
    home(): void {
		this.router.navigateByUrl('');
	}
	repositoryStaging(): void {
		this.router.navigateByUrl('/catalog/repositorystaging');
	}
	partition(): void {
		this.router.navigateByUrl('/catalog/partition');
	}
	partitionblock() {
		this.router.navigateByUrl('/catalog/partition');
	}
	transaction() {
		this.router.navigateByUrl('/catalog/transaction');
	}
	fromURL(): void {
		alert('from URL');
	}
	fromInterface(): void {
		alert('from Interface');
	}
	uploaddata(): void {
		this.router.navigateByUrl('/uploaddatabaseitem');
	}
	catalog(): void {
		this.router.navigateByUrl('/catalog/catalogobj');
	}
	datasetcollection() {
		this.router.navigateByUrl('/catalog/collection');
	}
	computeThermodynamics() {
		this.router.navigateByUrl('/compute');
	}
	userAdministration() {
		this.router.navigateByUrl('/useradmin');
	}
	datasetAdministration() {
		this.router.navigateByUrl('/datasetadmin');
	}
	*/
}
