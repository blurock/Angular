import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuntransactionService } from '../../services/runtransaction.service';
@Component({
	selector: 'app-runtransactiondialog',
	templateUrl: './runtransactiondialog.component.html',
	styleUrls: ['./runtransactiondialog.component.scss']
})
export class RuntransactiondialogComponent implements OnInit {


	response = {
		data: 'help',
		result: 'more data'
	};
	constructor(
		public dialogRef: MatDialogRef<RuntransactiondialogComponent>,
		private runtranaction: RuntransactionService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { 
	}
	

	ngOnInit(): void {
		
		
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
	runTransaction() {
		this.runtranaction.run(this.data).subscribe({
			next: (result: any) => {
				this.response = result;
				this.dialogRef.close(result);
			}
		})

	}

}
