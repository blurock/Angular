import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import { NavItem } from '../../primitives/nav-item';

@Component({
	selector: 'app-parameterspecification',
	templateUrl: './parameterspecification.component.html',
	styleUrls: ['./parameterspecification.component.scss']
})
export class ParameterspecificationComponent implements OnInit {
	paramspecform: FormGroup;
	parameterlabeltid: string;
	unitclassid: string;
	unitsofvalueid; string;
	parametertypeid: string;
	items: NavItem[];
	unitsarray: [];
	title: string;

	@Input() annoinfo: any;
	@Input() parameterinfo: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	uncertaintymenulabel = 'dataset:DataPointUncertainty';
	getparameterdatanotsuccessful = 'failed to get parameter data';


	constructor(
		private _formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService
	) {
		this.paramspecform = this._formBuilder.group({
			ParameterLabel: ['', Validators.required],
			UnitClass: ['', Validators.required],
			UnitsOfValue: ['', Validators.required],
			ParameterTypeSpecification: ['', Validators.required],
			DataPointUncertainty: ['', Validators.required]
		});

	}

	ngOnInit(): void {
		this.title = this.parameterinfo['skos:prefLabel'];
		this.paramspecform.get('UnitClass').setValue(this.parameterinfo['qudt:QuantityKind']);
		this.paramspecform.get('ParameterTypeSpecification').setValue(this.parameterinfo['dataset:dynamicType']);
		this.items = this.menusetup.findChoices(this.annoinfo, this.uncertaintymenulabel);
		this.unitsarray = this.parameterinfo['qudt:Unit'];
	}

	setUncertainty($event: string): void {
		this.paramspecform.get('DataPointUncertainty').setValue($event);
	}


	setIDs() {
		this.parameterlabeltid = this.annoinfo['dataset:ParameterLabel'][this.identifier];
		this.unitclassid = this.annoinfo['dataset:UnitClass'][this.identifier];
		this.unitsofvalueid = this.annoinfo['dataset:UnitsOfValue'][this.identifier];
		this.parametertypeid = this.annoinfo['dataset:ParameterTypeSpecification'][this.identifier];
	}

	getData(specification: any) {
		this.setIDs();
		specification[this.parameterlabeltid] = this.paramspecform.get('ParameterLabel').value;
		specification[this.unitclassid] = this.paramspecform.get('UnitClass').value;
		specification[this.unitsofvalueid] = this.paramspecform.get('UnitsOfValue').value;
		specification[this.parametertypeid] = this.paramspecform.get('ParameterTypeSpecification').value;
	}

	setData(specification: any) {
		this.setIDs();
		this.paramspecform.get('ParameterLabel').setValue(specification[this.parameterlabeltid]);
		this.paramspecform.get('UnitClass').setValue(specification[this.unitclassid]);
		this.paramspecform.get('UnitsOfValue').setValue(specification[this.unitsofvalueid]);
		this.paramspecform.get('ParameterTypeSpecification').setValue(specification[this.parametertypeid]);
	}

}
