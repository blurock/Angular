import { Input, Component, OnInit, ViewChild, Output, EventEmitter, AfterViewChecked, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { Ontologyconstants } from 'systemconstants';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { MenutreeserviceService } from 'systemprimitives';
import { NavItem } from 'systemprimitives';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemComponent } from 'systemprimitives';
import { MatInputModule } from '@angular/material/input';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
	selector: 'app-dataobjectlink',
	templateUrl: './dataobjectlink.component.html',
	styleUrls: ['./dataobjectlink.component.scss'],
	standalone: true,
	imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
		MenuItemComponent, MatIconModule, MatMenuTrigger, MatMenuModule,
		FiresytorecatalogidComponent, CommonModule,
		MatTooltipModule]
})
export class DataobjectlinkComponent implements OnInit, OnChanges, AfterViewInit {
	linkform: UntypedFormGroup;
	display = false;
	conceptmenulabel = 'dataset:DataTypeConcept';
	conceptitems: NavItem[] = [];
	formatmenulabel = 'dataset:DatabaseObjectType';
	items: NavItem[] = [];
	firestoreidvalues: any;


	@Input() anno: any;
	@Input() catalog: any;
	@Input() allowchange: boolean = false;
	@Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();
	@Output() firestoreAddress = new EventEmitter<any>();

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';

	displayobjectinoutputtab = '';
	deletelink = '';
	showaddressbutton: string;

	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;

	constructor(
		private constants: UserinterfaceconstantsService,
		private formBuilder: UntypedFormBuilder,
		public identifiers: IdentifiersService,
		private menusetup: MenutreeserviceService) {

		this.linkform = this.objectlinkform();
		this.showaddressbutton = constants.showaddressbutton;
		this.displayobjectinoutputtab = constants.displayobjectinoutputtab;
		this.deletelink = constants.deletelink;
	}


	ngOnInit(): void {
		this.items = this.menusetup.findChoices(this.anno, this.formatmenulabel);
		this.conceptitems = this.menusetup.findChoices(this.anno, this.conceptmenulabel);
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (this.catalog) {
			this.setData(this.catalog);
		}
	}
	ngAfterViewInit(): void {
		if (this.catalog) {
			this.setData(this.catalog);
		}
	}

	fetchObject() {
		this.firestoreAddress.emit(this.firestoreidvalues);
	}

	objectlinkform(): UntypedFormGroup {
		const objectform = this.formBuilder.group({
			index: [''],
			DatabaseObjectType: ['', Validators.required],
			DataTypeConcept: ['', Validators.required]
		});
		return objectform;
	}
	deleteLink() {
		this.deleteEvent.emit(this.linkform.get('index')?.value ?? 'not defined');
	}
	showaddress() {
		this.display = true;
	}

	setIndex(index: number): void {
		this.linkform.get('index')?.setValue(index);
	}

	setData(catalog: any) {

		this.catalog = catalog;
		if (this.catalog != null) {
			this.linkform = this.objectlinkform();
			this.linkform.get('DatabaseObjectType')?.setValue(this.catalog[Ontologyconstants.DatabaseObjectTypeLink]);
			this.linkform.get('DataTypeConcept')?.setValue(this.catalog[this.identifiers.DataTypeConcept]);
			this.firestoreidvalues = this.catalog[Ontologyconstants.RelatedCatalogObjectIDAndType];
			if (this.firestoreid != null) {
				this.firestoreid.setData(this.firestoreidvalues);
			} else {

			}

		}

	}

	getData(catalog: any): void {
		if (catalog != null) {
			catalog[Ontologyconstants.DatabaseObjectTypeLink] = this.linkform.get('DatabaseObjectType')?.value ?? 'not defined';
			catalog[this.identifiers.DataTypeConcept] = this.linkform.get('DataTypeConcept')?.value ?? 'not defined';
			if (this.firestoreid != null) {
				const dummy:Record<string,any> = {};
				this.firestoreid.getData(dummy);
				console.log('Firestore ID data retrieved:', dummy);
				catalog[Ontologyconstants.RelatedCatalogObjectIDAndType] = dummy[Ontologyconstants.FirestoreCatalogID];
			} else {
				catalog[Ontologyconstants.RelatedCatalogObjectIDAndType] = this.catalog[Ontologyconstants.RelatedCatalogObjectIDAndType];
			}
		}
	}
	setFileDatabaseObjectType($event: String): void {
		this.linkform.get('DatabaseObjectType')?.setValue($event);
	}
	setDataTypeConcept($event: String): void {
		this.linkform.get('DataTypeConcept')?.setValue($event);
	}
}
