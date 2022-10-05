import { Component, OnInit, EventEmitter } from '@angular/core';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';


@Component({
	selector: 'app-managedatasetcollections',
	templateUrl: './managedatasetcollections.component.html',
	styleUrls: ['./managedatasetcollections.component.scss']
})
export class ManagedatasetcollectionsComponent implements OnInit {

	newCollection = new EventEmitter<any>();
    annoReady = new EventEmitter<any>();
	waitmessage = 'Initializing';

	catalogobj: any;
	annoinfo: any;
	cataloganno: any;
	maintainer: string;
	

	constructor(
		manageuser: ManageuserserviceService,
		
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
      this.annoReady.subscribe(result => {
        this.cataloganno = result;
        });
	}

}
