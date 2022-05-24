import { Input, Output, Component, AfterViewInit, EventEmitter, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';

@Component({
	selector: 'app-dataobjectlink',
	templateUrl: './dataobjectlink.component.html',
	styleUrls: ['./dataobjectlink.component.scss']
})
export class DataobjectlinkComponent implements AfterViewInit {
	linkform: FormGroup;
	display = false;
	conceptmenulabel = 'dataset:DataTypeConcept';
	conceptitems: NavItem[];
	formatmenulabel = 'dataset:DatabaseObjectType';
	items: NavItem[];
	
	catalog: any;

	@Input() anno: any;
	@Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';

	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;

	constructor(
		private formBuilder: FormBuilder,
		public identifiers: IdentifiersService,
		private menusetup: MenutreeserviceService) {
		this.linkform = this.objectlinkform();
	}


	ngAfterViewInit(): void {
		this.items = this.menusetup.findChoices(this.anno, this.formatmenulabel);
		this.conceptitems = this.menusetup.findChoices(this.anno, this.conceptmenulabel);
		if(this.catalog != null) {
			this.setData(this.catalog);
		}
	}
	objectlinkform(): FormGroup {
		const objectform = this.formBuilder.group({
			index: [''],
			DatabaseObjectType: ['', Validators.required],
			DataTypeConcept: ['', Validators.required]
		});
		return objectform;
	}

	deleteLink() {
		this.deleteEvent.emit(this.linkform.get('index').value);
	}

	setIndex(index: number): void {
		this.linkform.get('index').setValue(index);
	}

	setData(catalog: any) {
		this.catalog = catalog;
		if (catalog != null) {
			this.display = true;
			this.linkform = this.objectlinkform();
			this.linkform.get('DatabaseObjectType').setValue(catalog[this.identifiers.DatabaseObjectType]);
			this.linkform.get('DataTypeConcept').setValue(catalog[this.identifiers.DataTypeConcept]);
			
			const firestoreidvalues = catalog[this.identifiers.FirestoreCatalogID];
			if (this.firestoreid != null) {
				this.firestoreid.setData(firestoreidvalues);
			} else {

			}
			
		}
	}

	getData(catalog: any): void {
		if (catalog != null) {
			catalog[this.identifiers.DatabaseObjectType] = this.linkform.get('DatabaseObjectType').value;
			catalog[this.identifiers.DataTypeConcept] = this.linkform.get('DataTypeConcept').value;
			if (this.firestoreid != null) {
				this.firestoreid.getData(catalog);
			} else {
			}
		}
	}
	setFileDatabaseObjectType($event: string): void {
		this.linkform.get('DatabaseObjectType').setValue($event);
	}
	setDataTypeConcept($event: string): void {
		this.linkform.get('DataTypeConcept').setValue($event);
	}
}
