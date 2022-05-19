import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SavecatalogdataobjectComponent } from '../savecatalogdataobject/savecatalogdataobject.component';
import { FiresytorecatalogidComponent } from '../../catalogobjects/firesytorecatalogid/firesytorecatalogid.component';
import { IdentifiersService } from '../../const/identifiers.service';
@Component({
	selector: 'app-savecatalogdataobjectdialog',
	templateUrl: './savecatalogdataobjectdialog.component.html',
	styleUrls: ['./savecatalogdataobjectdialog.component.scss']
})
export class SavecatalogdataobjectdialogComponent implements AfterViewInit {

	dataobject: any;
	anno: any;
	dataobjectstring: string;
	type: string;
	
	objectdisplay = false;

	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;

	constructor(
		public dialogRef: MatDialogRef<SavecatalogdataobjectComponent>,
		public identifiers: IdentifiersService,
		@Inject(MAT_DIALOG_DATA) public inputdata: any,

	) { }

	toggleObjectView() {
    this.objectdisplay = !this.objectdisplay
  }
  
	ngAfterViewInit(): void {
		this.dataobject = this.inputdata['catalog'];
		this.type = this.dataobject[this.identifiers.DatabaseObjectType];
		this.anno = this.inputdata['annotations'];
		this.dataobjectstring = JSON.stringify(this.dataobject);
		const firestore = this.dataobject[this.identifiers.FirestoreCatalogID];
		this.firestoreid.setData(firestore);
	}
	onNoClick(): void {
		this.dialogRef.close('Canceled');
	}
	saveDataClick(): void {
		this.dialogRef.close('Successful (simulated) Write');
	}
}
