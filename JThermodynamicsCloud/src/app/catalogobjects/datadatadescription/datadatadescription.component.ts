import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { CatalogconceptpurposeComponent } from '../../catalogobjects/catalogconceptpurpose/catalogconceptpurpose.component';
import { KeywordlistprimitiveComponent } from '../../primitives/keywordlistprimitive/keywordlistprimitive.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
@Component({
	selector: 'app-datadatadescription',
	templateUrl: './datadatadescription.component.html',
	styleUrls: ['./datadatadescription.component.scss'],
	standalone: true,
	imports: [MatCardModule, MatGridListModule, MatFormFieldModule, MatMenuModule, MatInputModule,
		ReactiveFormsModule, KeywordlistprimitiveComponent, CatalogconceptpurposeComponent,
	NgIf]
})
export class DatadatadescriptionComponent implements AfterViewInit,OnChanges {


	@ViewChild('concept') concept!: CatalogconceptpurposeComponent;
	@ViewChild('keywords') keywords!: KeywordlistprimitiveComponent;

	public objectform: UntypedFormGroup;
	message: string;
	rdfsidentifier = Ontologyconstants.dctermsidentifier;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;

	@Input() descriptionsuffix: string = '';
	@Input() annoinfo: any;

	description: string = '';
	header: string = '';
	title: string = '';
	abst: string = '';
	purconloc: string = '';
	keywordloc: string = '';

	abstrlabel: string = '';
	abstrhint: string = '';
	titlelabel: string = '';
	titlehint: string = '';

	datadescription: any | null = null;

	constructor(
		private formBuilder: UntypedFormBuilder
	) {
		this.objectform = this.formBuilder.group({
			DescriptionAbstract: ['', Validators.required],
			DescriptionTitle: ['', Validators.required],
		});
		this.message = 'No Description Setup';
	}
	
	setupAnno() {
		this.setLabels(this.descriptionsuffix);
		this.header = this.annoinfo[this.description][this.rdfslabel];
		this.abstrlabel = this.annoinfo[this.abst][this.rdfslabel];
		this.abstrhint = this.annoinfo[this.abst][this.rdfscomment];
		this.titlelabel = this.annoinfo[this.title][this.rdfslabel];
		this.titlehint = this.annoinfo[this.title][this.rdfscomment];
		
	}
	ngOnChanges(changes: SimpleChanges) {
		if (changes['annoinfo'] && changes['annoinfo'].currentValue) { // Check if annoinfo has a value
			this.setupAnno();
			if (this.datadescription) {
				this.setData(this.datadescription);
			}
		}
	}

	ngAfterViewInit(): void {
		if (this.annoinfo != null) {
			this.setupAnno();
		}
	}



	setLabels(suffix: string): void {
		if (suffix.length == 0) {
			this.description = 'dataset:DataDescription';
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
		const description: Record<string, unknown> = {};
		catalog[descranno[this.rdfsidentifier]] = description;
		description[identabstr[this.rdfsidentifier]] = this.objectform.get('DescriptionAbstract')?.value;
		description[identtitle[this.rdfsidentifier]] = this.objectform.get('DescriptionTitle')?.value;
		const info = {};
		this.concept.getData(info);
		const conceptid = identpurcon[this.rdfsidentifier];
		description[conceptid] = info;
		const keys = this.keywords.getKeys();
		const keyid = identkeyword[this.rdfsidentifier];
		description[keyid] = keys;
	}

	public setData(description: any) {
		this.datadescription = description;
		if (this.annoinfo) {

			const identabstr = this.annoinfo[this.abst];
			const identtitle = this.annoinfo[this.title];
			const identpurcon = this.annoinfo[this.purconloc];
			const identkeyword = this.annoinfo[this.keywordloc];
			this.objectform.get('DescriptionAbstract')?.setValue(description[identabstr[this.rdfsidentifier]]);
			this.objectform.get('DescriptionTitle')?.setValue(description[identtitle[this.rdfsidentifier]]);
			const conpurid = identpurcon[this.rdfsidentifier];
			const info = description[conpurid];
			this.concept.setData(info);
			const keyid = identkeyword[this.rdfsidentifier];
			const keys = description[keyid];
			if (keys != null) {
				this.keywords.setKeys(keys);
			}
		}
	}
	handleChangeAfterMutation(newValue: any): void {
	  }

}
