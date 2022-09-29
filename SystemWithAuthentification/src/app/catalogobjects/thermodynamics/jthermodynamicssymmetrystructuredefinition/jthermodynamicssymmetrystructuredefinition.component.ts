import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';

@Component({
	selector: 'app-jthermodynamicssymmetrystructuredefinition',
	templateUrl: './jthermodynamicssymmetrystructuredefinition.component.html',
	styleUrls: ['./jthermodynamicssymmetrystructuredefinition.component.scss']
})
export class JthermodynamicssymmetrystructuredefinitionComponent implements OnInit {


	title = 'Symmetry Structure Information';
	addsymmelement = 'Add Symmetry Element';

	message = 'Still loading';
	annoinfo: any;
	catalogobj: any;
	display = false;
	specdisplay = false;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	symmtypeitems: NavItem[];
	nodetypeitems: NavItem[];
	symmtypeloc = 'dataset:StructureSymmetryType';
	nodetypeloc = 'dataset:JThermodynamicsSymmetryDefinitionNodeType';


	objectform = this.formBuilder.group({
		JThermodynamicSymmetryDefinitionLabel: ['', Validators.required],
		StructureSymmetryType: ['', Validators.required],
		SymmetryFactorOfStructure: ['', Validators.required],
		symmelements: this.formBuilder.array([])
	});

	@Output() annoReady = new EventEmitter<any>();

	catalogtype = 'dataset:JThermodynamicsSymmetryStructureDefinition';

	@ViewChild('base') base: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('structure') structure: Jthermodynamics2dspeciesstructureComponent;

	constructor(
		public annotations: OntologycatalogService,
		private formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService

	) {
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.symmtypeitems = this.menusetup.findChoices(this.annoinfo, this.symmtypeloc);
					this.nodetypeitems = this.menusetup.findChoices(this.annoinfo, this.nodetypeloc);
					this.display = true;
					this.annoReady.emit(this.annoinfo);
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}

	get symmelements() {
		return this.objectform.controls["symmelements"] as FormArray;
	}
	newSymmElement(): FormGroup {
		return this.formBuilder.group({
			JThermodynamicsSymmetryDefinitionNodeLabel: ['', Validators.required],
			JThermodynamicsSymmetryDefinitionNodeType: ['', Validators.required],
			JThermodynamicsSymmetryDefinitionSubGroupLabel: ['', Validators.required]
		});
	}
	addSymmElement(): void {
		const countform = this.newSymmElement();
		this.symmelements.push(countform);
	}

	deleteAtomCount(countIndex): void {
		this.symmelements.removeAt(countIndex);
	}


	getData(catalog: any): void {
		const symm = {};
		const id11 = this.annoinfo['dataset:JThermodynamicSymmetryDefinitionLabel'][this.identifier];
		symm[id11] = this.objectform.get('JThermodynamicSymmetryDefinitionLabel').value;
		const id12 = this.annoinfo['dataset:StructureSymmetryType'][this.identifier];
		symm[id12] = this.objectform.get('StructureSymmetryType').value;
		const id13 = this.annoinfo['dataset:SymmetryFactorOfStructure'][this.identifier];
		symm[id13] = this.objectform.get('SymmetryFactorOfStructure').value;

		const id7 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinition'][this.identifier];
		catalog[id7] = symm;

		const symmarray = [];
		symm[this.annoinfo['dataset:JThermodynamicsSymmetryNodeGroupDefinition'][this.identifier]] = symmarray;
		for (const eleform of this.symmelements.controls) {
			const element = {};
			const id2 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionNodeLabel'][this.identifier];
			element[id2] = eleform.get('JThermodynamicsSymmetryDefinitionNodeLabel').value;
			const id3 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionNodeType'][this.identifier];
			element[id3] = eleform.get('JThermodynamicsSymmetryDefinitionNodeType').value;
			const id4 = this.annoinfo['dataset:JThermodynamicsSymmetryDefinitionSubGroupLabel'][this.identifier];
			element[id4] = eleform.get('JThermodynamicsSymmetryDefinitionSubGroupLabel').value;
			symmarray.push(element);
		}

		this.base.getData(catalog);
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}

	setData(catalog: any): void {
		const id7 = this.annoinfo['dataset:JThermodynamicsMetaAtomInfo'][this.identifier];
		const symm = catalog[id7];
		const id1 = this.annoinfo['JThermodynamicSymmetryDefinitionLabel'][this.identifier];
		this.objectform.get('JThermodynamicSymmetryDefinitionLabel').setValue(symm[id1]);
		const id2 = this.annoinfo['dataset:StructureSymmetryType'][this.identifier];
		this.objectform.get('StructureSymmetryType').setValue(symm[id2]);
		const id3 = this.annoinfo['dataset:SymmetryFactorOfStructure'][this.identifier];
		this.objectform.get('SymmetryFactorOfStructure').setValue(symm[id3]);

		this.base.setData(catalog);
		const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
	}

	setSymmType($event: string): void {
		this.objectform.get('StructureSymmetryType').setValue($event);
	}
	setNodeType(countIndex, $event: string): void {
    alert(this.symmelements.length);
    alert(countIndex);
    alert($event);
    const eleform = this.symmelements.controls[countIndex];
    //alert(eleform.get('JThermodynamicsSymmetryDefinitionNodeType'));
		eleform.get('JThermodynamicsSymmetryDefinitionNodeType').setValue($event);
		alert("done");
	}

}
