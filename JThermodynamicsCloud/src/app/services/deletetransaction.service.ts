import { Injectable } from '@angular/core';
import { Ontologyconstants } from '../const/ontologyconstants';
import { RuntransactiondialogComponent } from '../dialog/runtransactiondialog/runtransactiondialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserinterfaceconstantsService } from '../const/userinterfaceconstants.service';
import { ManageuserserviceService } from './manageuserservice.service';

@Injectable({
  providedIn: 'root'
})
export class DeletetransactionService {
	
	failedsubmission: string;
	maintainer: string = '';

  constructor(
	manageuser: ManageuserserviceService,
	constants: UserinterfaceconstantsService,
	private sanitizer: DomSanitizer,
	private dialog: MatDialog) { 
		this.failedsubmission = constants.failedsubmission;

		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});

  }
  
  deleteTransaction(firestore: any, safeHtml: SafeHtml)  {
  	const transaction: Record<string, unknown> = {};
  	transaction['prov:activity'] = 'dataset:DatabaseDeleteTransaction';
  	transaction['dcterms:creator'] = this.maintainer;
  	transaction[Ontologyconstants.catalogobjectmaintainer] = this.maintainer;
  	const activityinfo: Record<string, unknown> = {};
  	const transtitle = 'Delection Collection: ' + ' this.maintainer' + '   ';
  	activityinfo['dcterms:title'] = transtitle;
  	const fireid = Ontologyconstants.FirestoreCatalogID;
	console.log("deleteTransaction: " + firestore);
  	activityinfo[fireid] = firestore;
  	transaction['dataset:activityinfo'] = activityinfo;
  	const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
  		data: transaction
  	});

  	dialogRef.afterClosed().subscribe(result => {
  		if (result != null) {
  			const success = result['dataset:servicesuccessful'];
  			const resultHtml = result['dataset:serviceresponsemessage'];
  			safeHtml = this.sanitizer.bypassSecurityTrustHtml(resultHtml);
  			if (success == 'true') {
  				alert("Transaction delete successful");
  			} else {
  			}
  		} else {
  			safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.failedsubmission);;
  		}
  	});
  }
  
}
