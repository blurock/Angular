import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-requiredtransactioninformation',
  standalone: true,
  imports: [  MatCardModule,
	 MatGridListModule, 
	 MatFormFieldModule, 
	 MatMenuModule, 
	 MatInputModule,
  	ReactiveFormsModule,
	NgIf,
	FormsModule,	
	FiresytorecatalogidComponent],
  templateUrl: './requiredtransactioninformation.component.html',
  styleUrl: './requiredtransactioninformation.component.scss'
})
export class RequiredtransactioninformationComponent {
	
	initializing: string = '---';
	form!: FormGroup;
	
	catalog!: any;
	rdfsidentifier = Ontologyconstants.dctermsidentifier;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	
	@Input() annoinfo: any;
	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;
	
	constructor(
		public constants: UserinterfaceconstantsService,
		public formBuilder: UntypedFormBuilder,
		public cdRef: ChangeDetectorRef
	) {
		this.initializing = this.constants.initializing;
		this.form = this.formBuilder.group({
				DescriptionTitleRequiredTransaction: [''],
				RequiredTransactionType: [''],
				RequiredTransactionKey: [''],
				RequiredTransactionID: ['']
			});	
	}
	
		
	setData(required: any): void {
		this.catalog = required;
		const fireid = this.annoinfo['dataset:RequiredTransactionIDAndType'][this.rdfsidentifier];
		this.firestoreid.setData(this.catalog[fireid]);
		
		this.form.patchValue({
			DescriptionTitleRequiredTransaction: this.catalog[this.annoinfo['dataset:DescriptionTitleRequiredTransaction'][this.rdfsidentifier]],
			RequiredTransactionType: this.catalog[this.annoinfo['dataset:RequiredTransactionType'][this.rdfsidentifier]],
			RequiredTransactionKey: this.catalog[this.annoinfo['dataset:RequiredTransactionKey'][this.rdfsidentifier]],
			RequiredTransactionID: this.catalog[this.annoinfo['dataset:RequiredTransactionID'][this.rdfsidentifier]]
		});
		this.cdRef.detectChanges();
	}
	
	getData(required: any): void {
		
	}

}
