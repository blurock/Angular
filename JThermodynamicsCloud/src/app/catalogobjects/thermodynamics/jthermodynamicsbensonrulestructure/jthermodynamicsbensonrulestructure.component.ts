import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ontologyconstants } from 'systemconstants';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';

@Component({
  selector: 'app-jthermodynamicsbensonrulestructure',
  standalone: true,
  imports: [
	MatCardModule,
	MatInputModule,
	MatGridListModule,
	ReactiveFormsModule,
	MatFormFieldModule,
	MatIconModule,
	FormsModule,
	NgIf,NgFor
  ],
  templateUrl: './jthermodynamicsbensonrulestructure.component.html',
  styleUrls: ['./jthermodynamicsbensonrulestructure.component.scss']
})
export class JthermodynamicsbensonrulestructureComponent implements AfterViewInit {

	@Input() annoinfo: any;

	addatomcount = 'Add Connecting Atom';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	title = 'Benson Atom Structure Data';
	countform: UntypedFormGroup = new UntypedFormGroup({});
	

	constructor(
		private formBuilder: UntypedFormBuilder
	) {
		this.countform = this.formBuilder.group({
			BensonRuleDatabaseReference: ['', Validators.required],
			JThermodynamicsBensonCenterAtom: ['', Validators.required],
			atomcounts: this.formBuilder.array([])
		});

	}



	ngAfterViewInit(): void {

	}

	getData(counts: any) {
		counts[this.annoinfo['dataset:BensonRuleDatabaseReference'][this.identifier]] = this.countform.get('BensonRuleDatabaseReference')!.value;
		counts[this.annoinfo['dataset:JThermodynamicsBensonCenterAtom'][this.identifier]] = this.countform.get('JThermodynamicsBensonCenterAtom')!.value;
		const countarray: Record<string, any>[] = [];
		counts[this.annoinfo['dataset:JThermodynamicsBensonConnectionWithMultiplicity'][this.identifier]] = countarray;
		for (const atomcount of this.atomcounts.controls) {
			const countelement: Record<string, any> = {};
			countelement[Ontologyconstants.dctermsidentifier] = this.annoinfo['dataset:JThermodynamicsBensonConnectionWithMultiplicity'][this.identifier];
			countelement[this.annoinfo['dataset:JThermodynamicsBensonConnectingAtom'][this.identifier]] = atomcount.get('JThermodynamicsBensonConnectingAtom')!.value;
			countelement[this.annoinfo['dataset:ThermodynamicBensonMultiplicity'][this.identifier]] = atomcount.get('ThermodynamicBensonMultiplicity')!.value;
			countarray.push(countelement);
		}
	}
	
	setData(counts:any) {
    this.countform.get('BensonRuleDatabaseReference')!.setValue(counts[this.annoinfo['dataset:BensonRuleDatabaseReference'][this.identifier]]);
    this.countform.get('JThermodynamicsBensonCenterAtom')!.setValue(counts[this.annoinfo['dataset:JThermodynamicsBensonCenterAtom'][this.identifier]]);
    this.setAtomCountData(counts[this.annoinfo['dataset:JThermodynamicsBensonConnectionWithMultiplicity'][this.identifier]]);
	
	
  }

	setAtomCountData(atomcounts: []): void {
		for (const count of atomcounts) {
			const countform = this.newAtomCount();
			countform.get('JThermodynamicsBensonConnectingAtom')!.setValue(count[this.annoinfo['dataset:JThermodynamicsBensonConnectingAtom'][this.identifier]]);
			countform.get('ThermodynamicBensonMultiplicity')!.setValue(count[this.annoinfo['dataset:ThermodynamicBensonMultiplicity'][this.identifier]]);
			this.atomcounts.push(countform);
		}
	}

	get atomcounts() {
		return this.countform.controls["atomcounts"] as UntypedFormArray;
	}

	newAtomCount(): UntypedFormGroup {
		return this.formBuilder.group({
			JThermodynamicsBensonConnectingAtom: ['', Validators.required],
			ThermodynamicBensonMultiplicity: ['', Validators.required],
		});
	}
	addAtomCount(): void {
		const countform = this.newAtomCount();
		this.atomcounts.push(countform);
	}

	deleteAtomCount(countIndex: number): void {
		this.atomcounts.removeAt(countIndex);
	}

}
