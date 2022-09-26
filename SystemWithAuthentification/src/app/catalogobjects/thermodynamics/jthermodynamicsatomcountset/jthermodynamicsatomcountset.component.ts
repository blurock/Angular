import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Ontologyconstants } from '../../../const/ontologyconstants';

@Component({
	selector: 'app-jthermodynamicsatomcountset',
	templateUrl: './jthermodynamicsatomcountset.component.html',
	styleUrls: ['./jthermodynamicsatomcountset.component.scss']
})
export class JthermodynamicsatomcountsetComponent implements OnInit {

	@Input() annoinfo: any;

	countform = this.formBuilder.group({
		CarbonAtomCount: ['', Validators.required],
		HydrogenAtomCount: ['', Validators.required],
		OxygenAtomCount: ['', Validators.required],
		atomcounts: this.formBuilder.array([])
	});

	addatomcount = 'Add Atom Count';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	title = 'Atom Counts';


	constructor(
		private formBuilder: FormBuilder
	) {
	}



	ngOnInit(): void {

	}

	getData(counts: any) {
		counts[this.annoinfo['dataset:CarbonAtomCount'][this.identifier]] = this.countform.get('CarbonAtomCount').value;
		counts[this.annoinfo['dataset:HydrogenAtomCount'][this.identifier]] = this.countform.get('HydrogenAtomCount').value;
		counts[this.annoinfo['dataset:OxygenAtomCount'][this.identifier]] = this.countform.get('OxygenAtomCount').value;
		const countarray = [];
		counts[this.annoinfo['dataset:JThermodynamicsAtomCount'][this.identifier]] = countarray;
		for (const atomcount of this.atomcounts.controls) {
			const countelement = {};
			countelement[this.annoinfo['dataset:AtomTypeCount'][this.identifier]] = atomcount.get('AtomTypeCount').value;
			countelement[this.annoinfo['dataset:JThermodynamics2DSpeciesLabel'][this.identifier]] = atomcount.get('JThermodynamics2DSpeciesLabel').value;
			countarray.push(countelement);
		}
	}
	
	setData(counts:any) {
    this.countform.get('CarbonAtomCount').setValue(counts[this.annoinfo['dataset:CarbonAtomCount'][this.identifier]]);
    this.countform.get('HydrogenAtomCount').setValue(counts[this.annoinfo['dataset:HydrogenAtomCount'][this.identifier]]);
    this.countform.get('OxygenAtomCount').setValue(counts[this.annoinfo['dataset:OxygenAtomCount'][this.identifier]]);
    this.setAtomCountData(counts[this.annoinfo['dataset:OxygenAtomCount'][this.identifier]])
  }

	setAtomCountData(atomcounts: []): void {
		for (const count of atomcounts) {
			const countform = this.newAtomCount();
			countform.get('AtomTypeCount').setValue(count[this.annoinfo['dataset:AtomTypeCount'][this.identifier]]);
			countform.get('JThermodynamics2DSpeciesLabel').setValue(count[this.annoinfo['dataset:JThermodynamics2DSpeciesLabel'][this.identifier]]);
			this.atomcounts.push(countform);
		}
	}

	get atomcounts() {
		return this.countform.controls["atomcounts"] as FormArray;
	}

	newAtomCount(): FormGroup {
		return this.formBuilder.group({
			AtomTypeCount: ['', Validators.required],
			JThermodynamics2DSpeciesLabel: ['', Validators.required],
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
