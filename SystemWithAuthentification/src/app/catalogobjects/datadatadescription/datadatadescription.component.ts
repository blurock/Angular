import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import {CatalogconceptpurposeComponent} from '../../catalogobjects/catalogconceptpurpose/catalogconceptpurpose.component';
import {KeywordlistprimitiveComponent} from '../../primitives/keywordlistprimitive/keywordlistprimitive.component';

@Component({
	selector: 'app-datadatadescription',
	templateUrl: './datadatadescription.component.html',
	styleUrls: ['./datadatadescription.component.scss']
})
export class DatadatadescriptionComponent implements OnInit {


	@ViewChild('concept') concept: CatalogconceptpurposeComponent;
	@ViewChild('keywords') keywords: KeywordlistprimitiveComponent;

	public objectform: FormGroup;
	message: string;
	rdfsidentifier = Ontologyconstants.dctermsidentifier;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	
	@Input() descriptionsuffix: string;
	@Input() annoinfo: any;


	description: string;
	header: string;
	title: string;
	abst: string;
	purconloc: string;
	keywordloc: string;

	abstrlabel: string;
	abstrhint: string;
	titlelabel: string;
	titlehint: string;


	constructor(
		private formBuilder: FormBuilder
	) {
		this.objectform = this.formBuilder.group({
			DescriptionAbstract: ['', Validators.required],
			DescriptionTitle: ['', Validators.required],
		});
		this.message = 'No Description';
	}
	
	ngOnInit(): void {
		this.setLabels(this.descriptionsuffix);
		this.header = this.annoinfo[this.description][this.rdfslabel];
    	this.abstrlabel = this.annoinfo[this.abst][this.rdfslabel];
	this.abstrhint =  this.annoinfo[this.abst][this.rdfscomment];
	this.titlelabel =  this.annoinfo[this.title][this.rdfslabel];
	this.titlehint =  this.annoinfo[this.title][this.rdfscomment];
	}
	


	setLabels(suffix: string): void {
		if (suffix.length == 0) {
      	    this.description = 'dataset:DataDataDescription';
			this.abst = 'dataset:DescriptionAbstract';
			this.title = 'dataset:DescriptionTitle';
			this.purconloc = 'dataset:PurposeConcept';
			this.keywordloc = 'dataset:DescriptionKeyword';
		} else {
      	    this.description = 'dataset:DataDescription' + suffix;
			this.abst = 'dataset:DescriptionAbstract' + suffix;
			this.title = 'dataset:DescriptionTitle' + suffix;
			this.purconloc = 'dataset:PurposeConcept' + suffix;
			this.keywordloc = 'dataset:DescriptionKeyword' + suffix;
			
		}
	}

	public getData(catalog: any) {
    const descranno = this.annoinfo[this.description];
		const identabstr = this.annoinfo[this.abst];
		const identtitle = this.annoinfo[this.title];
		const identpurcon = this.annoinfo[this.purconloc];
		const identkeyword = this.annoinfo[this.keywordloc];
		const description = {};
		catalog[descranno[this.rdfsidentifier]] = description;
		description[identabstr[this.rdfsidentifier]] = this.objectform.get('DescriptionAbstract').value;
		description[identtitle[this.rdfsidentifier]] = this.objectform.get('DescriptionTitle').value;
		const info = {};
		this.concept.getData(info);
		const conceptid = identpurcon[this.rdfsidentifier];
		description[conceptid] = info;
		const keys = this.keywords.getKeys();
		const keyid = identkeyword[this.rdfsidentifier];
		description[keyid] = keys;
	}

	public setData(description: any) {
		const identabstr = this.annoinfo[this.abst];
		const identtitle = this.annoinfo[this.title];
		const identpurcon = this.annoinfo[this.purconloc];
		const identkeyword = this.annoinfo[this.keywordloc];
		this.objectform.get('DescriptionAbstract').setValue(description[identabstr[this.rdfsidentifier]]);
		this.objectform.get('DescriptionTitle').setValue(description[identtitle[this.rdfsidentifier]]);
		const conpurid = identpurcon[this.rdfsidentifier];
		const info = description[conpurid];
		this.concept.setData(info);
		const keyid = identkeyword[this.rdfsidentifier];
		const keys = description[keyid];
		if(keys != null ) {
			this.keywords.setKeys(keys);
		}
	}


}
