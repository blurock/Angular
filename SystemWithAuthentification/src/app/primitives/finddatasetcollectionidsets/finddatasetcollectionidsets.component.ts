import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';
import { NavItem } from '..//nav-item';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-finddatasetcollectionidsets',
	templateUrl: './finddatasetcollectionidsets.component.html',
	styleUrls: ['./finddatasetcollectionidsets.component.scss']
})
export class FinddatasetcollectionidsetsComponent implements OnInit {

	@Input() annoinfo: any;
	@Input() maintainer: string;
	@Input() label: string;
	@Input() hint: string;
	@Output() chosen = new EventEmitter<any>();

	objectform: UntypedFormGroup;

	identifier = Ontologyconstants.dctermsidentifier;
	collectionTitle = 'Collection Sets';
	nomenumessage = 'Loading Collection Sets';
	collectionarray: any;

	collectionmenu: NavItem[] = [{
		displayName: 'Choices',
		disabled: false,
		value: 'Answer',
		children: []
	}];

	constructor(
		private formBuilder: UntypedFormBuilder,
		public runservice: RunserviceprocessService
	) {
		this.objectform = this.formBuilder.group({
			DatasetCollectionName: ['', Validators.required],
		});

	}

	ngOnInit(): void {
		this.findCollectionSets();
	}

	setCollectionSet($event): void {
		const label = $event[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]];
		this.objectform.get('DatasetCollectionName').setValue(label);
		this.chosen.emit($event);
	}

	findCollectionSets(): void {
		const servicedata = {};
		servicedata['service'] = 'FindAllDatasetCollectionSets';
		servicedata[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.maintainer;
		this.runservice.run(servicedata).subscribe({
			next: (responsedata: any) => {
				const success = responsedata['dataset:servicesuccessful'];
				if (success === 'true') {
					this.collectionarray = responsedata[Ontologyconstants.catalogobject];
					this.collectionmenu = this.createMenu(this.collectionarray);
						this.setCollectionSet(this.collectionarray[0]);
				} else {
		alert('findCollectionSets() error');

				}
			},
			error: (info: any) => { alert('Get Collection Sets failed:'); }
		});
	}

	createMenu(catalogarr: any): NavItem[] {
		const children = [];
		for (const cat of catalogarr) {
			const label = cat[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]];
			const item: NavItem = {
				displayName: label,
				disabled: false,
				value: cat,
				children: []
			};
			children.push(item);
		}
		const menu: NavItem = {
			displayName: this.collectionTitle,
			disabled: false,
			value: '',
			children: children
		};
		return children;
	}

}
