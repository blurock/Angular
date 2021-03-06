import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-catalogbaseextra',
  templateUrl: './catalogbaseextra.component.html',
  styleUrls: ['./catalogbaseextra.component.scss'],
  providers: [DatePipe]
})
export class CatalogbaseextraComponent implements OnInit, OnChanges {

  @Input() extrainfo: any;
  @Input() annoinfo: any;
  sourceID = 'sourceID';
  dateS = '';
  owner = 'Public';
  access = 'access';

  constructor(private datePipe: DatePipe) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.extrainfo, this.annoinfo);
  }

  ngOnInit(): void {
    const date = new Date();
    this.dateS = this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  setData(info: any, annoinfo:any): void {
    if (annoinfo != null) {
    }
    if (info != null) {
    this.dateS = info.date;
    this.sourceID = info.sourceID;
    this.owner = info.owner;
    this.access = info.access;
    }
  }

}
