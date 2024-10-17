import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { RuntransactionService } from '../../services/runtransaction.service';
@Component({
	selector: 'app-runtransactiondialog',
	templateUrl: './runtransactiondialog.component.html',
	styleUrls: ['./runtransactiondialog.component.scss']
})
export class RuntransactiondialogComponent implements OnInit {

     
    running: boolean;
	response = {
		data: 'help',
		result: 'more data'
	};
	constructor(
		public dialogRef: MatDialogRef<RuntransactiondialogComponent>,
		private runtranaction: RuntransactionService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { 
		this.running = false;
	}
	

	ngOnInit(): void {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
	runTransaction() {
		this.running = true;
		this.runtranaction.run(this.data).subscribe({
			next: (result: any) => {
				this.running = false;
				this.response = result;
				this.dialogRef.close(result);
			}
		})

	}

}
