import { Component, ComponentRef, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { Ontologyconstants } from 'systemconstants';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { RequiredtransactionblockComponent } from './requiredtransactionblock/requiredtransactionblock.component';

@Component({
  selector: 'app-managerequiredtransactions',
  standalone: true,
  imports: [
	MatCardModule,
	
  ],
  templateUrl: './managerequiredtransactions.component.html',
  styleUrl: './managerequiredtransactions.component.scss'
})
export class ManagerequiredtransactionsComponent {
	
	requiredtransactionobjects: string = '';
	maintainer: string = '';
	
	@ViewChild('requiredtransactions', { read: ViewContainerRef }) requiredtransactions!: ViewContainerRef;
	@Output() firestoreAddress = new EventEmitter<any>();
	
	constructor(
		manageuser: ManageuserserviceService,
		private runservice: RunserviceprocessService,
		userconstants: UserinterfaceconstantsService
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		this.requiredtransactionobjects = userconstants.requiredtransactionobjects;
	}

	fetchrequiredtransactiontree(transactionid: string) {
		let json: Record<any, unknown> = {};
		json['service'] = 'FindTreeOfPrerequisiteTransactions';
		json[Ontologyconstants.TransactionID] = transactionid;
		json[Ontologyconstants.CatalogObjectOwner] = this.maintainer;
		this.requiredtransactions.clear();
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				if (success == 'true') {
					const array = responsedata[Ontologyconstants.catalogobject];
					const results = array[0];
					const transactionline: ComponentRef<RequiredtransactionblockComponent> = this.requiredtransactions.createComponent(RequiredtransactionblockComponent);
					transactionline.instance.setTitle('Tree of Required Transactions');
					const required: any[] = results[Ontologyconstants.CatalogObjectPrerequisiteTreeNode]
					transactionline.instance.setArrayData(required);
					transactionline.instance.firestoreAddress.subscribe((firestoreid: any) => {
						this.firestoreAddress.emit(firestoreid);
						});
					
				} else {
					this.runservice.checkReturn(responsedata);
				}
			}
		})
	}

}
