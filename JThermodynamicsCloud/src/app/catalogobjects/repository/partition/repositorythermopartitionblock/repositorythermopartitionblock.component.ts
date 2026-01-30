import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from 'systemconstants';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-repositorythermopartitionblock',
	templateUrl: './repositorythermopartitionblock.component.html',
	styleUrls: ['./repositorythermopartitionblock.component.scss'],
	standalone: true,
	imports: [MatCardModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,
		FormsModule, NgIf
	]
})
export class RepositorythermopartitionblockComponent implements OnInit {

	@Input() annoinfo?: any
	@Input() annoReady?: EventEmitter<any>;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	block: Record<string,any> = {};


	objectform: UntypedFormGroup = new UntypedFormGroup({});
	display = false;

	title = 'Thermodynamic Block';
    message = 'Initalization';

	constructor(
		private formBuilder: UntypedFormBuilder
	) {


	}

	ngOnInit(): void {
		this.annoReady?.subscribe(result => {
			this.annoinfo = result;
			this.display = true;
		});
		this.objectform = this.formBuilder.group({
			ThermoBlock: ['', Validators.required],
		});
	}

	public setData(catalog: any) {
		this.block = catalog;
		const cntid1 = this.annoinfo['dataset:ThermodynamicsTherGasLine1'][this.identifier];
		const cntid1a = this.annoinfo['dataset:ThermodynamicsTherGasLine1a'][this.identifier];
		const cntid2 = this.annoinfo['dataset:ThermodynamicsTherGasLine2'][this.identifier];
		const cntid3 = this.annoinfo['dataset:ThermodynamicsTherGasLine3'][this.identifier];
		const thermoid = this.annoinfo['dataset:RepositoryThermoPartitionBlock'][this.identifier];
        const thermo = catalog[thermoid];
		let linesS = thermo[cntid1];
		linesS = linesS.concat('\n');
		if(thermo[cntid1a] != null && thermo[cntid1a].length > 0) {
			linesS = linesS = thermo[cntid1a];
			linesS = linesS.concat('\n');
		}
		linesS = linesS = linesS.concat(thermo[cntid2]);
		linesS = linesS.concat('\n');
		linesS = linesS.concat(thermo[cntid3]);
		this.objectform?.get('ThermoBlock')?.setValue(linesS);
	}
	public getData(catalog: any) {
		const thermo: Record<string,any> = {};
		const thermoid = this.annoinfo['dataset:RepositoryThermoPartitionBlock'][this.identifier];
		catalog[thermoid] = thermo;
		const block = this.objectform?.get('ThermoBlock')?.value ??'';
		const cntid1 = this.annoinfo['dataset:ThermodynamicsTherGasLine1'][this.identifier];
		const cntid1a = this.annoinfo['dataset:ThermodynamicsTherGasLine1a'][this.identifier];
		const cntid2 = this.annoinfo['dataset:ThermodynamicsTherGasLine2'][this.identifier];
		const cntid3 = this.annoinfo['dataset:ThermodynamicsTherGasLine3'][this.identifier];
		const orderid = this.annoinfo['dataset:IntegerOrder'][this.identifier];
		thermo[orderid] = this.block[orderid];
		const lineS = block.split('\n');
		if (lineS.length == 3) {
			thermo[cntid1] = lineS[0];
			thermo[cntid1a] = '';
			thermo[cntid2] = lineS[1];
			thermo[cntid3] = lineS[2];
		} else if (lineS.length == 4) {
			thermo[cntid1] = lineS[0];
			thermo[cntid1a] = lineS[1];
			thermo[cntid2] = lineS[2];
			thermo[cntid3] = lineS[3];

		} else {
			alert('must have 3 or 4 lines');
		}
	}
}
