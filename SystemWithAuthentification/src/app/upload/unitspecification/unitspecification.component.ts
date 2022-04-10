import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UploadinterfaceconstantsService } from '../uploadinterfaceconstants.service'

@Component({
	selector: 'app-unitspecification',
	templateUrl: './unitspecification.component.html',
	styleUrls: ['./unitspecification.component.scss']
})
export class UnitspecificationComponent implements OnInit {

	@Input() unitparameters: FormGroup;
	@Input() unitclass: string;
	@Input() units: string[];
	@Input() uncertaintyInformation: any;

	rdflabel = "rdfs:label";
	uncertaintyInformationkeys: any;
	constructor(public labels: UploadinterfaceconstantsService) { }
	
	unitscpy: string[];

	ngOnInit(): void {
   		this.uncertaintyInformationkeys = Object.keys(this.uncertaintyInformation);
   		this.unitscpy = this.units;
	}


}
