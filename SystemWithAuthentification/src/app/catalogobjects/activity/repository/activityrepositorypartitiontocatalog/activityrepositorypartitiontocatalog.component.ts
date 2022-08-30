import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';


@Component({
  selector: 'app-activityrepositorypartitiontocatalog',
  templateUrl: './activityrepositorypartitiontocatalog.component.html',
  styleUrls: ['./activityrepositorypartitiontocatalog.component.scss']
})
export class ActivityrepositorypartitiontocatalogComponent implements OnInit {
  
  
  parseinfoform: FormGroup;
  	maintainer: string;
  	message: string;
	catalogobj: any;
	annoinfo: any;
	topdisplay = false;

  
  	errormaintainer = 'Error in determining maintainer';


  constructor(
    public annotations: OntologycatalogService,
    manageuser: ManageuserserviceService,
    private _formBuilder: FormBuilder
  ) {
    		this.parseinfoform = this._formBuilder.group({
			BlockLineCount: ['1'],
			DescriptionTitle: ['', Validators.required],
			FileSourceFormat: ['', Validators.required],
			FilePartitionMethod: ['', Validators.required],
			DatasetCollectionObjectType: ['', Validators.required],
		});
		
				manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(this.errormaintainer);
			}
		});

		const catalogtype = 'dataset:ActivityRepositoryPartitionToCatalog';

		this.annotations.getNewCatalogObject(catalogtype).subscribe({
			next: (responsedata: any) => {
				this.message = 'got response';
				this.message = responsedata;
				const response = responsedata;
				this.message = 'response JSON';
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.topdisplay = true;
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});

   }

  ngOnInit(): void {
  }

}
