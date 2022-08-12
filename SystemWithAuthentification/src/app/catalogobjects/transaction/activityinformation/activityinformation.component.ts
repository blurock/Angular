import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivityrepositoryinitialreadlocalfileComponent} from '../../activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';

@Component({
  selector: 'app-activityinformation',
  templateUrl: './activityinformation.component.html',
  styleUrls: ['./activityinformation.component.scss']
})
export class ActivityinformationComponent implements OnInit {
  
  activityinfoid = 'dataset:activityinfo';

  activityname: string;
  activities = ['ActivityRepositoryInitialReadLocalFile'];
  
  @ViewChild('readlocal') readlocal: ActivityrepositoryinitialreadlocalfileComponent;

  constructor() { }

  ngOnInit(): void {
    this.setActivity(this.activities[0]);
  }
  
  setActivity(select: any): void {
    this.activityname = select;
  }
  
  getData(catalog: any): void {
    const activity = {};
    catalog[this.activityinfoid] = activity;
    alert(this.activityname);
    if(this.activityname == 'ActivityRepositoryInitialReadLocalFile') {
    alert(this.activityname + '  this.readlocal.getData(activity);');
      this.readlocal.getData(activity);
    } else {
      alert('No activity information');
    }
    
  }
  
  setData(catalog: any): void {
    const activity = catalog[this.activityinfoid];
    if(this.activityname == 'ActivityRepositoryInitialReadLocalFile') {
      this.readlocal.setData(activity);
    } else {
      alert('No activity information');
    }
  }

}
