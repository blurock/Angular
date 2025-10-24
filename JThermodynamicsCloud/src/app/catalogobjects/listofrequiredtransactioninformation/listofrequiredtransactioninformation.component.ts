import { ChangeDetectorRef, Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LiistelementrequiredinformationComponent } from './liistelementrequiredinformation/liistelementrequiredinformation.component';
import { IdentifiersService } from '../../const/identifiers.service';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
import { CatalogbaseComponent } from '../../primitives/catalogbase/catalogbase.component';
import { OntologycatalogService } from '../../services/ontologycatalog.service';

@Component({
  selector: 'app-listofrequiredtransactioninformation',
  templateUrl: './listofrequiredtransactioninformation.component.html',
  styleUrl: './listofrequiredtransactioninformation.component.scss',
  standalone: true,
  	imports: [MatCardModule,
  	MatIconModule]
})
export class ListofrequiredtransactioninformationComponent {
	
	listtitle = 'Required Transaction Information';
	
	listofrequired: LiistelementrequiredinformationComponent[] = [];
	
	@Input() annoinfo!: any;
	
	@ViewChild('dynamicChild', { read: ViewContainerRef }) dynamicChild!: ViewContainerRef;
	
	componentRef!: ComponentRef<LiistelementrequiredinformationComponent>; 
	
	constructor(
		public identifiers: IdentifiersService,
		constants: UserinterfaceconstantsService,
		cdRef: ChangeDetectorRef
	) {
		this.listtitle = constants.firestoreinfotitle;
		
	 }
	 addRequiredInf(info: any) {
	 	this.componentRef = this.dynamicChild.createComponent(LiistelementrequiredinformationComponent);
	 	this.componentRef.instance.anno = this.annoinfo;
	 	this.componentRef.instance.setIndex(this.listofrequired.length);
	 	this.componentRef.instance.deleteEvent.subscribe((index) => {
	 		this.listofrequired.splice(index,1);
	 		this.componentRef.destroy();
	 		this.resetLinkArray();
	 	})
		this.componentRef.instance.setData(info);
	 	this.listofrequired.push(this.componentRef.instance);
	 }
	 
	 
	addEmptyObjectLink(): void {
	}
	setData(firestorerequired: any[]) {
			this.listofrequired = [];
			for (const required of firestorerequired) {
				this.addRequiredInf(required);
			}
		}
		
	getData(firestorerequired: any[]) {
		//super.getData(firestorerequired);
			for (const firestoreid of this.listofrequired) {
		  		const fire: Record<string,unknown> = {};
		  		firestoreid.getData(fire);
				firestorerequired.push(fire[this.identifiers.FirestoreCatalogID]);
			}
		}
	resetLinkArray(): void {
			let index = 0;
			for (let linkform of this.listofrequired) {
				linkform.setIndex(index);
				index++;
				}
		}


}
