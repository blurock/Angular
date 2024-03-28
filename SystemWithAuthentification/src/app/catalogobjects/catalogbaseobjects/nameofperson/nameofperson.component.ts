import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Ontologyconstants } from 'src/app/const/ontologyconstants';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';

@Component({
	selector: 'app-nameofperson',
	templateUrl: './nameofperson.component.html',
	styleUrls: ['./nameofperson.component.scss']
})
export class NameofpersonComponent implements OnInit {

	@Input() annoinfo: any;
	@Output() namedatachange = new EventEmitter<any>();

	nameGroup: UntypedFormGroup;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	usertitle = 'dataset:UserTitle';
	usertitleitems: NavItem[] = [];


	constructor(
    private formBuilder: UntypedFormBuilder,
		private menusetup: MenutreeserviceService
	) {
		this.nameGroup = this.formBuilder.group({
			familyName: ['', Validators.required],
			givenName: ['', Validators.required],
			UserTitle: ['', Validators.required],
		});

	}


	ngOnInit(): void {
		this.usertitleitems = this.menusetup.findChoices(this.annoinfo, this.usertitle);
	}
	
	setUserTitle($event: string): void {
		this.nameGroup.get('UserTitle').setValue($event);
	}


	setData(nameofperson: any): void {
		this.nameGroup.get('familyName').setValue(nameofperson[this.annoinfo['dataset:familyName'][this.identifier]]);
		this.nameGroup.get('givenName').setValue(nameofperson[this.annoinfo['dataset:givenName'][this.identifier]]);
		this.nameGroup.get('UserTitle').setValue(nameofperson[this.annoinfo['dataset:UserTitle'][this.identifier]]);
	}

	getData(nameofperson: any): void { 
		nameofperson[this.annoinfo['dataset:familyName'][this.identifier]] = this.nameGroup.get('familyName').value;
		nameofperson[this.annoinfo['dataset:givenName'][this.identifier]] = this.nameGroup.get('givenName').value;
		nameofperson[this.annoinfo['dataset:UserTitle'][this.identifier]] = this.nameGroup.get('UserTitle').value;
}
}
