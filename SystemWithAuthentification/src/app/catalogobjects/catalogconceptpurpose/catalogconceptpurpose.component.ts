import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { NavItem } from '../../primitives/nav-item';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MenutreeserviceService } from '../../services/menutreeservice.service';


@Component({
	selector: 'app-catalogconceptpurpose',
	templateUrl: './catalogconceptpurpose.component.html',
	styleUrls: ['./catalogconceptpurpose.component.scss']
})
export class CatalogconceptpurposeComponent implements OnInit {

	objectform: FormGroup;

	@Input() descriptionsuffix: string;
	@Input() annoinfo: any;

	rdfsidentifier = 'dcterms:identifier';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	
	conceptitems: NavItem[];
	purposeitems: NavItem[];

    header: string
    message = 'Initializing';
    pair: string;
	conceptlabel: string;
	purposelabel: string;
	concepthint: string;
	purposehint: string;
	conceptloc: string;
	purposeloc: string;
	conceptid: string;
	purposeid: string;

	constructor(
		 private formBuilder: FormBuilder,
		 private menusetup: MenutreeserviceService
	) {
		this.objectform = this.formBuilder.group({
			Concept: ['', Validators.required],
			Purpose: ['', Validators.required],
		});
	}
	
	
	ngOnInit(): void {
		this.setLabels(this.descriptionsuffix);
		this.conceptitems = this.menusetup.findChoices(this.annoinfo, this.conceptloc);
		this.purposeitems = this.menusetup.findChoices(this.annoinfo, this.purposeloc);
	}
	
	setLabels(suffix: string) {
		this.pair = 'dataset:PurposeConcept' + suffix;
		this.conceptloc = 'dataset:Concept' + suffix;
		this.purposeloc = 'dataset:Purpose' + suffix;
		
		this.header = this.annoinfo[this.pair][this.rdfslabel];
		
		this.conceptlabel = this.annoinfo[this.conceptloc][this.rdfslabel];
		this.concepthint = this.annoinfo[this.conceptloc][this.rdfscomment];
		this.purposelabel = this.annoinfo[this.purposeloc][this.rdfslabel];
		this.purposehint = this.annoinfo[this.purposeloc][this.rdfscomment];
		this.conceptid = this.annoinfo[this.conceptloc][this.rdfsidentifier];
		this.purposeid = this.annoinfo[this.purposeloc][this.rdfsidentifier];
	}
	
	getData(info: any) {
		info[this.conceptid] = this.objectform.get('Concept').value;
		info[this.purposeid] = this.objectform.get('Purpose').value;
	}
	
	setData(info: any): void {
		this.setLabels(this.descriptionsuffix);
		if(info != null) {
			const purpose = info[this.purposeid];
			if(purpose != null) {
				this.objectform.get('Purpose').setValue(purpose);
			}
			const concept = info[this.conceptid];
			if(concept != null) {
				this.objectform.get('Concept').setValue(concept);
			}
		}
		
				
				
	}
	
	setConcept($event) {
		this.objectform.get('Concept').setValue($event);
	}
	
	setPurpose($event) {
		this.objectform.get('Purpose').setValue($event);
	}

}
