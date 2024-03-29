import { Component, OnInit, ViewChild } from '@angular/core';
import { OntologycatalogService } from 'src/app/services/ontologycatalog.service';
import { Observable } from 'rxjs';
import { CatalogbasedataComponent } from '../../catalogbasedata/catalogbasedata.component';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import { CatalogidComponent } from '../../catalogid/catalogid.component';
import { BaseCatalogInterface } from 'src/app/primitives/basecataloginterface';
import {Ontologyconstants} from '../../../const/ontologyconstants';
@Component({
	selector: 'app-repositorydatafile',
	templateUrl: './repositorydatafile.component.html',
	styleUrls: ['./repositorydatafile.component.scss']
})
export class RepositorydatafileComponent extends BaseCatalogInterface implements OnInit {

	type = 'type';
	simpleName: string;
	simpleNametip: string;
	title = 'one line description';
	titletip: string;
	showExtra = false;
	descriptionsuffix = 'FileStaging';


	parameters: Observable<any>;
	baseobjdata: any;
	descriptiondata: any;
	catidobj: any;
	catalogobj: any;
	annoinfo: any;
	reflabel: string;
	message: string;

	@ViewChild('basedataobj') baseobj: CatalogbasedataComponent;
	//@ViewChild('description') description: DatadatadescriptionComponent;
	@ViewChild('catid') catid: CatalogidComponent;

	constructor(private annotations: OntologycatalogService) {
		super();
	}

	ngOnInit(): void {
		this.annotations.getNewCatalogObject('dataset:RepositoryFileStaging').subscribe({
			next: (responsedata: any) => {
				const response = this.messageToJSON(responsedata);
				this.message = response[Ontologyconstants.message] as string;
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.baseobjdata = this.catalogobj;
					alert(JSON.stringify(this.baseobjdata));
					//const descr = 'descr-' + this.descriptionsuffix;
					//this.descriptiondata = this.catalogobj[descr];
					this.catidobj = this.catalogobj.catid;
					this.reflabel = 'ref';
				} else {
					alert(this.message);
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}

	setData(info: any, annoinfo: any): void {
		if (this.baseobj != null) {
			this.baseobj.setData(info, annoinfo);
		}
		/*
		if (this.description != null) {
			const descr = 'descr-' + this.descriptionsuffix;
			this.description.setData(info[descr]);
		}
		*/
		if (this.catid != null) {
			this.catid.setData(info.catid, annoinfo);
		}

	}
	saveit(): void {
		alert(JSON.stringify(this.catalogobj.ref));
	}
	refinfochange($event): void {
	}
}
