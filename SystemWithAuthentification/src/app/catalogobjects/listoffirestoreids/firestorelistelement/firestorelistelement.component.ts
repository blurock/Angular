import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { IdentifiersService } from '../../../const/identifiers.service';


@Component({
	selector: 'app-firestorelistelement',
	templateUrl: './firestorelistelement.component.html',
	styleUrls: ['./firestorelistelement.component.scss']
})
export class FirestorelistelementComponent implements OnInit, AfterViewInit {

	@Input() anno: any;
	@Input() catalogID: any;
	@Output() deleteEvent : EventEmitter<number> = new EventEmitter<number>();

	index: number;

	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;

	constructor() { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		if (this.catalogID != null) {
			this.setData(this.catalogID);
		}
	}

	setData(catalogID: any): void {
		this.firestoreid.setData(catalogID);
	}

	public setIndex(index: number): void {
		this.index = index;
	}

	deleteLink(): void {
		this.deleteEvent.emit(this.index);
	}


}
