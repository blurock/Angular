import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';

@Component({
  selector: 'app-objectsitereference',
  templateUrl: './objectsitereference.component.html',
  styleUrls: ['./objectsitereference.component.scss']
})
export class ObjectsitereferenceComponent implements OnInit {
	objectform: FormGroup;

	@Input() anno: any;
    @Output() deleteEvent : EventEmitter<number> = new EventEmitter<number>();

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	label: string;

siteclass = "dataset:HttpAddressInformationType";
siteitems: NavItem[];

  constructor(
		private formBuilder: FormBuilder,
		public identifiers: IdentifiersService,
		private menusetup: MenutreeserviceService) {
		this.objectform = this.formBuilder.group({
			index: [''],
			HTTPAddress: ['', Validators.required],
			HttpAddressInformationType: ['', Validators.required],
		});
      
      
     }

  
   ngOnInit(): void {
		this.siteitems = this.menusetup.findChoices(this.anno,this.siteclass);
  }
  
  	deleteLink() {
		this.deleteEvent.emit(this.objectform.get('index').value);
	}
	setIndex(index: number): void {
		this.objectform.get('index').setValue(index);
	}

  setData(catalog: any): void {
		this.objectform.get('HTTPAddress').setValue(catalog[this.identifiers.HTTPAddress]);
		this.objectform.get('HttpAddressInformationType').setValue(catalog[this.identifiers.HttpAddressInformationType]);
  }
  
  getData(catalog:any) {
    catalog[this.identifiers.HTTPAddress] = this.objectform.get('HTTPAddress').value;
    catalog[this.identifiers.HttpAddressInformationType] = this.objectform.get('HttpAddressInformationType').value;
  }
	setHttpAddressInformationType($event: string): void {
		this.objectform.get('HttpAddressInformationType').setValue($event);
	}

 
}
