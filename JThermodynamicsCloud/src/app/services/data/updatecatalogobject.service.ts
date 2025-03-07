import { Injectable,Inject } from '@angular/core';
import {diff} from 'json-diff-ts';
import {Ontologyconstants} from '../../const/ontologyconstants';
import {CreatedateserviceService} from '../createdateservice.service';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';

@Injectable({
  providedIn: 'root'
})
export class UpdatecatalogobjectService {
	
	identifier:string = Ontologyconstants.dctermsidentifier;

  constructor(
	private dateservice: CreatedateserviceService,
	//public dialogRef: MatDialogRef<ViewcatalogandsavetolocalfileComponent>,
	//@Inject(MAT_DIALOG_DATA) public mydata: any
  ) { 
	
  }
  
	updateCatalogObject(oldObject: any, newObject: any, annoinfo: any): any {
		newObject[annoinfo['dataset:DateCreated'][this.identifier]] = this.dateservice.todaysDateStandard();
		const differences = diff(oldObject, newObject);
		console.log("Differences: ", JSON.stringify(differences));
		
		
		
		
		return differences;
	}
}
