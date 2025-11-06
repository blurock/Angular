import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CatalogactivitybaseComponent } from '../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { MatInputModule } from '@angular/material/input';
import { SpecificationfordatasetComponent } from '../../../specificationfordataset/specificationfordataset.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { FileformatmanagerService } from '../../../../services/fileformatmanager.service';


@Component({
	selector: 'app-activityrepositorypartitiontocatalog',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatGridListModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		SpecificationfordatasetComponent
	],
	templateUrl: './activityrepositorypartitiontocatalog.component.html',
	styleUrls: ['./activityrepositorypartitiontocatalog.component.scss']
})
export class ActivityrepositorypartitiontocatalogComponent extends CatalogactivitybaseComponent implements OnInit {

	parseinfoform: FormGroup;
	maintainer: string = '';
	formatInformation: any;
	filesourcetypechoices: string[];
	showblkcnt = true;
	parsemethod: string = ';'

	getfileformatnotsuccessful: string;

	blkcntid = '';
	descrtitleid = '';
	formatid = '';
	methodid = '';
    collectionid = '';


	@ViewChild('spec') spec!: SpecificationfordatasetComponent;


	constructor(
		uploadService: UploadmenuserviceService,
		manageuser: ManageuserserviceService,
		formBuilder: FormBuilder,
		cd: ChangeDetectorRef,
		constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService,
		format: FileformatmanagerService
	) {
		super(constants, annotations, cd);

		this.getfileformatnotsuccessful = constants.getfileformatnotsuccessful;
		this.parseinfoform = formBuilder.group({
			BlockLineCount: ['not applicable'],
			DescriptionTitle: ['', Validators.required],
			FileSourceFormat: ['', Validators.required],
			FilePartitionMethod: ['', Validators.required],
			DatasetCollectionObjectType:  ['', Validators.required]
		});

		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.determineMaintainer);
			}
		});
		this.filesourcetypechoices = ["not set up"];
		format.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
			this.filesourcetypechoices = Object.keys(data);
		}, (error) => {
			alert(this.getfileformatnotsuccessful);
		})
		this.catalogtype = "dataset:ActivityRepositoryPartitionToCatalog";
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}

	override invalid(): boolean {
		return this.parseinfoform.invalid
			|| this.spec.invalid();
	}

	setIDs() {
		this.blkcntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
		this.descrtitleid = this.annoinfo['dataset:DescriptionTitle'][this.identifier];
		this.formatid = this.annoinfo['dataset:FileSourceFormat'][this.identifier];
		this.methodid = this.annoinfo['dataset:FilePartitionMethod'][this.identifier];
		this.collectionid = this.annoinfo['dataset:DatasetCollectionObjectType'][this.identifier];
	}

	override annotationsFound(response: any): void {
		super.annotationsFound(response);
	    this.setIDs();
	}


	override setData(a: any): void {
		super.setData(a);
		this.setIDs();
		this.parseinfoform.get('BlockLineCount')?.setValue(this.catalog[this.blkcntid]);
		this.parseinfoform.get('DescriptionTitle')?.setValue(this.catalog[this.descrtitleid]);
		this.parseinfoform.get('FileSourceFormat')?.setValue(this.catalog[this.formatid]);
		this.parseinfoform.get('FilePartitionMethod')?.setValue(this.catalog[this.methodid]);
		this.parseinfoform.get('DatasetCollectionObjectType')?.setValue(this.catalog[this.collectionid]);
		this.spec.setData(this.catalog);
	}
	override getData(activity: any): void {
		console.log("ActivityrepositorypartitiontocatalogComponent getData")
		this.setIDs();
		activity[this.blkcntid] = this.parseinfoform.get('BlockLineCount')?.value ?? '';
		activity[this.descrtitleid] = this.parseinfoform.get('DescriptionTitle')?.value ?? '';
		activity[this.formatid] = this.parseinfoform.get('FileSourceFormat')?.value ?? '';
		activity[this.methodid] = this.parseinfoform.get('FilePartitionMethod')?.value ?? '';
		activity[this.collectionid] = this.parseinfoform.get('DatasetCollectionObjectType')?.value ?? '';
		this.spec.getData(activity);
	console.log("ActivityrepositorypartitiontocatalogComponent getData" + JSON.stringify(activity));
	}

	override setPrerequisiteData(prerequisite: any): void {
		const activity = prerequisite[Ontologyconstants.ActivityInfo];
		this.setIDs();
		const format = activity[this.formatid];
		this.selectFileFormat(format);
		this.parseinfoform.get('DescriptionTitle')?.setValue(activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
		this.parseinfoform.get('FileSourceFormat')?.setValue(format);
        this.parseinfoform.get('DatasetCollectionObjectType')?.setValue(activity[this.collectionid]);

		this.spec.setData(activity);
	}

	selectFileFormat($event: any): void {
		this.parseinfoform.get('FilePartitionMethod')?.setValue(this.formatInformation[$event]['dataset:partitionMethod']);
		const blkcnt = this.formatInformation[$event]['dataset:blocklinecount'];
		if (blkcnt.length > 0) {
			this.showblkcnt = true;
		} else {
			this.showblkcnt = false;
		}
		this.parseinfoform.get('BlockLineCount')?.setValue(blkcnt);
		this.parsemethod = this.formatInformation[$event]['dataset:partitionMethod'];
	}

}
