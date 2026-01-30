import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CatalogactivitybaseComponent } from '../../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { UserinterfaceconstantsService } from '../../../../../const/userinterfaceconstants.service';
import { OntologycatalogService } from '../../../../../services/ontologycatalog.service';
import { ActivityinformationinterpretthermodynamicblockComponent } from '../activityinformationinterpretthermodynamicblock.component';
import { CommonModule } from '@angular/common';
import { Ontologyconstants } from 'systemconstants';

@Component({
	selector: 'app-activityinformationinterpretbensonruledata',
	standalone: true,
	imports: [
		CommonModule,
		ActivityinformationinterpretthermodynamicblockComponent
	],
	templateUrl: './activityinformationinterpretbensonruledata.component.html',
	styleUrl: './activityinformationinterpretbensonruledata.component.scss'
})
export class ActivityinformationinterpretbensonruledataComponent extends CatalogactivitybaseComponent implements AfterViewInit {

	@ViewChild('thermo') thermo!: ActivityinformationinterpretthermodynamicblockComponent;

	constructor(
		private cd: ChangeDetectorRef,
		constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService) {
		super(constants, annotations, cd);

		this.catalogtype = 'dataset:ActivityInformationInterpretBensonRuleData';
		this.getCatalogAnnoations();
	}

	ngAfterViewInit(): void {
		this.cd.detectChanges();
		if (this.catalog) {
			this.setData(this.catalog);
		}
		if (this.prerequisite) {
			this.setPrerequisiteData(this.prerequisite);
		}
	}
	override annotationsFound(response: any): void {
		super.annotationsFound(response);
		const catalog = response[Ontologyconstants.catalogobject];
		const anno = catalog[Ontologyconstants.annotations];
		this.thermo.annoinfo = anno;
		
		if (Object.keys(this.catalog).length > 0) {
			this.setData(this.catalog);
		}
		if (this.prerequisite) {
			this.setPrerequisiteData(this.prerequisite);
		}

	}

	override setPrerequisiteData(prerequisite: any): void {
		
		super.setPrerequisiteData(prerequisite);
		if (this.thermo) {
			this.thermo.setPrerequisiteData(prerequisite);
		} else {
			console.log("thermo not set " + this.activitySet() + "  " + this.thermo);
		}
	}

	override setData(p: any): void {
		super.setData(p);
		if (this.activitySet() && this.thermo) {
			this.thermo.setData(this.catalog);
		} else {
			console.log("thermo not set " + this.activitySet() + "  " + this.thermo);
		}
	}
	override getData(prerequisite: any): void {
		super.getData(prerequisite);
		
		if (this.thermo) {
			this.thermo.getData(prerequisite);
		}
	}

}
