import { Input, Output, Component, OnInit, AfterViewInit, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
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
export class DataobjectlinkComponent implements OnInit {
	linkform: FormGroup;
	display = false;
	conceptmenulabel = 'dataset:DataTypeConcept';
	conceptitems: NavItem[];
	formatmenulabel = 'dataset:DatabaseObjectType';
	items: NavItem[];
	firestoreidvalues: any;


	@Input() anno: any;
	@Input() catalog: any;
	//@Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';

	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;

	constructor(
		private formBuilder: FormBuilder,
		public identifiers: IdentifiersService,
		private menusetup: MenutreeserviceService) {
		this.linkform = this.objectlinkform();

	}


	ngOnInit(): void {
		this.items = this.menusetup.findChoices(this.anno, this.formatmenulabel);
		this.conceptitems = this.menusetup.findChoices(this.anno, this.conceptmenulabel);
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
		//this.deleteEvent.emit(this.linkform.get('index').value);
	}

	setIndex(index: number): void {
		this.linkform.get('index').setValue(index);
	}

	setData(catalog: any) {

		this.catalog = catalog;
		if (this.catalog != null) {



			this.linkform = this.objectlinkform();
			this.linkform.get('DatabaseObjectType').setValue(this.catalog[this.identifiers.DatabaseObjectType]);
			this.linkform.get('DataTypeConcept').setValue(this.catalog[this.identifiers.DataTypeConcept]);


			this.firestoreidvalues = this.catalog[this.identifiers.FirestoreCatalogID];
			if (this.firestoreid != null) {
				this.firestoreid.setData(this.firestoreidvalues);
			} else {

			}
			this.display = true;
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
