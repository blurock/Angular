import { Component, OnInit, AfterViewInit, ViewContainerRef, ComponentRef, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionobjectheaderComponent } from '../transactionobjectheader/transactionobjectheader.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CatalogactivitybaseComponent } from '../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { ComponentType } from '@angular/cdk/portal';
import { ActivityrepositoryinitialreadlocalfileComponent } from '../../activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';
import { ActivityrepositorypartitiontocatalogComponent } from '../../activity/repository/activityrepositorypartitiontocatalog/activityrepositorypartitiontocatalog.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionresultheaderComponent } from '../transactionresultheader/transactionresultheader.component';
import { TransactioneventobjectComponent } from '../transactioneventobject/transactioneventobject.component';
import { ActivityinformationinterpretbensonruledataComponent } from '../../activity/repository/activityinformationinterpretthermodynamicblock/activityinformationinterpretbensonruledata/activityinformationinterpretbensonruledata.component';
import { ActivityinformationinterpretsubstructurethermodynamicsComponent } from '../../activity/repository/activityinformationinterpretthermodynamicblock/activityinformationinterpretsubstructurethermodynamics/activityinformationinterpretsubstructurethermodynamics.component';
import { ActivityinformationmolecularthermodynamicsComponent } from '../../activity/repository/activityinformationinterpretthermodynamicblock/activityinformationmolecularthermodynamics/activityinformationmolecularthermodynamics.component';
import { ActivityinformationinterpretdisassociationenergyComponent } from '../../activity/repository/activityinformationinterpretdisassociationenergy/activityinformationinterpretdisassociationenergy.component';
import { ActivityinformationinterpretmetaatomComponent } from '../../activity/repository/activityinformationinterpretmetaatom/activityinformationinterpretmetaatom.component';
import { ActivityinformationinterpretsymmetryinformationComponent } from '../../activity/repository/activityinformationinterpretsymmetryinformation/activityinformationinterpretsymmetryinformation.component';
import { ActivityinformationinterpretvibrationalmodeComponent } from '../../activity/repository/activityinformationinterpretvibrationalmode/activityinformationinterpretvibrationalmode.component';

@Component({
	selector: 'app-managedatasettransactioneventobject',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		ReactiveFormsModule,
		MatGridListModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatDividerModule,
		TransactionobjectheaderComponent,
		TransactionresultheaderComponent,
		TransactioneventobjectComponent
	],
	templateUrl: './managedatasettransactioneventobject.component.html',
	styleUrls: ['./managedatasettransactioneventobject.component.scss']
})
export class ManagedatasettransactioneventobjectComponent implements OnInit, AfterViewInit {

	readinfailed = 'Read of staging information failed (problem with server)';
	title = 'Transaction Event';

	displaydescbutton = 'Display Partition as JSON';
	displaybutton = 'Display';
	savedescr = 'Save to database';
	savebutton = 'Save';
	loadfromdatabase = 'Fetch transition from database';
	fetch = 'Database';
	safeHtml: SafeHtml = '';

	annoinfo: any;
	maintainer: any;
	activity: any;

	activityannoinfo: any;
	parseprerequisitetype: string = '';
	activityfileroot = '';
	parsefiletitle = '';

	showTransaction: boolean = true;
	showActivity: boolean = true;

	activitytype: string = '';
	@Input() transaction: string = '';
	@Input() prerequisiteid: string = '';
	@Input() prerequisitetype?: string;
	@Input() setPrerequisiteData?: (prerequisite: any) => void;
	@Output() transactionSuccess = new EventEmitter<any>();
	@Output() annoReady = new EventEmitter<void>();

	@Input() transactiontitle: string = 'Transaction';
	@Input() activitytitle: string = 'Activity';

	@ViewChild('dynamicChild', { read: ViewContainerRef }) dynamicChild!: ViewContainerRef;
	@ViewChild('transactionevent') transactionevent?: TransactioneventobjectComponent;
	@ViewChild('infoheader') infoheader?: TransactionobjectheaderComponent;
	@ViewChild('outputContainer', { static: false }) outputContainer?: ElementRef;

	componentRef!: ComponentRef<CatalogactivitybaseComponent>;
	key = 'dataset:PartiionSetWithinRepositoryFile';
	componentMap: { [key: string]: ComponentType<any> } = {
		[Ontologyconstants.InitialReadInOfRepositoryFileActivity]: ActivityrepositoryinitialreadlocalfileComponent,
		[Ontologyconstants.PartiionSetWithinRepositoryFileActivity]: ActivityrepositorypartitiontocatalogComponent,
		[Ontologyconstants.ActivityInformationInterpretBensonRuleData]: ActivityinformationinterpretbensonruledataComponent,
		[Ontologyconstants.ActivityInformationInterpretSubstructureThermodynamics]: ActivityinformationinterpretsubstructurethermodynamicsComponent,
		[Ontologyconstants.ActivityInformationMolecularThermodynamics]: ActivityinformationmolecularthermodynamicsComponent,
		[Ontologyconstants.ActivityInformationInterpretDisassociationEnergy]: ActivityinformationinterpretdisassociationenergyComponent,
		[Ontologyconstants.ActivityInformationInterpretSymmetryInformation]: ActivityinformationinterpretsymmetryinformationComponent,
		[Ontologyconstants.ActivityInformationInterpretVibrationalMode]: ActivityinformationinterpretvibrationalmodeComponent,
		[Ontologyconstants.ActivityInformationInterpretMetaAtom]: ActivityinformationinterpretmetaatomComponent

	}
	constructor(
		constants: UserinterfaceconstantsService,
		private sanitizer: DomSanitizer,
		public dialog: MatDialog,
		manageuser: ManageuserserviceService
	) {

		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});

	}
	
	invalid(): boolean {
		var ans: boolean = true;
		if(this.componentRef) {
			
		if(this.componentRef.instance) {
			ans = this.componentRef.instance.invalid();
		}
		}
		return ans
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
	}

	setActivityType(activitytype: string) {
		this.activitytype = activitytype;
	}

	createComponent(activitytype: string) {
		this.activitytype = activitytype;
		if (this.activitytype) {
			const componentType = this.componentMap[this.activitytype];
			if (!this.componentRef) {
				this.componentRef = this.dynamicChild.createComponent(componentType);
				this.componentRef.instance.getCatalogAnnoations();
				this.componentRef.instance.annoReady.subscribe(() => {
					this.annoinfo = this.componentRef.instance.annoinfo;
					this.annoReady.emit();
				});
			}
		}
	}
	toggleActivityShow() {
		this.showActivity = !this.showActivity;
	}

	toggleTransactionShow() {
		this.showTransaction = !this.showTransaction;
	}


	setActivityData(catalog: any): void {
		this.activity = catalog;
		this.componentRef.instance.setData(catalog);
	}
	getActivityData(catalog: any): void {
		this.componentRef.instance.getData(catalog);
	}
	setActivityPrerequisiteData(prerequisite: any): void {
		if (this.setPrerequisiteData) {
			this.setPrerequisiteData(prerequisite);
		} else {
			console.log("setPrerequisiteData doesn't exist");
		}
		this.infoheader!.setPrerequisiteValue(prerequisite);
		this.componentRef.instance.setPrerequisiteData(prerequisite);
	}
	transactionEvent($event: any): void {
		this.transactionSuccess.emit($event);
		const transaction = $event[Ontologyconstants.TransactionEventObject];
		this.transactionevent?.setData(transaction);
		const resultHtml = $event[Ontologyconstants.message];
		this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(resultHtml);
	}
	setTransactionData(catalog: any): void {
		if (this.transactionevent) {
			this.transactionevent.setData(catalog);
		}
	}
	getTransactionData(catalog: any): void {
		if (this.transactionevent) {
			this.transactionevent.getData(catalog);
		}
	}
	transitionAnnoReady() {

	}
	responseOutput($event: SafeHtml) {
		this.safeHtml = $event;
	}
	scrollToBottom(): void {
		try {
			if (this.outputContainer) {
				this.outputContainer.nativeElement.scrollTop = this.outputContainer.nativeElement.scrollHeight;
			}
		} catch (err) { }
	}
}
