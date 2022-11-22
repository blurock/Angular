import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';

@Component({
	selector: 'app-rundatabaseservice',
	templateUrl: './rundatabaseservice.component.html',
	styleUrls: ['./rundatabaseservice.component.scss']
})
export class RundatabaseserviceComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<RundatabaseserviceComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private runservice: RunserviceprocessService
	) { }

	ngOnInit(): void {
	}

	runService(): void {
		this.runservice.run(this.data).subscribe({
			next: (responsedata: any) => {
				const success = responsedata['dataset:servicesuccessful'];
				if (success == 'true') {
					this.dialogRef.close(responsedata);
				} else {
					this.dialogRef.close(responsedata);
				}
			}
		})

	}
	onNoClick(): void {
		this.dialogRef.close();
	}


}
