import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogid',
  templateUrl: './catalogid.component.html',
  styleUrls: ['./catalogid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogidComponent implements OnInit, OnChanges {

  simple: string;
  simplelab: string;
  catalog: string ;
  cataloglab: string;
  catalogbase: string;
  baselab: string;
  cataloganno: any;



  @Input() catidobj: any;
  @Input() annoinfo: any;

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.catidobj, this.annoinfo);
  }

  ngOnInit(): void {
  }

  setData(info: any, annoinfo: any): void {
    if (annoinfo != null) {
      const rdfslabel = 'rdfs:label';
      const simpanno = annoinfo.simple;
      this.cataloganno = annoinfo.catalog;
      const baseanno = annoinfo.base;
      this.simplelab = simpanno[rdfslabel];
      this.cataloglab = this.cataloganno[rdfslabel];
      this.baselab = baseanno[rdfslabel];
    }
    if (info != null) {
    this.simple = info.simple;
    this.catalog = info.catalog;
    this.catalogbase = info.base;
  }
  }
}
