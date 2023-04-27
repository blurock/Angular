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
					{ title: 'JThermodynamics', cols: 7, rows: 7, content: 'JThermodynamics', color: '#E0E0E0' },
					{ title: 'ChemConnect', cols: 3, rows: 7, content: 'ChemConnect', color: '#C0C0C0' },
					
					
					{ title: 'Fundamental Data', cols: 10, rows: 7, content: 'FundamentalData', color: '#F0F0F0' },
					
					{ title: 'Datasets and their versions', cols: 5, rows: 10, content: 'DatasetVersions', color: '#E0E0E0' },
					{ title: 'Dataset Collection Sets', cols: 5, rows: 10, content: 'DatasetCollectionSets', color: '#F0F0F0' },
					
					{ title: 'Goals', cols: 3, rows: 12, content: 'Goals', color: '#D3D3D3' },
					{ title: 'Transparency and Openness (TOP)', cols: 3, rows: 12, content: 'TopConcepts', color: '#D3D3D3' },
					{ title: 'FAIR data', cols: 4, rows: 12, content: 'FairData', color: '#D3D3D3' },

					{ title: 'Edward S.Blurock', cols: 10, rows: 7, content: 'Blurock', color: '#F0F0F0' }
				];
			})
		);
	}


	calculate() {
			this.router.navigateByUrl('/compute');
	}
startclick() {
		if (this.auth.isLoggedIn) {
			this.router.navigateByUrl('/toppage');
		} else {
			this.router.navigateByUrl('/sign-in');
		}
	
}
}
