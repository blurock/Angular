import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { RuntransactionService } from '../../services/runtransaction.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-runtransactiondialog',
	templateUrl: './runtransactiondialog.component.html',
	styleUrls: ['./runtransactiondialog.component.scss'],
	standalone: true,
	imports: [MatProgressSpinner,CommonModule,MatDialogModule]
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
