import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-applicationcards',
  templateUrl: './applicationcards.component.html',
  styleUrls: ['./applicationcards.component.scss']
})
export class ApplicationcardsComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

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
