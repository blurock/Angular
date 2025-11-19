import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SavecatalogdataobjectComponent } from '../savecatalogdataobject/savecatalogdataobject.component';
import { FiresytorecatalogidComponent } from '../../catalogobjects/firesytorecatalogid/firesytorecatalogid.component';
import { IdentifiersService } from '../../const/identifiers.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { diff } from 'json-diff-ts';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { CreatedateserviceService } from '../../services/createdateservice.service';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import { NavItem } from '../../primitives/nav-item';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MenuItemComponent } from '../../primitives/menu-item/menu-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RuntransactionService } from '../../services/runtransaction.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@Component({
	selector: 'app-savecatalogdataobjectdialog',
	templateUrl: './savecatalogdataobjectdialog.component.html',
	styleUrls: ['./savecatalogdataobjectdialog.component.scss'],
	standalone: true,
	imports: [CommonModule, MatTabsModule, MatGridListModule, MatInputModule, MatProgressSpinnerModule,
		MenuItemComponent, MatMenuModule, ReactiveFormsModule, ScrollingModule]
})
export class SavecatalogdataobjectdialogComponent implements AfterViewInit {

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	running=false;

	pleasefillin: string = 'Please fill in update type and description';
	cancelmessage = 'Save Canceled';

	type: string;
	originaldataobject: any;
	newdataobject: any;
	difference: any;
	originaldataobjectjson: string = '';
	newdataobjectjson = '';
	differencejson = '';
	updatetypeitems: NavItem[] = [];
	updatetype = 'dataset:CatalogObjectModificationType';
	anno: any;
	objectform: FormGroup;
	transaction: Record<any, unknown> = {};
	activity: Record<any, unknown> = {};
	runningtransaction = false;
	transactiontype: string = '';

	//label = anno['dataset:CatalogObjectModificationType'][rdfslabel];
	label = 'type';
	hint = 'give a short description of the change';

	objectdisplay = false;

	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;

	constructor(
		private formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService,
		private dateservice: CreatedateserviceService,
		public dialogRef: MatDialogRef<SavecatalogdataobjectComponent>,
		public identifiers: IdentifiersService,
		private runtranaction: RuntransactionService,
		@Inject(MAT_DIALOG_DATA) public inputdata: any,
	) {
		this.originaldataobject = this.inputdata['catalog'];
		this.newdataobject = this.inputdata['newcatalog'];
		this.anno = this.inputdata['annotations'];
		this.transactiontype = this.inputdata['transactiontype'];
	
		this.objectform = this.formBuilder.group({
			CatalogObjectModificationType: ['', Validators.required],
			DescriptionTitle: ['', Validators.required],
		});

		this.objectform.get('DescriptionTitle')?.valueChanges.subscribe(value => {
			this.activity[Ontologyconstants.DescriptionTitle] = value;

		});


		this.type = this.newdataobject[this.identifiers.DatabaseObjectType];
		const today:string = this.dateservice.todaysDateStandard();

		this.newdataobject[this.anno['dataset:DateCreated'][this.identifier]] = today;

		this.difference = diff(this.originaldataobject, this.newdataobject);

		this.transaction[Ontologyconstants.TransactionEventType] = this.transactiontype;
		this.activity = {};
		this.transaction[Ontologyconstants.ActivityInfo] = this.activity;
		
		this.activity[Ontologyconstants.FirebaseCatalogIDForModifiedObject] = this.newdataobject[Ontologyconstants.FirestoreCatalogID];
		this.activity[Ontologyconstants.FirestoreCatalogIDForSourceTransaction] = this.originaldataobject[Ontologyconstants.FirestoreCatalogIDForTransaction];
		this.activity[Ontologyconstants.ModifiedCatalogObject] = this.newdataobject;
		this.activity[Ontologyconstants.CatalogObjectModificationType] = this.objectform.get('CatalogObjectModificationType')!.value;
		this.activity[Ontologyconstants.DateCreated] = this.newdataobject[Ontologyconstants.DateCreated];
		this.activity[Ontologyconstants.DescriptionTitle] = this.objectform.get('DescriptionTitle')!.value;
		this.activity[Ontologyconstants.JsonDifferences] = this.difference;
		this.activity[Ontologyconstants.TransactionDebugMode] = 'dataset:TransactionModifyDatabasae';
		this.activity[Ontologyconstants.DateCreated] = today;

	}


	ngAfterViewInit(): void {
		this.updatetypeitems = this.menusetup.findChoices(this.anno, this.updatetype);
	}



	onNoClick(): void {
		const response: Record<any, unknown> = {};
		response[(Ontologyconstants.successful)] = false;
		response[Ontologyconstants.message] = this.cancelmessage;
		this.dialogRef.close(response);
	}
	saveDataClick(): void {
		this.running = true;
		this.runtranaction.run(this.transaction).subscribe({
			next: (result: any) => {
				this.runningtransaction = false;
				this.running = false;
				this.dialogRef.close(result);
			}
		})
	}
	setUpdateType($event: String) {
		this.objectform.get('CatalogObjectModificationType')!.setValue($event);
		this.activity[Ontologyconstants.CatalogObjectModificationType] = $event;
	}
}
