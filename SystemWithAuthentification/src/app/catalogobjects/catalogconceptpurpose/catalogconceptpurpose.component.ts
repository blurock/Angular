import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-catalogconceptpurpose',
	templateUrl: './catalogconceptpurpose.component.html',
	styleUrls: ['./catalogconceptpurpose.component.scss']
})
export class CatalogconceptpurposeComponent implements OnInit, OnChanges {

	@Input() descriptionsuffix: string;
	@Input() purpcondata: any;
	@Input() annoinfo: any;

	conceptlabel = 'dataset:objectconcept';
	conceptanno: string;
	purposelabel = 'dataset:objectpurpose';
	purposeanno: string;
	fieldwidth = 'full';
	conceptloc: string;
	purposeloc: string;

	constructor() {
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.conceptloc = 'dataconcept-' + this.descriptionsuffix;
		this.purposeloc = 'purposekey-' + this.descriptionsuffix;
		this.setData(this.purpcondata, this.annoinfo);
		alert(changes);
	}

	ngOnInit(): void {
	}
	setData(info: any, annoinfo: any): void {
		alert(annoinfo);
		alert(info);
	}

}
