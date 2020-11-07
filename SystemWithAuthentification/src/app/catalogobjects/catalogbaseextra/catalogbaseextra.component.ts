import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-catalogbaseextra',
  templateUrl: './catalogbaseextra.component.html',
  styleUrls: ['./catalogbaseextra.component.scss'],
  providers: [DatePipe]
})
export class CatalogbaseextraComponent implements OnInit {

  sourceID = 'sourceID';
  dateS = '';
  owner = 'Public';
  access = 'access';

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    const date = new Date();
    this.dateS = this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  setData(info: any): void {
    this.dateS = info.date;
    this.sourceID =info.sourceID;
    this.owner = info.owner;
    this.access = info.access;
  }

}
