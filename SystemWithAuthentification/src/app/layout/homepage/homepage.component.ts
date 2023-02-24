import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
	card1content: any;
	cards: any;

	constructor(
		private readonly router: Router,
		private readonly auth: AuthService,
		private breakpointObserver: BreakpointObserver,
		public sanitizer: DomSanitizer,
		public httpClient: HttpClient
	) { }

	ngOnInit(): void {
		this.setup();
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
					{ title: 'JThermodynamics', cols: 2, rows: 1, content: 'JThermodynamics', color: 'pink' },
					{ title: 'ChemConnect', cols: 1, rows: 1, content: 'ChemConnect', color: 'lightred' },
					{ title: 'Goals', cols: 1, rows: 1, content: 'Goals', color: 'lightblue' },
					{ title: 'Edward S.Blurock', cols: 2, rows: 1, content: 'Blurock', color: 'lightgreen' }
				];
			})
		);
	}


	startclick() {
		if (this.auth.isLoggedIn) {
			this.router.navigateByUrl('/toppage');
		} else {
			this.router.navigateByUrl('/sign-in');
		}
	}

}
