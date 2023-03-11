import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {SessiondatamanagementService} from '../../services/sessiondatamanagement.service';
import {Ontologyconstants} from '../../const/ontologyconstants';

@Component({
  selector: 'app-applicationcards',
  templateUrl: './applicationcards.component.html',
  styleUrls: ['./applicationcards.component.scss']
})
export class ApplicationcardsComponent implements OnInit {

  useraccountdata: any;
  administrator: boolean;

  constructor(
    public session: SessiondatamanagementService,
    private router:Router
  ) { 
    this.administrator = false;
    this.useraccountdata = this.session.getUserAccount();
    const role = this.useraccountdata[Ontologyconstants.UserAccountRole];
    if(role == 'dataset:Administrator') {
      this.administrator = true;
    }
  }

  ngOnInit(): void {
  }
  
  calculations(): void {
   this.router.navigateByUrl(`/compute`);
  }
  
  collection(): void {
    this.router.navigateByUrl(`/catalog/collection`);
  }
  
  upload(): void {
    this.router.navigateByUrl(`/uploaddatabaseitem`);
  }
  
  datasetadmin(): void {
    this.router.navigateByUrl(`/datasetadmin`);
  }
  
  
}
