import { Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { NavItem } from '../../primitives/nav-item';
import { UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import {MatCardModule} from '@angular/material/card'; 
import {MenuItemComponent} from '../../primitives/menu-item/menu-item.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-catalogconceptpurpose',
	templateUrl: './catalogconceptpurpose.component.html',
	styleUrls: ['./catalogconceptpurpose.component.scss'],
	standalone: true,
	imports: [MatCardModule,MenuItemComponent,MatFormFieldModule,MatMenuTrigger,MatInputModule,MatMenuModule,
	ReactiveFormsModule,CommonModule,MatSelectModule,FormsModule]
})
export class CatalogconceptpurposeComponent implements OnInit {

	objectform: UntypedFormGroup;

	@Input() descriptionsuffix: string = '';
	@Input() annoinfo: any| null = null;

	rdfsidentifier = Ontologyconstants.dctermsidentifier;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	
	conceptitems: NavItem[] = [];
	purposeitems: NavItem[] = [];
	conceptpurpose: any| null = null;

    header: string = '';
    message = 'Initializing';
    pair: string = '';
	conceptlabel: string = '';
	purposelabel: string = '';
	concepthint: string = '';
	purposehint: string = '';
	conceptloc: string = '';
	purposeloc: string = '';
	conceptid: string = '';
	purposeid: string = '';

	constructor(
		 private formBuilder: UntypedFormBuilder,
		 private menusetup: MenutreeserviceService
	) {
		this.objectform = this.formBuilder.group({
			Concept: ['', Validators.required],
			Purpose: ['', Validators.required],
		});
	}
	
	ngOnChanges(changes: SimpleChanges) {
    if (changes['annoinfo'] && changes['annoinfo'].currentValue) {
		this.setUpMenu();
		if(this.conceptpurpose) {
			this.setData(this.conceptpurpose);
		}
    }
  }
  
  setUpMenu(): void {
	if(this.annoinfo) {
		this.setLabels(this.descriptionsuffix);
		this.conceptitems = this.menusetup.findChoices(this.annoinfo, this.conceptloc);
		this.purposeitems = this.menusetup.findChoices(this.annoinfo, this.purposeloc);
	}
  }

	
	ngOnInit(): void {
		this.setUpMenu();
	}
	
	setLabels(suffix: string) {
		if(this.annoinfo) {
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
	}
	
	getData(info: any) {
		info[this.conceptid] = this.objectform.get('Concept')?.value;
		info[this.purposeid] = this.objectform.get('Purpose')?.value;
	}
	
	setData(info: any): void {
		this.conceptpurpose = info;
		if(this.annoinfo) {
		this.setLabels(this.descriptionsuffix);
		if(info != null) {
			const purpose = info[this.purposeid];
			if(purpose != null) {
				this.objectform.get('Purpose')?.setValue(purpose);
			}
			const concept = info[this.conceptid];
			if(concept != null) {
				this.objectform.get('Concept')?.setValue(concept);
			}
		}
		}
				
				
	}
	
	setConcept($event: String) {
		this.objectform.get('Concept')?.setValue($event);
	}
	
	setPurpose($event: String) {
		this.objectform.get('Purpose')?.setValue($event);
	}

}
