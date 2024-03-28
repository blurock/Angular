import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { FormBuilder, Validators } from '@angular/forms';
import { NavItem } from '../../primitives/nav-item';


@Component({
	selector: 'app-datasetcollectionchoicemenu',
	templateUrl: './datasetcollectionchoicemenu.component.html',
	styleUrls: ['./datasetcollectionchoicemenu.component.scss']
})
export class DatasetcollectionchoicemenuComponent implements OnInit {

	@Input() activityanno: any;
	@Input() maintainer: string;
	@Output() collection = new EventEmitter<any>();
	
	firebase = 'Firebase ID token has expired';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	srclabel: string;
	srchint: string;

	resultHtml: string;

	systemcollections: any;
	datasetcollections: any;
	objectform: any;
	items: NavItem[];

	constructor(
		private formBuilder: FormBuilder,
		private runservice: RunserviceprocessService,
	) {

		this.objectform = this.formBuilder.group({
			DatasetCollectionsSetLabel: ['', Validators.required],
		});

	}

	isValid(): boolean {
		return this.objectform.invalid;
	}

	ngOnInit(): void {
		if(this.activityanno['dataset:DatasetCollectionsSetLabel'] != null) {
		this.srclabel = this.activityanno['dataset:DatasetCollectionsSetLabel'][this.rdfslabel];
		this.srchint = this.activityanno['dataset:DatasetCollectionsSetLabel'][this.rdfscomment];
		} else {
		this.srclabel = this.activityanno['dataset:DatasetCollectionSetSourceLabel'][this.rdfslabel];
		this.srchint = this.activityanno['dataset:DatasetCollectionSetSourceLabel'][this.rdfscomment];			
		}
		this.getAllDatasetCollections();
	}

	getAllDatasetCollections(): any {
		const inputdata = {};
		inputdata[Ontologyconstants.service] = 'FindAllDatasetCollectionSets';
		inputdata['dataset:catalogobjectmaintainer'] = this.maintainer;
		this.runservice.run(inputdata).subscribe({
			next: (responsedata: any) => {
				this.resultHtml = responsedata[Ontologyconstants.message];
				const success = responsedata[Ontologyconstants.successful];
				if (success === 'true') {
					const arr = responsedata[Ontologyconstants.catalogobject];
					const set = arr[0];
					this.systemcollections = set['dataset:systemdatasetcollection'];
					this.datasetcollections = set[Ontologyconstants.ThermodynamicsDatasetCollectionIDsSet];
					this.items = [];
					if (this.systemcollections != null) {
						const systemitems = this.makeDatasetMenu(this.systemcollections, 'dataset:catalogkey');
						if (systemitems.length > 0) {
							const sysitems = {
								displayName: 'From System',
								disabled: false,
								value: 'From System',
								children: systemitems
							}
							this.items.push(sysitems);
						}
					}

					if (this.datasetcollections != null) {
						const datasetitems = this.makeDatasetMenu(this.datasetcollections, 'dataset:datasetcollectionslabel');
						if (datasetitems.length > 0) {
							const datitems = {
								displayName: 'From User',
								disabled: false,
								value: 'From User',
								children: datasetitems
							}
							this.items.push(datitems);
						}
					}

				} else {
					this.runservice.checkReturn(responsedata);
				}
			}
		});
	}

	makeDatasetMenu(system: any, id: string): NavItem[] {
		var items = [];
		for (const collection of system) {
			const label = collection[id];
			const type = collection['dataset:objectype'];
			if (type === 'dataset:ThermodynamicsSystemCollectionIDsSet'
				|| type === 'dataset:ChemConnectDatasetCollectionIDsSet'
				|| type === 'dataset:ThermodynamicsDatasetCollectionIDsSet') {
				const celement: NavItem = {
					displayName: label,
					disabled: false,
					value: label,
					children: []
				};
				items.push(celement);

			}
		}
		return items;
	}

	datasetChosen(child: string): void {
		const chosen = this.getCollection(child);
		this.objectform.get('DatasetCollectionsSetLabel').setValue(child);
		this.collection.emit(chosen);
	}


	getCollection(name: string): void {
		var chosen = null;
		if (this.systemcollections != null) {
			for (var i = 0; i < this.systemcollections.length && chosen == null; i++) {
				const coll = this.systemcollections[i];
				if (name === coll['dataset:catalogkey']) {
					chosen = coll;
				}
			}
		}
		if (this.datasetcollections != null) {
			for (var i = 0; i < this.datasetcollections.length && chosen == null; i++) {
				const coll = this.datasetcollections[i];
				if (name === coll['dataset:datasetcollectionslabel']) {
					chosen = coll;
				}
			}
		}
		return chosen;
	}

}
