import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-textcard',
  templateUrl: './textcard.component.html',
  styleUrls: ['./textcard.component.scss']
})
export class TextcardComponent implements OnInit {
	
	@Input() title: string;
	@Input() contentfile: string;
	@Input() bcolor: string;
	
	cardcontent: any;

  constructor(public sanitizer: DomSanitizer,
		public httpClient: HttpClient) { 
			
		}

  ngOnInit(): void {
	this.readCard1();
  }
    readCard1() {
		let path = "../../../assets/" + this.contentfile + ".html";
		this.httpClient.get(path, { responseType: "text"  }).subscribe((data) => {
			this.cardcontent = data;
			//this.cardcontent = this.sanitizer.bypassSecurityTrustHtml(data);
		})
	}
}
