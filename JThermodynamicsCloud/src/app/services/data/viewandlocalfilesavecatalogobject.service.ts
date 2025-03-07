import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import {diff} from 'json-diff-ts';

@Injectable({
	providedIn: 'root'
})
export class ViewandlocalfilesavecatalogobjectService {

	constructor(public dialog: MatDialog) { }

	openDialog(catalog: any, filename: string, title: string) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;


		dialogConfig.data = {
			filename: filename,
			dataimage: catalog,
			title: title
		};
		const myDialogRef = this.dialog.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
		});
	}
	
	displayDifference(original: any,current: any, filename: string, title: string) {
		const differences = diff(original, current);
		this.openDialog(differences,filename,title);
	}
}
