import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
	selector: 'app-uploadfileinformation',
	templateUrl: './uploadfileinformation.component.html',
	styleUrls: ['./uploadfileinformation.component.scss']
})
export class UploadfileinformationComponent implements OnInit {

	@Input() uploadinfoform: FormGroup;
	@Input() references: FormArray;
	@Input() filesourcetypechoices: string[];
	@Output() newItemEvent = new EventEmitter<FormGroup>();

	filesourcetitlelabel = 'Title of Source File';
	filesourcetitlehint = 'One line description';

	filesourceformatlabel = 'File Format';
	filesourceformathint = 'Will determine how the file is processed';
	/*
	filesourcetypechoices: string[] = ['JThermodynamicsVibrationalModes',
		'TherGasBensonRules',
		'ThergasSpeciesThermodynamics'];
*/
	genericnamelabel = 'Source Generic Name';
	genericnamehint = 'A unique name for this dataset object process';

	datasetnamelabel = 'Source set name';
	datasetnamehint = 'Source name (refers to same collection of sources)';

	versionlabel = 'Version';
	versionhint = 'Refers to version of this data source';

	constructor() { }

	ngOnInit(): void {
	}

	addReference(reference: FormGroup): void {
		this.newItemEvent.emit(reference);
	}
}
