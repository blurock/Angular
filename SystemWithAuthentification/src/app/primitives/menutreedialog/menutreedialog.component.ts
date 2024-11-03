import { Component, OnInit, Input, Inject } from '@angular/core';
import { NavItem } from '../../primitives/nav-item';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MenutreeserviceService} from '../../services/menutreeservice.service';
@Component({
	selector: 'app-menutreedialog',
	templateUrl: './menutreedialog.component.html',
	styleUrls: ['./menutreedialog.component.scss']
})
export class MenutreedialogComponent implements OnInit {


	@Input() anno: any;
	@Input() annoref: string;

rdfslabel = Ontologyconstants.rdfslabel;

	constructor(public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(MenutreedialogWindow, {
			data: { annoref: this.annoref, annotations: this.anno }
		});

		dialogRef.afterClosed().subscribe(result => {
			alert('Dialog Closed: ' + result);
		});
	}


}
@Component({
	selector: 'app-menutreedialog-window',
	templateUrl: './menutreedialog-window.html'
})

export class MenutreedialogWindow implements OnInit {
	annoref: string;
	anno: any;
	annotationslabel = 'annotations';
	annoreflabel = 'annoref';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	title = 'Title';

	items: NavItem[];

	constructor(
		public dialogRef: MatDialogRef<MenutreedialogWindow>,
		private menusetup: MenutreeserviceService,
		@Inject(MAT_DIALOG_DATA) public inputdata: any,
		
	) { }

	ngOnInit(): void {
		this.annoref = this.inputdata[this.annoreflabel];
		this.anno = this.inputdata[this.annotationslabel];
		this.items = this.menusetup.findChoices(this.anno,this.annoref);
	}


	onNoClick(): void {
		this.dialogRef.close();
	}


};
