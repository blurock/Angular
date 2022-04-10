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

	uploadfile(): void {
		alert('Load File');
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
