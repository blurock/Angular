import { Component, Input,OnInit, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import {FormsModule,FormBuilder,FormGroup,Validators,FormArray} from '@angular/forms';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MenutreeserviceService} from '../../../services/menutreeservice.service';
import {NavItem} from '../../../primitives/nav-item';
@Component({
  selector: 'app-setofcontactinfodata',
  standalone: true,
  imports: [MenuItemComponent,ReactiveFormsModule,CommonModule,
  MatGridListModule,MatMenuModule,MatInputModule,MenuItemComponent,
  MatFormFieldModule,FormsModule,
  MatCardModule, MatIconModule],
  templateUrl: './setofcontactinfodata.component.html',
  styleUrl: './setofcontactinfodata.component.scss'
})

export class SetofcontactinfodataComponent implements OnInit {
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	items: NavItem[] = [];
	infotype = 'dataset:ContactType';
	userContactDataInfo: FormGroup;
	form: FormGroup;
	contacts: any;

	@Input() anno: any;
	
	constructor(private menusetup: MenutreeserviceService,
	private formBuilder: FormBuilder
		) {
			this.userContactDataInfo = this.newcontactdatainfo();
			this.form = this.newcontactdatainfo();
			
		 }
	ngOnChanges(changes: SimpleChanges) {
		if (changes['anno'] && changes['anno'].currentValue) {
			this.items = this.menusetup.findChoices(this.anno, this.infotype);
		}
	}

	ngOnInit(): void {
		
		}
	
	get contactdatainfoset() {
		return this.form.get('contactdatainfoset') as FormArray;
	}
	
	newcontactdatainfo(): FormGroup {
		return this.formBuilder.group({
			contactdatainfoset: this.formBuilder.array([]),
		});
	}
	
	newContactInfo(): FormGroup {
		return this.formBuilder.group({
			ContactType: ['',Validators.required],
			ContactKey: ['', Validators.required]
		});
	}

	addContactInfo() {
		this.contactdatainfoset.push(this.newContactInfo());
		//this.cdRef.detectChanges();
	}

	removeContactInfo(i: number) {
		this.contactdatainfoset.removeAt(i);
	}
	setContactType(event: String,index: number): void {
		const group = this.contactdatainfoset.at(index) as FormGroup;
		group.get('ContactType')!.setValue(event);
	}
	getData(catalog: any): void {
		let array: Record<any,unknown>[] = [];
		catalog[this.anno['dataset:ContactInfoData'][this.identifier]] = array;
		for (let i = 0; i < this.contactdatainfoset.length; i++) {
			const group = this.contactdatainfoset.at(i) as FormGroup;
			const element: Record<any,unknown> = {};
			element[this.anno['dataset:ContactType'][this.identifier]] = group.get('ContactType')!.value;
			element[this.anno['dataset:ContactKey'][this.identifier]] = group.get('ContactKey')!.value;
			array.push(element);
		}
	}
	setData(catalog: any): void {
		this.contacts = catalog;
		if(this.anno)
		{
			this.contactdatainfoset.clear();
			for (let i = 0; i < this.contacts.length; i++) {
				this.addContactInfo();
				const group = this.contactdatainfoset.at(i) as FormGroup;
				group.get('ContactType')!.setValue(this.contacts[i][this.anno['dataset:ContactType'][this.identifier]]);
				group.get('ContactKey')!.setValue(this.contacts[i][this.anno['dataset:ContactKey'][this.identifier]]);
		}
		}
		}
}
