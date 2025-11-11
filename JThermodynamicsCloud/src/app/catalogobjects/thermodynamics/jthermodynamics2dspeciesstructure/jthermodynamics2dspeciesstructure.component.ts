import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { JthermodynamicsatomcountsetComponent } from '../jthermodynamicsatomcountset/jthermodynamicsatomcountset.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
	selector: 'app-jthermodynamics2dspeciesstructure',
	templateUrl: './jthermodynamics2dspeciesstructure.component.html',
	styleUrls: ['./jthermodynamics2dspeciesstructure.component.scss'],
	standalone: true,
	imports: [
		JthermodynamicsatomcountsetComponent,
		MatCardModule, 
		MatFormFieldModule, 
		MatInputModule, 
		ReactiveFormsModule, 
		NgIf, 
		MatGridListModule
	]
})
export class Jthermodynamics2dspeciesstructureComponent implements OnInit {

	@Input() annoinfo: any;

	title = '2D Species Structure';

	objectform: UntypedFormGroup;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	@ViewChild('counts') counts!: JthermodynamicsatomcountsetComponent;

	constructor(
		private formBuilder: UntypedFormBuilder
	) {
		this.objectform = this.formBuilder.group({
			JThermodynamicsStructureAsCMLString: ['', Validators.required],
			JThermodynamicsStructureIsomerName: ['', Validators.required],
			JThermodynamicsStructureName: ['', Validators.required]
		});

	}

	ngOnInit(): void {
	}

	getData(structure: any): void {
		structure[Ontologyconstants.dctermsidentifier] = this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier];
		structure[this.annoinfo['dataset:JThermodynamicsStructureAsCMLString'][this.identifier]] = this.objectform.get('JThermodynamicsStructureAsCMLString')?.value ?? '';
		structure[this.annoinfo['dataset:JThermodynamicsStructureIsomerName'][this.identifier]] = this.objectform.get('JThermodynamicsStructureIsomerName')?.value ?? '';
		structure[this.annoinfo['dataset:JThermodynamicsStructureName'][this.identifier]] = this.objectform.get('JThermodynamicsStructureName')?.value ?? '';
		const structurecounts = {};
		structure[this.annoinfo['dataset:JThermodynamicsAtomCountSet'][this.identifier]] = structurecounts;
		this.counts.getData(structurecounts);
	}
	
	setData(structure: any): void {
		const cmlstring = structure[this.annoinfo['dataset:JThermodynamicsStructureAsCMLString'][this.identifier]];
		this.objectform.get('JThermodynamicsStructureAsCMLString')!.setValue(cmlstring);
		
		const name = structure[this.annoinfo['dataset:JThermodynamicsStructureIsomerName'][this.identifier]];
		this.objectform.get('JThermodynamicsStructureIsomerName')!.setValue(name);
		
		const structurename = structure[this.annoinfo['dataset:JThermodynamicsStructureName'][this.identifier]];
		this.objectform.get('JThermodynamicsStructureName')!.setValue(structurename);
		
        const structurecounts = structure[this.annoinfo['dataset:JThermodynamicsAtomCountSet'][this.identifier]]
        this.counts.setData(structurecounts);
	}

}
