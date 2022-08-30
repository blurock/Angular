import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivityrepositoryinitialreadlocalfileComponent } from '../../activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';

@Component({
	selector: 'app-activityinformation',
	templateUrl: './activityinformation.component.html',
	styleUrls: ['./activityinformation.component.scss']
})
export class ActivityinformationComponent implements OnInit {

	@Input() activityname: string;

	activityinfoid = 'dataset:activityinfo';
	noactivity = false;


	public activities = ['dataset:ActivityRepositoryInitialReadLocalFile'];

	@ViewChild('readlocal') readlocal: ActivityrepositoryinitialreadlocalfileComponent;

	constructor() { }

	ngOnInit(): void {
 		if (this.activityname == '') {
			this.noactivity = true;
		}
	}

	setActivity(select: any): void {
		this.activityname = select;
	}

	getData(activity: any): void {
		if (!this.noactivity) {
			if (this.activityname == 'dataset:ActivityRepositoryInitialReadLocalFile') {
				this.readlocal.getData(activity);
			} else {
				alert('Not known activity information: ' +  this.activityname);
			}
		}
	}

	setData(activity: any): void {
		const activityB = this.activityname == 'dataset:ActivityRepositoryInitialReadLocalFile';
		if (activityB) {
			this.readlocal.setData(activity);
		} else {
		}
	}

}
