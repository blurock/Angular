import { Input, Component, OnInit,ViewChild, Output,EventEmitter,AfterViewChecked } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import {MenuItemComponent} from '../../../primitives/menu-item/menu-item.component';
import { MatInputModule } from '@angular/material/input';


@Component({
	selector: 'app-dataobjectlink',
	templateUrl: './dataobjectlink.component.html',
	styleUrls: ['./dataobjectlink.component.scss'],
	standalone: true, 
	imports: [MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,
	MenuItemComponent,MatIconModule,MatMenuTrigger,MatMenuModule,
	FiresytorecatalogidComponent,CommonModule]
})
export class DataobjectlinkComponent implements OnInit {
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

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';

	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;

	constructor(
		private formBuilder: UntypedFormBuilder,
		public identifiers: IdentifiersService,
		private menusetup: MenutreeserviceService) {
		this.linkform = this.objectlinkform();

	}


	ngOnInit(): void {
		this.items = this.menusetup.findChoices(this.anno, this.formatmenulabel);
		this.conceptitems = this.menusetup.findChoices(this.anno, this.conceptmenulabel);
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


	setIndex(index: number): void {
		this.linkform.get('index')?.setValue(index);
	}

	setData(catalog: any) {

		this.catalog = catalog;
		if (this.catalog != null) {



			this.linkform = this.objectlinkform();
			this.linkform.get('DatabaseObjectType')?.setValue(this.catalog[this.identifiers.DatabaseObjectType]);
			this.linkform.get('DataTypeConcept')?.setValue(this.catalog[this.identifiers.DataTypeConcept]);


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
			catalog[this.identifiers.DatabaseObjectType] = this.linkform.get('DatabaseObjectType')?.value ?? 'not defined';
			catalog[this.identifiers.DataTypeConcept] = this.linkform.get('DataTypeConcept')?.value ?? 'not defined';
			if (this.firestoreid != null) {
				this.firestoreid.getData(catalog);
			} else {
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
