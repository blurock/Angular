import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';

@Component({
	selector: 'app-rundatabaseservice',
	templateUrl: './rundatabaseservice.component.html',
	styleUrls: ['./rundatabaseservice.component.scss']
})
export class RundatabaseserviceComponent implements OnInit {
	
	running: boolean;

	constructor(
		public dialogRef: MatDialogRef<RundatabaseserviceComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private runservice: RunserviceprocessService
	) { 
		this.running = false;
	}

	ngOnInit(): void {
	}

	runService(): void {
		this.running = true;
		this.runservice.run(this.data).subscribe({
			
			next: (responsedata: any) => {
				this.running = false;
				const success = responsedata['dataset:servicesuccessful'];
				if (success == 'true') {
					this.dialogRef.close(responsedata);
				} else {
					this.runservice.checkReturn(responsedata);
					this.dialogRef.close(responsedata);
				}
			}
		})

	}
	onNoClick(): void {
		this.dialogRef.close();
	}


}
