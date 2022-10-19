import { Component, OnInit, ViewChild } from '@angular/core';
import {DatasetrepositoryfilestagingComponent} from '../../catalogobjects/repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import {FindspecifictransactionindatasetComponent} from '../../dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { DatasettransactioneventobjectComponent} from '../../catalogobjects/transaction/datasettransactioneventobject/datasettransactioneventobject.component';
import {FetchcatalogobjectComponent} from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { RuntransactiondialogComponent } from '../../dialog/runtransactiondialog/runtransactiondialog.component';

@Component({
  selector: 'app-initialreadinofrepositoryfileevent',
  templateUrl: './initialreadinofrepositoryfileevent.component.html',
  styleUrls: ['./initialreadinofrepositoryfileevent.component.scss']
})
export class InitialreadinofrepositoryfileeventComponent implements OnInit {
  
  
  deletehint = 'Delete Repository File Transaction associated with the repository object';
  deletetransaction = 'Delete Transaction';
  loadcatalogfromdatabase = 'Fetch Previous Repository File Transaction';
  fetchcatalog = 'Fetch Catalog';
  readinfailed = 'Fetch Transaction Failed';
  readincanceled = 'Catalog Object fetch failed';
  catalogtype = 'dataset:RepositoryFileStaging';
  activitytype = 'dataset:ActivityRepositoryInitialReadLocalFile';
  failedsubmission = 'Delete transaction failed';
  	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

  
  annoinfo: any;
  maintainer: string;
  resultHtml: string;
  catalogobj: any;
  activity: any;
  
  
  
  @ViewChild('repository') repository: DatasetrepositoryfilestagingComponent;

  constructor(
		public dialog: MatDialog,
		manageuser: ManageuserserviceService
  ) { 
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
  }

  ngOnInit(): void {
  }
  
  	fetchInformationCatalog() {
      this.annoinfo = this.repository.annoinfo;
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: true, catalogtype: this.catalogtype },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				if (success == 'true') {
					this.catalogobj = result['dataset:simpcatobj'];
					this.repository.setData(this.catalogobj);
				} else {
					alert(this.readinfailed);
				}
			} else {
				alert(this.readincanceled);
			}

		});


	}

  	deleteTransaction(): void {
		const transaction = {};
		transaction['prov:activity'] = 'dataset:DatabaseDeleteTransaction';
		transaction['dcterms:creator'] = this.maintainer;
		transaction[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		const activityinfo = {};
		const transtitle = 'Delection Collection: ' + ' this.maintainer' + '   ';
		activityinfo['dcterms:title'] = transtitle;
        const transfirestoreid = this.catalogobj[this.annoinfo['dataset:FirestoreCatalogIDForTransaction'][this.identifier]];
		activityinfo[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]] = transfirestoreid;
		transaction['dataset:activityinfo'] = activityinfo;
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: transaction
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
                    this.catalogobj = null;
				} else {
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});

	}
  
  setCatalog(catalog): void {
    this.catalogobj = catalog;
   this.repository.setData(catalog);
  }
  

}
