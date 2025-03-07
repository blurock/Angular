import { Component, OnInit, Input } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import { NavItem } from '../../primitives/nav-item';

@Component({
	selector: 'app-parameterspecification',
	templateUrl: './parameterspecification.component.html',
	styleUrls: ['./parameterspecification.component.scss']
})
export class ParameterspecificationComponent implements OnInit {
	paramspecform: UntypedFormGroup;
	parameterlabeltid: string;
	unitclassid: string;
	unitsofvalueid; string;
	parametertypeid: string;
	unitsid: string;
	uncertaintyid: string;
	
	items: NavItem[];
	unitsarray: [string];
	title: string;

	@Input() annoinfo: any;
	@Input() parameterinfo: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	uncertaintymenulabel = 'dataset:DataPointUncertainty';
	getparameterdatanotsuccessful = 'failed to get parameter data';
	defaultuncertainty = 'dataset:ImpliedDigitsUncertainty';

	constructor(
		private _formBuilder: UntypedFormBuilder,
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
	
	invalid(): boolean {
		return this.paramspecform.invalid;
	}

	ngOnInit(): void {
	this.title = this.parameterinfo['skos:prefLabel'];
		this.paramspecform.get('UnitClass').setValue(this.parameterinfo['qudt:QuantityKind']);
		this.paramspecform.get('ParameterTypeSpecification').setValue(this.parameterinfo['dataset:dynamicType']);
		this.items = this.menusetup.findChoices(this.annoinfo, this.uncertaintymenulabel);
		this.unitsarray = this.parameterinfo['qudt:Unit'];
		this.paramspecform.get('ParameterLabel').setValue(this.parameterinfo['skos:prefLabel']);
		this.paramspecform.get('UnitsOfValue').setValue(this.unitsarray[0]);
		this.paramspecform.get('DataPointUncertainty').setValue(this.defaultuncertainty)	}

	setUncertainty($event: string): void {
		this.paramspecform.get('DataPointUncertainty').setValue($event);
	}


	setIDs() {
		this.parameterlabeltid = this.annoinfo['dataset:ParameterLabel'][this.identifier];
		this.unitclassid = this.annoinfo['dataset:UnitClass'][this.identifier];
		this.unitsofvalueid = this.annoinfo['dataset:UnitsOfValue'][this.identifier];
		this.parametertypeid = this.annoinfo['dataset:ParameterTypeSpecification'][this.identifier];
		this.unitsid = this.annoinfo['dataset:ValueUnits'][this.identifier];
		this.uncertaintyid = this.annoinfo['dataset:DataPointUncertainty'][this.identifier];
		
		
	}

	getData(specification: any) {
		this.setIDs();
		specification[this.parameterlabeltid] = this.paramspecform.get('ParameterLabel').value;
		const unitvalue = {};
		specification[this.unitsid] = unitvalue;
		unitvalue[this.unitclassid] = this.paramspecform.get('UnitClass').value;
		unitvalue[this.unitsofvalueid] = this.paramspecform.get('UnitsOfValue').value;
		specification[this.parametertypeid] = this.paramspecform.get('ParameterTypeSpecification').value;
		specification[this.uncertaintyid] = this.paramspecform.get('DataPointUncertainty').value;
	}

	setData(specification: any) {
		this.setIDs();
		this.paramspecform.get('ParameterLabel').setValue(specification[this.parameterlabeltid]);
		const valueunits = specification[this.unitsid]
		this.paramspecform.get('UnitClass').setValue(valueunits[this.unitclassid]);
		this.paramspecform.get('UnitsOfValue').setValue(valueunits[this.unitsofvalueid]);
		this.paramspecform.get('ParameterTypeSpecification').setValue(specification[this.parametertypeid]);
		this.paramspecform.get('DataPointUncertainty').setValue(specification[this.uncertaintyid]);
	}
	


}
