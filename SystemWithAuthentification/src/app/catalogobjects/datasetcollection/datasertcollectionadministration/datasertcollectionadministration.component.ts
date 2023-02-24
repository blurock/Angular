import { Component, OnInit, ViewChild } from '@angular/core';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service'
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { ThermodynamicsdatasetcollectionidssetComponent } from '../../datasetcollection/thermodynamicsdatasetcollectionidsset/thermodynamicsdatasetcollectionidsset.component';

@Component({
  selector: 'app-datasertcollectionadministration',
  templateUrl: './datasertcollectionadministration.component.html',
  styleUrls: ['./datasertcollectionadministration.component.scss']
})
export class DatasertcollectionadministrationComponent implements OnInit {

	setuptitle = 'Choose Dataset Collection Account';
	serviceid = 'service';
	items: any;
	resultHtml: string;
	
	datasetcollections: any;
	collection: any;
	cataloganno: any;
	maintainer: string;
	catalogtype = 'dataset:ThermodynamicsDatasetCollectionIDsSet';
	@ViewChild('thermocollectionset') thermocollectionset: ThermodynamicsdatasetcollectionidssetComponent;

  constructor(
    public annotations: OntologycatalogService,
    public runservice: RunserviceprocessService,
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
    this.getAllDatasetCollections();
  }
  
  	getAllDatasetCollections(): any {
		const inputdata = {};
		inputdata[this.serviceid] = 'FindAllDatasetCollectionSets';
		inputdata['dataset:catalogobjectmaintainer'] = this.maintainer;
		this.runservice.run(inputdata).subscribe({
			next: (responsedata: any) => {
        this.resultHtml = responsedata[Ontologyconstants.message];
				const success = responsedata[Ontologyconstants.successful];
				if (success == 'true') {
					this.datasetcollections = responsedata[Ontologyconstants.catalogobject];
					this.makeDatasetMenu();
				} else {
					alert('List of Datasets not available');
				}
			}
		});
	}
	
	makeDatasetMenu(): void {
    let num = 0;
    this.items = [];
    for(let collection of this.datasetcollections) {
      const label = collection['dataset:datasetcollectionslabel'];
      const item = {};
      item['label'] = label;
      item['collection'] = collection;
      this.items.push(item);
    }
  }

  
  datasetChosen(child): void {
    this.collection = child;
    this.thermocollectionset.setData(this.collection);
    this.setuptitle = 'Dataset: ' + this.collection['dataset:datasetcollectionslabel']
  }
public getCatalogAnnoations(): void {
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.resultHtml = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.cataloganno = catalog[Ontologyconstants.annotations];
				} else {
					
				}
			},
			error: (info: any) => { alert('Get Annotations failed: see logs'); }
		});
	}
newCollectionV($event) {
	
}
}
