import { ChangeDetectorRef, Component, ComponentRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service';
import { TransactioncatalogobjectlistComponent } from '../../transaction/transactioncatalogobjectlist/transactioncatalogobjectlist.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';

@Component({
	selector: 'app-managerdfcatalogidelelements',
	standalone: true,
	imports: [
		MatCardModule
	],
	templateUrl: './managerdfcatalogidelelements.component.html',
	styleUrl: './managerdfcatalogidelelements.component.scss'
})
export class ManagerdfcatalogidelelementsComponent {

	listtitle!: string;
	maintainer: string = '';
	transactioncatalogobjects: string;
	
	@Output() showCatalogObject = new EventEmitter<any>();


	@ViewChild('transactionobjects', { read: ViewContainerRef }) transactionobjects!: ViewContainerRef;

	constructor(
		manageuser: ManageuserserviceService,
		private runservice: RunserviceprocessService,
		userconstants: UserinterfaceconstantsService,
		private cdRef: ChangeDetectorRef
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		this.transactioncatalogobjects = userconstants.outputcatalogobjects;
	}

	fetchtransactionobject(transactionid: string, anno: any) {
		let json: Record<any, unknown> = {};
		json['service'] = 'GeneralRDFQuery';
		json[Ontologyconstants.RDFRelationClassName] = 'dataset:RDFCatalogID';
		json[Ontologyconstants.TransactionID] = transactionid;
		json[Ontologyconstants.CatalogObjectOwner] = this.maintainer;
		this.transactionobjects.clear();
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				if (success == 'true') {
					const results = responsedata[Ontologyconstants.catalogobject];
					const result = results[0];
					const properties = result[Ontologyconstants.RDFGeneralQueryResultRow];
					for (const prop of properties) {
						const catalogline: ComponentRef<TransactioncatalogobjectlistComponent> = this.transactionobjects.createComponent(TransactioncatalogobjectlistComponent);
						catalogline.instance.firestoreAddress.subscribe((firestoreid) => {
										this.showCatalogObject.emit(firestoreid);
							})
						catalogline.instance.setData(prop);
					}
				} else {
					this.runservice.checkReturn(responsedata);
				}
			}
		})
	}

}
