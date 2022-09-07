import { Component, OnInit, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { IdentifiersService } from '../../../../const/identifiers.service';
import { RepositorydatapartitionblockComponent } from '../../repositorydatapartitionblock/repositorydatapartitionblock.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';

@Component({
	selector: 'app-repositoryparsedtofixedblocksize',
	templateUrl: './repositoryparsedtofixedblocksize.component.html',
	styleUrls: ['./repositoryparsedtofixedblocksize.component.scss']
})
export class RepositoryparsedtofixedblocksizeComponent implements OnInit {

	catalogtype: string;
	objectform: FormGroup;
	catalogobj: any;
	public annoinfo: any;
	annoReady = new EventEmitter<any>();


	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	message = 'Initial';
	title = 'Fixed Number of Lines Block';

	display = false;
	
	@Input() cataloginfo: any;

	@ViewChild('partition') partition: RepositorydatapartitionblockComponent;

	constructor(
		private menusetup: MenutreeserviceService,
		public dialog: MatDialog,
		private formBuilder: FormBuilder,
		public annotations: OntologycatalogService,
		public identifiers: IdentifiersService) {

		this.objectform = this.formBuilder.group({
			BlockLineCount: [1, Validators.required],
			ParsedLine: ['Line 1', Validators.required]
		});

		this.catalogtype = 'dataset:RepositoryParsedToFixedBlockSize';
		this.getCatalogAnnoations();


	}

	ngOnInit(): void {
	}

	public setData(catalog: any) {
		const cntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
		alert("RepositoryparsedtofixedblocksizeComponent: "  + cntid);
		alert("RepositoryparsedtofixedblocksizeComponent: "  + catalog[cntid]);
		this.objectform.get('BlockLineCount').setValue(catalog[cntid]);
		const lnsid = this.annoinfo['dataset:ParsedLine'][this.identifier];
		const lines = catalog[lnsid];
		let text = "";
		for (let line of lines) {
			alert(line);
			alert(text);
			text = text.concat(line).concat('\n');
		}
		this.objectform.get('ParsedLine').setValue(text);
		this.partition.setData(catalog);
	}
	public getData(catalog: any) {
		const cntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
		catalog[cntid] = this.objectform.get('BlockLineCount').value;
		const lnsid = this.annoinfo['dataset:ParsedLine'][this.identifier];
		const text = this.objectform.get('ParsedLine').value;
		const lineS = text.split('\n');
		let lines = [];
		for (let line of lineS) {
			lines.push(line);
		}
		catalog[lnsid] = lines;
		this.partition.getData(catalog);
	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
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
					this.display = true;
					this.annoReady.emit(this.annoinfo);
					this.partition.setDataFormat(this.cataloginfo);
					this.objectform.get('BlockLineCount').setValue(this.cataloginfo['BlockLineCount'])
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}
   public setFormat(cataloginfo: any) {
	   this.partition.setDataFormat(cataloginfo);
   }
}
