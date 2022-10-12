import { Component, OnInit, EventEmitter,ViewChild } from '@angular/core';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import {CreatenewdatasetcollectionComponent} from '../createnewdatasetcollection/createnewdatasetcollection.component';
import {ModifydatasetcollectionidsComponent} from '../modifydatasetcollectionids/modifydatasetcollectionids.component';
import {VisualizedatasetcollectionidsComponent} from '../visualizedatasetcollectionids/visualizedatasetcollectionids.component';
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
	
	@ViewChild('createcollection') createcollection: CreatenewdatasetcollectionComponent;
	@ViewChild('modifycollection') modifycollection: ModifydatasetcollectionidsComponent;
	@ViewChild('visualcollection') visualcollection: VisualizedatasetcollectionidsComponent;

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
 	
 	setData(collectionids: any) {
		 this.createcollection.setTransaction(collectionids);
		 this.modifycollection.setPrerequisite(collectionids);
		 this.visualcollection.setData(collectionids);
	 }
 	
    newCollectionV(collectionids: any){
				this.setData(collectionids);
				};
    newCollectionM(collectionids: any){
		this.setData(collectionids);
		}
    newCollectionC(collectionids: any){
		this.setData(collectionids);
		}
		
}
