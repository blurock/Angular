import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges, Output } from '@angular/core';
import { CatalogbaseextraComponent } from '../catalogbaseextra/catalogbaseextra.component';
import { DatadatadescriptionComponent } from '../datadatadescription/datadatadescription.component';
import {MatAccordion} from '@angular/material/expansion';

import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-catalogbasedata',
  templateUrl: './catalogbasedata.component.html',
  styleUrls: ['./catalogbasedata.component.scss']
  
})
export class CatalogbasedataComponent implements OnInit, AfterViewInit, OnChanges {

  type = 'type';
  simpleName: string;
  simpleNametip: string;
  title = 'one line description';
  titletip: string;
@ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() descriptionsuffix: string;
  @Input() baseobjdata: any;
  @Input() annoinfo: any;
@Output() toggleView = new EventEmitter<boolean>();

  showExtra: boolean;
  titleloc: string;
 descrloc: string;
  
  @ViewChild('extracatinfo') extra: CatalogbaseextraComponent;
  @ViewChild('datadescription') description: DatadatadescriptionComponent;

  constructor() { }
  
  ngOnInit(): void {
    this.showExtra = false;
    this.descrloc = 'descr-' + this.descriptionsuffix;
    this.titleloc = 'title-' + this.descriptionsuffix;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.baseobjdata, this.annoinfo);
  }
  ngAfterViewInit(): void {

  }


  toggleExtra(): void {
    if (this.showExtra) {
      this.showExtra = false;
    } else {
      this.showExtra = true;
    }
    this.toggleView.emit(this.showExtra);
  }
  setData(info: any, annoinfo: any): void {
    if(annoinfo != null) {
      const simpanno = annoinfo.simple;
      const titleloc = 'title-' + this.descriptionsuffix;
      const titleanno = annoinfo[titleloc];
      const rdfslabel = 'rdfs:label';
      this.simpleNametip = simpanno[rdfslabel];
      this.titletip = titleanno[rdfslabel];
    }
    if (info != null) {
      this.type = info.type;
      const catidJ = info.catid;
      if (info.catid != null) {
        this.simpleName = info.catid.simpleName;
      }
      this.simpleName = catidJ.simple;
      const titleloc = 'title-' + this.descriptionsuffix;
      const descriptionloc = 'descr-' + this.descriptionsuffix;
      if (info[descriptionloc] != null) {
        this.title = info[descriptionloc][titleloc];
      }
      this.extra.setData(info,annoinfo);
    }
  }
}
