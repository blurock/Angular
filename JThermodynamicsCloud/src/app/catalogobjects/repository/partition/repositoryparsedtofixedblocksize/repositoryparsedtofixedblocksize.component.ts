import { Component, ViewChild, Input, ChangeDetectorRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { IdentifiersService } from '../../../../const/identifiers.service';
import { RepositorydatapartitionblockComponent } from '../../repositorydatapartitionblock/repositorydatapartitionblock.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { CatalogbaseComponent } from '../../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { Ontologyconstants } from 'systemconstants';

@Component({
	selector: 'app-repositoryparsedtofixedblocksize',
	templateUrl: './repositoryparsedtofixedblocksize.component.html',
	styleUrls: ['./repositoryparsedtofixedblocksize.component.scss'],
	standalone: true,
	imports: [
		RepositorydatapartitionblockComponent,
		MatCardModule, 
		MatFormFieldModule, 
		MatInputModule, 
		ReactiveFormsModule, 
		NgIf
	]
})
export class RepositoryparsedtofixedblocksizeComponent extends CatalogbaseComponent implements AfterViewInit {

	objectform: UntypedFormGroup = new UntypedFormGroup({});


	title = 'Fixed Number of Lines Block';

	display = false;
	parsedlines = '';
	blocklinecount = 1;
	minrows = 4;
	maxcount = 15;
	
	@Input() cataloginfo: any;

	@ViewChild('partition') partition?: RepositorydatapartitionblockComponent;

	constructor(
		public dialog: MatDialog,
		private formBuilder: UntypedFormBuilder,
		annotations: OntologycatalogService,
		public identifiers: IdentifiersService,
		cdRef: ChangeDetectorRef,
		constants: UserinterfaceconstantsService
	) {
		super(constants, annotations, cdRef);
		this.objectform = this.formBuilder.group({
			//BlockLineCount: [1, Validators.required],
			ParsedLine: ['Line 1', Validators.required]
		});

		this.catalogtype = 'dataset:RepositoryParsedToFixedBlockSize';
	}
	
	ngAfterViewInit(): void {
		if(this.cataloginfo) {
			this.setData(this.cataloginfo);
		}
}

	public override  setData(catalog: any) {
		super.setData(catalog);
		if (this.annoinfo != null ) {
			const cntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
			//this.objectform.get('BlockLineCount')?.setValue(catalog[cntid]) ?? '';
			this.blocklinecount = catalog[cntid];
			const lnsid = this.annoinfo['dataset:ParsedLine'][this.identifier];
			this.parsedlines = catalog[lnsid];
			let text = "";
			var count = 0;
			for (let line of this.parsedlines) {
				count = count + line.split('\n').length;
				text = text.concat(line).concat('\n');
			}
			if(count > this.maxcount) {
				this.minrows = this.maxcount;
			} else {
				this.minrows = count;
			}
			this.objectform.get('ParsedLine')?.setValue(text) ?? '';;
			this.partition?.setData(catalog);
			this.display = true;
		} else {
			
		}
	}
	public override  getData(catalog: any) {
		catalog[Ontologyconstants.dctermsidentifier] = Ontologyconstants.RepositoryParsedToFixedBlockSize;
		const cntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
		catalog[cntid] = this.blocklinecount;
		const lnsid = this.annoinfo['dataset:ParsedLine'][this.identifier];
		catalog[lnsid] = this.parsedlines;
		this.partition?.getData(catalog);
	}

	override annotationsFound(response: any) {
		this.annoReady.emit(this.annoinfo);
		if(this.cataloginfo) {
			this.setData(this.cataloginfo);
		}
	}

	public setFormat(cataloginfo: any) {
		this.partition?.setDataFormat(cataloginfo);
	}
}
