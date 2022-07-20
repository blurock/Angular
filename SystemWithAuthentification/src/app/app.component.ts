import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'SystemWithAuthentification';
	showFiller = false;
	
		constructor(
		private router: Router
	) { }

	repositoryStaging(): void {
		this.router.navigateByUrl('/catalog/repositorystaging');
	}
	partition(): void {
		this.router.navigateByUrl('/catalog/partition');
	}
	partitionblock() {
		this.router.navigateByUrl('/catalog/partition');
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
}
