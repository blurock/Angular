import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {SessiondatamanagementService} from '../../services/sessiondatamanagement.service';
import { Ontologyconstants } from 'systemconstants';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatDividerModule} from '@angular/material/divider'; 
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-applicationcards',
  templateUrl: './applicationcards.component.html',
  styleUrls: ['./applicationcards.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule,MatDividerModule,NgIf]
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
   //this.router.navigateByUrl(`/compute`);
   this.router.navigateByUrl(`/drawmolecule`);
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
  
  copycollection() {
    this.router.navigateByUrl(`/copycollection`);
  }
  examine() {
    this.router.navigateByUrl(`/examine`);
  }
}
