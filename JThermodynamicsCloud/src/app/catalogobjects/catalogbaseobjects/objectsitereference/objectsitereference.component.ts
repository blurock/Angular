import { Input, Output, Component, OnInit, EventEmitter,SimpleChanges } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MenuItemComponent} from '../../../primitives/menu-item/menu-item.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {ReactiveFormsModule} from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-objectsitereference',
  templateUrl: './objectsitereference.component.html',
  styleUrls: ['./objectsitereference.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule,MatCardModule, MatInputModule,
	MatGridListModule,MenuItemComponent,MatMenuTrigger,MatIconModule,MatMenuModule,CommonModule
	]
})
export class ObjectsitereferenceComponent implements OnInit {
	objectform: UntypedFormGroup;

	@Input() anno: any;
    @Output() deleteEvent : EventEmitter<number> = new EventEmitter<number>();

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	label: string = 'Label';

siteclass = "dataset:HttpAddressInformationType";
siteitems: NavItem[] = [];

  constructor(
		private formBuilder: UntypedFormBuilder,
		public identifiers: IdentifiersService,
		private menusetup: MenutreeserviceService) {
		this.objectform = this.formBuilder.group({
			index: [''],
			HTTPAddress: ['', Validators.required],
			HttpAddressInformationType: ['', Validators.required],
		});
      
      
     }

	ngOnChanges(changes: SimpleChanges) {
    if (changes['anno'] && changes['anno'].currentValue) {
		if(this.siteitems.length = 0) {
		this.siteitems = this.menusetup.findChoices(this.anno,this.siteclass);
		}
		}
    }
 
  
   ngOnInit(): void {
		this.siteitems = this.menusetup.findChoices(this.anno,this.siteclass);
  }
  
  openLink() {
	window.open(this.objectform.get('HTTPAddress')?.value, '_blank');
  }
  
  	deleteLink() {
		this.deleteEvent.emit(this.objectform.get('index')?.value ?? 'not defined');
	}
	setIndex(index: number): void {
		this.objectform.get('index')?.setValue(index);
	}

  setData(catalog: any): void {
		this.objectform.get('HTTPAddress')?.setValue(catalog[this.identifiers.HTTPAddress]);
		this.objectform.get('HttpAddressInformationType')?.setValue(catalog[this.identifiers.HttpAddressInformationType]);
  }
  
  getData(catalog:any) {
    catalog[this.identifiers.HTTPAddress] = this.objectform.get('HTTPAddress')?.value ?? 'not defined';
    catalog[this.identifiers.HttpAddressInformationType] = this.objectform.get('HttpAddressInformationType')?.value ?? 'not defined';
  }
	setHttpAddressInformationType($event: String): void {
		this.objectform.get('HttpAddressInformationType')?.setValue($event);
	}

 
}
