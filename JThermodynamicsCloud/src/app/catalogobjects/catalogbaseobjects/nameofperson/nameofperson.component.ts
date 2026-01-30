import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Ontologyconstants } from 'systemconstants';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

@Component({
	selector: 'app-nameofperson',
	templateUrl: './nameofperson.component.html',
	styleUrls: ['./nameofperson.component.scss'],
	standalone: true,
	imports: [MatCardModule, MatGridListModule, MatFormFieldModule, MenuItemComponent, CommonModule, MatInputModule,
		ReactiveFormsModule, MatMenuTrigger, MatMenuModule]
})
export class NameofpersonComponent implements OnInit, OnChanges {

	@Input() annoinfo: any;
	@Output() namedatachange = new EventEmitter<any>();

	nameGroup: FormGroup;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	usertitle = 'dataset:UserTitle';
	usertitleitems: NavItem[] = [];
	nameofperson: any | null = null;

	constructor(
		private formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService
	) {
		this.nameGroup = this.formBuilder.group({
			familyName: ['', Validators.required],
			givenName: ['', Validators.required],
			UserTitle: ['', Validators.required],
		});

	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['annoinfo'] && changes['annoinfo'].currentValue) { // Check if annoinfo has a value
			this.usertitleitems = this.menusetup.findChoices(this.annoinfo, this.usertitle);
			if (this.nameofperson) {
				this.setData(this.nameofperson);
			}
		}
	}

	ngOnInit(): void {
	}

	setUserTitle($event: String): void {
		this.nameGroup.get('UserTitle')!.setValue($event);
	}


	setData(name: any): void {
		this.nameofperson = name;
		if (this.annoinfo) {
			this.nameGroup.get('familyName')!.setValue(name[this.annoinfo['dataset:familyName'][this.identifier]]);
			this.nameGroup.get('givenName')!.setValue(name[this.annoinfo['dataset:givenName'][this.identifier]]);
			this.nameGroup.get('UserTitle')!.setValue(name[this.annoinfo['dataset:UserTitle'][this.identifier]]);
		}
	}

	getData(nameofperson: any): void {
		nameofperson[this.annoinfo['dataset:familyName'][this.identifier]] = this.nameGroup.get('familyName')!.value;
		nameofperson[this.annoinfo['dataset:givenName'][this.identifier]] = this.nameGroup.get('givenName')!.value;
		nameofperson[this.annoinfo['dataset:UserTitle'][this.identifier]] = this.nameGroup.get('UserTitle')!.value;
	}
}
