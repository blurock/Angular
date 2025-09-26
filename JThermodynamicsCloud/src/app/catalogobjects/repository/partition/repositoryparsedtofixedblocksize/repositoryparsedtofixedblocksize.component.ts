import { Component, OnInit, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { IdentifiersService } from '../../../../const/identifiers.service';
import { RepositorydatapartitionblockComponent } from '../../repositorydatapartitionblock/repositorydatapartitionblock.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-repositoryparsedtofixedblocksize',
	templateUrl: './repositoryparsedtofixedblocksize.component.html',
	styleUrls: ['./repositoryparsedtofixedblocksize.component.scss'],
	standalone: true,
	imports: [RepositorydatapartitionblockComponent,
		MatCardModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,NgIf
	]
})
export class RepositoryparsedtofixedblocksizeComponent implements OnInit {

	catalogtype: string;
	objectform: UntypedFormGroup = new UntypedFormGroup({});
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

	@ViewChild('partition') partition?: RepositorydatapartitionblockComponent;

	constructor(
		private menusetup: MenutreeserviceService,
		public dialog: MatDialog,
		private formBuilder: UntypedFormBuilder,
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
		this.cataloginfo = catalog;
		alert("RepositoryparsedtofixedblocksizeComponent setData: " + JSON.stringify(this.cataloginfo));
		if (this.annoinfo != null) {
			const cntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
			this.objectform.get('BlockLineCount')?.setValue(catalog[cntid]) ?? '';
			const lnsid = this.annoinfo['dataset:ParsedLine'][this.identifier];
			const lines = catalog[lnsid];
			let text = "";
			for (let line of lines) {
				text = text.concat(line).concat('\n');
			}
			this.objectform.get('ParsedLine')?.setValue(text) ?? '';;
			this.partition?.setData(catalog);
		} else {
			alert("annotations not ready... wait");
		}
	}
	public getData(catalog: any) {
		const cntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
		catalog[cntid] = this.objectform.get('BlockLineCount')?.value ?? '';
		const lnsid = this.annoinfo['dataset:ParsedLine'][this.identifier];
		const text = this.objectform.get('ParsedLine')?.value ?? '';
		const lineS = text.split('\n');
		let lines = [];
		for (let line of lineS) {
			lines.push(line);
		}
		catalog[lnsid] = lines;
		this.partition?.getData(catalog);
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
					alert("getCatalogAnnoations(): " + JSON.stringify(Object.keys(catalog)));
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					alert("getCatalogAnnoations(): " + JSON.stringify(this.annoinfo));
					this.display = true;
					this.annoReady.emit(this.annoinfo);
					if (this.cataloginfo != null) {
						this.setData(this.cataloginfo);
						this.partition?.setDataFormat(this.cataloginfo);
					}
					this.objectform.get('BlockLineCount')?.setValue(this.cataloginfo['BlockLineCount'])
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}
	public setFormat(cataloginfo: any) {
		this.partition?.setDataFormat(cataloginfo);
	}
}
