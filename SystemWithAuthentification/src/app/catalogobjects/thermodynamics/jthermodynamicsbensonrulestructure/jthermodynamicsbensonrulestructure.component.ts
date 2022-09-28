import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Ontologyconstants } from '../../../const/ontologyconstants';

@Component({
  selector: 'app-jthermodynamicsbensonrulestructure',
  templateUrl: './jthermodynamicsbensonrulestructure.component.html',
  styleUrls: ['./jthermodynamicsbensonrulestructure.component.scss']
})
export class JthermodynamicsbensonrulestructureComponent implements OnInit {

	@Input() annoinfo: any;

	countform = this.formBuilder.group({
		BensonRuleDatabaseReference: ['', Validators.required],
		JThermodynamicsBensonCenterAtom: ['', Validators.required],
		atomcounts: this.formBuilder.array([])
	});

	addatomcount = 'Add Connecting Atom';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	title = 'Benson Atom Structure Data';


	constructor(
		private formBuilder: FormBuilder
	) {
	}



	ngOnInit(): void {

	}

	getData(counts: any) {
		counts[this.annoinfo['dataset:BensonRuleDatabaseReference'][this.identifier]] = this.countform.get('BensonRuleDatabaseReference').value;
		counts[this.annoinfo['dataset:JThermodynamicsBensonCenterAtom'][this.identifier]] = this.countform.get('JThermodynamicsBensonCenterAtom').value;
		const countarray = [];
		counts[this.annoinfo['dataset:JThermodynamicsBensonConnectionWithMultiplicity'][this.identifier]] = countarray;
		for (const atomcount of this.atomcounts.controls) {
			const countelement = {};
			countelement[this.annoinfo['dataset:JThermodynamicsBensonConnectingAtom'][this.identifier]] = atomcount.get('JThermodynamicsBensonConnectingAtom').value;
			countelement[this.annoinfo['dataset:ThermodynamicBensonMultiplicity'][this.identifier]] = atomcount.get('ThermodynamicBensonMultiplicity').value;
			countarray.push(countelement);
		}
	}
	
	setData(counts:any) {
    this.countform.get('BensonRuleDatabaseReference').setValue(counts[this.annoinfo['dataset:BensonRuleDatabaseReference'][this.identifier]]);
    this.countform.get('JThermodynamicsBensonCenterAtom').setValue(counts[this.annoinfo['dataset:JThermodynamicsBensonCenterAtom'][this.identifier]]);
    this.setAtomCountData(counts[this.annoinfo['dataset:JThermodynamicsBensonConnectionWithMultiplicity'][this.identifier]])
  }

	setAtomCountData(atomcounts: []): void {
		for (const count of atomcounts) {
			const countform = this.newAtomCount();
			countform.get('JThermodynamicsBensonConnectingAtom').setValue(count[this.annoinfo['dataset:JThermodynamicsBensonConnectingAtom'][this.identifier]]);
			countform.get('ThermodynamicBensonMultiplicity').setValue(count[this.annoinfo['dataset:ThermodynamicBensonMultiplicity'][this.identifier]]);
			this.atomcounts.push(countform);
		}
	}

	get atomcounts() {
		return this.countform.controls["atomcounts"] as FormArray;
	}

	newAtomCount(): FormGroup {
		return this.formBuilder.group({
			JThermodynamicsBensonConnectingAtom: ['', Validators.required],
			ThermodynamicBensonMultiplicity: ['', Validators.required],
		});
	}
	addAtomCount(): void {
		const countform = this.newAtomCount();
		this.atomcounts.push(countform);
	}

	deleteAtomCount(countIndex): void {
		this.atomcounts.removeAt(countIndex);
	}

}
