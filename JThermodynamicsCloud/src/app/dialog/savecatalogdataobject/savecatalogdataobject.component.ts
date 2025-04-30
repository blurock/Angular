import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SavecatalogdataobjectdialogComponent } from '../savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
@Component({
	selector: 'app-savecatalogdataobject',
	templateUrl: './savecatalogdataobject.component.html',
	styleUrls: ['./savecatalogdataobject.component.scss']
})
export class SavecatalogdataobjectComponent  {
	catalogobj: any;
	public annoinfo = null;
	annoReady = new EventEmitter<any>();

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	message = 'Initial';

	catalogtype: string = '';
	display = false;
	
	constructor(
		public dialog: MatDialog,
		public annotations: OntologycatalogService,
		public identifiers: IdentifiersService) {
		
	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
	    this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				this.message = 'got response';
				this.message = responsedata;
				const response = responsedata;
				this.message = 'response JSON';
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.display = true;
					this.annoReady.emit(this.display);
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});

	}

	public openDialog(catalog: any): void {
		const dialogRef = this.dialog.open(SavecatalogdataobjectdialogComponent, {
			data: { catalog: catalog, annotations: this.annoinfo }
		});

		dialogRef.afterClosed().subscribe(result => {
			alert(result);
		});
	}
}
