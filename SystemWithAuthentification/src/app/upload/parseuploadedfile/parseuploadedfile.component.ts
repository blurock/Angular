import { Input, Output, Component, EventEmitter, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UploadinterfaceconstantsService } from '../uploadinterfaceconstants.service'
import {Ontologyconstants} from '../../const/ontologyconstants';
import {UploadfileinformationComponent} from '../uploadfileinformation/uploadfileinformation.component';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import { OntologycatalogService } from '../../services/ontologycatalog.service';

@Component({
	selector: 'app-parseuploadedfile',
	templateUrl: './parseuploadedfile.component.html',
	styleUrls: ['./parseuploadedfile.component.scss']
})
export class ParseuploadedfileComponent implements AfterViewInit {

	@Input() uploadinfoform: FormGroup;

	parseinfoform: FormGroup;
	formatInformation: any;
	filesourcetypechoices: string[];
	public maintainer = 'Administrator';
catalogobj: any;
annoinfo: any;
display = false;
message = 'Initializing';
	rdfslabel = Ontologyconstants.rdfslabel;
	identifier = 'dcterms:identifier';
	rdfscomment = Ontologyconstants.rdfscomment;

	

	constructor(
		public annotations: OntologycatalogService,
		private _formBuilder: FormBuilder,
		public labels: UploadinterfaceconstantsService,
	private uploadService: UploadmenuserviceService) {
				this.parseinfoform = this._formBuilder.group({
			BlockLineCount: ['1'],
			DescriptionTitle: ['', Validators.required],
			FilePartitionMethod: ['', Validators.required]
		});
		
		
	 }

	ngAfterViewInit(): void {
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
					this.display = true;
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	
		this.uploadService.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
			this.filesourcetypechoices = Object.keys(data);
		}, (error) => {
			console.log("An error accessing getFormatClassification Service");
		})
		
	}
	
	getForm(): FormGroup {
		return this.parseinfoform;
	}

	formatValue() {
		let ans = null;
		if(this.uploadinfoform != null) {
			ans = this.uploadinfoform.get('FileSourceFormat').value;
		}
		return ans;
	}
	formNeedsLineCount(): boolean {
		let ans = false;
		const format = this.formatValue();
		if (format != null) {
		const info = this.formatInformation[format];
		if (info != null) {
			const partition = info['dataset:partitionMethod'] as string;
			if (partition.match('dataset:PartitionToLineSet')) {
				ans = true;
			}
		}
		}
		return ans;
	}
	getSourceCatalog(): string {
		let ans = "";
		const format = this.formatValue();
		if (format != null) { }
		const info = this.formatInformation[format];
		if (info != null) {
			ans = info['dcat:catalog'] as string;
		}
		return ans;

	}
	blockCount(): string {
		let count = "";
		const format = this.formatValue();
		if (format != null) { }
		const info = this.formatInformation[format];
		if (info != null) {
			const val = info['dataset:blocklinecount'] as string;
			if (val.length > 0) {
				count = '(' + val + ')' as string;
			}
		}
		return count;
	}
	
	createParseActivity(): any {
				const json = {};
		json['prov:activity'] = 'dataset:PartiionSetWithinRepositoryFile';
		const jsonact = {};
		json['dataset:activityinfo'] = jsonact;
		const jsontransspec = {};
		alert(this.identifier);
		alert(this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]);
		jsonact[this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]] = jsontransspec;
		
		jsontransspec[this.annoinfo['dataset:DatasetName'][this.identifier]] = this.uploadinfoform.get('DatasetName').value;
		jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]] = this.uploadinfoform.get('DatasetVersion').value;
		jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.uploadinfoform.get('CatalogObjectUniqueGenericLabel').value;
		jsontransspec[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;


		jsonact[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.uploadinfoform.get('FileSourceFormat').value;
		jsonact[this.annoinfo['dataset:FilePartitionMethod'][this.identifier]] = this.formatInformation[this.uploadinfoform.get('FileSourceFormat').value]['dataset:partitionMethod']
		jsonact[this.annoinfo['dataset:BlockLineCount'][this.identifier]] = this.blockCount();
		jsonact[this.annoinfo['dataset:DatasetCollectionObjectType'][this.identifier]] = this.getSourceCatalog();
		jsonact[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.parseinfoform.get('DescriptionTitle').value;
		
		return json;
	}

submitParse() {
	alert("submit");
	const activity = this.createParseActivity();
	alert(JSON.stringify(activity))
}

}
