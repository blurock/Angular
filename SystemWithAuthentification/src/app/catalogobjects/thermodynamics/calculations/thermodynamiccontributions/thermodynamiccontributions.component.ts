import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { ViewcatalogandsavetolocalfileComponent } from '../../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { FetchcatalogobjectComponent } from '../../../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { GeneralcatalogobjectvisualizationComponent } from '../../../generalcatalogobjectvisualization/generalcatalogobjectvisualization.component';
@Component({
	selector: 'app-thermodynamiccontributions',
	templateUrl: './thermodynamiccontributions.component.html',
	styleUrls: ['./thermodynamiccontributions.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class ThermodynamiccontributionsComponent implements OnInit {
	nodata = 'No Computation Data';
	noannotations = 'Initializing';
	subtitle = 'Thermodynamic Contributions';
	displaydescbutton = 'Display current Thermodynamic Contribution';
	filedefault = 'ThermodynamicContributions';
	togglevis = 'Show Units';
	toggleviscatalog = 'Show Catalog Object';
	viscatalog = 'Contribution Source';
	togglevisdescr = 'Toggle the visualization of the units';
	viscatalogdescr = 'Show the original catalog object of the contribution';
	loadfromfile: string;
	displaybutton: string;
	fetchobjectbutton: string;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	molarenthalpyparameter = 'dataset:ParameterSpecificationEnthaply';
	molarentropyarameter = 'dataset:ParameterSpecificationEntropy';
	molarheatcapacityparameter = 'dataset:ParameterSpecificationHeatCapacity';
	molarenthalpy: any;
	molarentropy: any;
	molarheatcapacity: any;


	unitsvisible = false;
	catalogvisible = false;

	dataSource: any;
	columnsToDisplay: any;
	columnsToDisplayWithExpand: any;
	maintainer: string;
	annoinfo: any;
	thermocontribution: any;
	enthalpyspec: any;
	entropyspec: any;
	heatcapacityspec: any;

	catalogtype = 'dataset:ThermodynamicContributions';

	expandedElement: any | null;

	@ViewChild('catalogobj') catalogobj: GeneralcatalogobjectvisualizationComponent;

	constructor(
		public annotations: OntologycatalogService,
		manageuser: ManageuserserviceService,
		public interfaceconst: UserinterfaceconstantsService,
		public dialog: MatDialog
	) {

		this.displaybutton = this.interfaceconst.displaybutton;
		this.loadfromfile = this.interfaceconst.loadfromfile;
		this.fetchobjectbutton = this.interfaceconst.fetchobjectbutton;

		this.getAnnotations();
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.determineMaintainer);
			}
		});

		this.columnsToDisplay = ['name', 'Enthalpy', 'Entropy'];
		this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

		const set = [];
		set.push(this.molarenthalpyparameter);
		set.push(this.molarentropyarameter);
		set.push(this.molarheatcapacityparameter);
		annotations.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.molarenthalpy = data[this.molarenthalpyparameter];
				this.molarentropy = data[this.molarentropyarameter];
				this.molarheatcapacity = data[this.molarheatcapacityparameter];
			}
		});

		this.dataSource = [
			{
				name: 'row 1',
				Enthalpy: '0.0',
				Entropy: ' 0.0'
			},
			{
				name: 'row 2',
				Enthalpy: '0.0',
				Entropy: ' 0.0'
			}
		];

	}
	ngOnInit(): void {
	}

	setData(contributions: any) {
		let dataset = [];
		let first = true;
		for (let contribution of contributions) {
			const data = {};
			data['name'] = contribution['dcterms:title'];
			const enth = Number(contribution['dataset:stdenthalpy']['dataset:ValueAsString']).toFixed(3);
			data['Enthalpy'] = String(enth);
			const entr = Number(contribution['dataset:stdentropy']['dataset:ValueAsString']).toFixed(3);
			data['Entropy'] = String(entr);
			data['source'] = contribution['dataset:2dthermoentity'];
			const bensoncps = contribution[this.annoinfo['dataset:ThermodynamicCpAtTemperature'][this.identifier]];
			for(let cpt of bensoncps){
				const temp = Number(cpt['dataset:thermotemperature']).toFixed(2);
				const tempS = String(temp);
				const cp = Number(cpt['dataset:heatcapacityvalue']).toFixed(3);
				data[temp] = cp;
			};
			dataset.push(data);
			if (first) {
				const enthalpy = contribution['dataset:stdenthalpy'];
				this.enthalpyspec = enthalpy['qb:ComponentSpecification'];
				const entropy = contribution['dataset:stdentropy'];
				this.entropyspec = entropy['qb:ComponentSpecification']
				this.heatcapacityspec = contribution['dataset:paramspecheatcapacity'];
				first = false;
		this.columnsToDisplay = ['name', 'Enthalpy', 'Entropy'];
			for(let cpt of bensoncps){
				const temp = Number(cpt['dataset:thermotemperature']).toFixed(2);
				const tempS = String(temp);
				this.columnsToDisplay.push(tempS);
			};
				
			}
		}
		this.dataSource = dataset;
		this.thermocontribution = contributions;
		this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
	}
	valueInParameter(value: any): string {
		return value['dataset:ValueAsString'];
	}
	toggleUnitVisible(): void {
		if (this.unitsvisible) {
			this.unitsvisible = false;
			this.togglevis = 'Show Units';
		} else {
			this.unitsvisible = true;
			this.togglevis = 'Hide Units';
		}
	}
	toggleCatalogVisible(): void {
		if (this.catalogvisible) {
			this.catalogvisible = false;
			this.toggleviscatalog = 'Show Catalog Object';
		} else {
			this.catalogvisible = true;
			this.toggleviscatalog = 'Hide Catalog Object';
		}
	}

	catalogVisible(element: any): void {
			this.catalogvisible = true;
			this.toggleviscatalog = 'Hide Catalog Object';        
		this.catalogobj.setData(element['source']);
	}

	getAnnotations() {
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
				} else {
					alert(this.interfaceconst.getannotationsfnotsuccessful);
				}
			},
			error: (info: any) => { alert(this.interfaceconst.getannotationsfnotsuccessful + '\n' + info); }
		});

	}


	fetchInformation(): void {
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: false, catalogtype: this.catalogtype }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				if (success == 'true') {
					const contributionset = result['dataset:simpcatobj'];
					this.setData(contributionset);
				} else {
					alert(this.interfaceconst.fetchInformationfailed);
				}
			} else {
				alert(this.interfaceconst.fetchInformationCanceled);
			}

		});


	}
	displayCatalogInfo(): void {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			filename: this.filedefault,
			dataimage: this.thermocontribution
		};

		const myDialogRef = this.dialog.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
			if (result != null) {
			}
		});
	}

}