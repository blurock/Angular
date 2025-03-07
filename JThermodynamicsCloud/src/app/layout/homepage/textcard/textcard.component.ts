import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-textcard',
	templateUrl: './textcard.component.html',
	//template: 'Hello There:	{{title}}',
	styleUrls: ['./textcard.component.scss'],
	standalone: true,
	imports: [MatCardModule]
})
export class TextcardComponent implements OnInit {

	@Input() title: string = 'title';
	@Input() contentfile: string = 'content';
	@Input() bcolor: string = '#E0E0E0';

	cardcontent: any;

	constructor(
		public sanitizer: DomSanitizer,
		public httpClient: HttpClient
		) {
	}

	ngOnInit(): void {
		this.readCard1();
	}
	
	readCard1(): void {
		const path = '../../../assets/' + this.contentfile + '.html';
		this.httpClient.get(path, { responseType: 'text' }).subscribe((data) => {
			this.cardcontent = data;
			// this.cardcontent = this.sanitizer.bypassSecurityTrustHtml(data);
		});
	}
	
}
