import { Component, OnInit, ViewChild } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import {NameofpersonComponent} from '../../catalogbaseobjects/nameofperson/nameofperson.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import {SimpledatabaseobjectstructureComponent} from '../../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavItem } from '../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { SetofdataobjectlinksComponent } from '../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { DatasetreferenceComponent } from '../../datasetreference/datasetreference.component';

@Component({
  selector: 'app-databaseperson',
  templateUrl: './databaseperson.component.html',
  styleUrls: ['./databaseperson.component.scss']
})
export class DatabasepersonComponent implements OnInit {
  
  message: string;
  catalogtype = 'dataset:DatabasePerson';
  descriptionsuffix = 'Person';
  
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

  
  annoinfo: any;
  personGroup: FormGroup;
  	userclassification = 'dataset:UserClassification';
	userclassificationitems: NavItem[] = [];

  @ViewChild('nameofperson') nameofperson: NameofpersonComponent;
	@ViewChild('description') description: DatadatadescriptionComponent;
	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;
	@ViewChild('simpledata') simpledata: SimpledatabaseobjectstructureComponent;
	@ViewChild('references') references: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks: SetofsitereferencesComponent;

  constructor(
    private menusetup: MenutreeserviceService,
    private formBuilder: FormBuilder,
    public annotations: OntologycatalogService
  ) { 
    this.getCatalogAnnoations();
    this.personGroup = this.formBuilder.group({
          UserClassification: ['', Validators.required],
		});

  }

  ngOnInit(): void {
  }
  
  	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
          const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.userclassificationitems = this.menusetup.findChoices(this.annoinfo, this.userclassification);
				} else {
          alert("Error: " + responsedata);
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}
	
	setData(catalog: any): void {
    		if (this.simpledata != null) {
         const pdescr = catalog[this.annoinfo['dataset:PersonalDescription'][this.identifier]];
          this.personGroup.get('UserClassification').setValue(pdescr[this.annoinfo['dataset:UserClassification'][this.identifier]]);
          const name = pdescr[this.annoinfo['dataset:NameOfPerson'][this.identifier]]
          this.nameofperson.setData(name);
			this.simpledata.setData(catalog);
			const firestoreidvalues = catalog[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]];
			this.firestoreid.setData(firestoreidvalues);
    alert("setData 4");
			const descr = catalog[this.annoinfo['dataset:DataDescriptionPerson'][this.identifier]];
    alert("setData 5: " + JSON.stringify(descr));
			this.description.setData(descr);
    alert("setData 6");
			
			const refs = catalog[this.annoinfo['dataset:DataSetReference'][this.identifier]];
			this.references.setData(refs);
			const olinks = catalog[this.annoinfo['dataset:DataObjectLink'][this.identifier]];
			this.objectlinks.setData(olinks);
			const wlinks = catalog[this.annoinfo['dataset:ObjectSiteReference'][this.identifier]];
			this.objectlinks.setData(wlinks);
		} else {
			alert("Display objects not set up");
		}

  }


}
