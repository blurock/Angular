import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-toppage',
	templateUrl: './toppage.component.html',
	styleUrls: ['./toppage.component.scss']
})
export class ToppageComponent {

	/** Based on the screen size, switch from standard to one column per row */

	card1content: any;
	cards: any;

	readCard1() {
		let path = '../../assets/Card1Content.html';
		this.httpClient.get(path, { responseType: "text" }).subscribe((data) => {
			this.card1content = this.sanitizer.bypassSecurityTrustHtml(data);
			//this.card1content = data;
			alert(data);
			this.setup();
		})
	}
	setup() {
		this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(

			map(({ matches }) => {
				if (matches) {
					return [
						{ title: 'JThermodynamics', cols: 1, rows: 1 },
						{ title: 'Card 2', cols: 1, rows: 1 },
						{ title: 'Card 3', cols: 1, rows: 1 },
						{ title: 'Card 4', cols: 1, rows: 1 }
					];
				}

				return [
					{ title: 'JThermodynamics' , cols: 2, rows: 1, content: 'JThermodynamics', color: 'pink' },
					{ title: 'ChemConnect'     , cols: 1, rows: 1, content: 'ChemConnect', color: 'lightred' },
					{ title: 'Goals'           , cols: 1, rows: 1, content: 'Goals', color: 'lightblue' },
					{ title: 'Edward S.Blurock', cols: 2, rows: 1, content: 'Blurock', color: 'lightgreen' }
				];
			})
		);
	}
	constructor(
		private breakpointObserver: BreakpointObserver,
		public sanitizer: DomSanitizer,
		public httpClient: HttpClient) {
		this.setup();
	}
}
