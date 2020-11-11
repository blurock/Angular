import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CatalogbaseextraComponent } from '../catalogbaseextra/catalogbaseextra.component';
import { DatadatadescriptionComponent } from '../datadatadescription/datadatadescription.component';

@Component({
  selector: 'app-catalogbasedata',
  templateUrl: './catalogbasedata.component.html',
  styleUrls: ['./catalogbasedata.component.scss']
})
export class CatalogbasedataComponent implements OnInit, AfterViewInit, OnChanges {

  type = 'type';
  simpleName = 'simpleName';
  title = 'one line description';

  @Input() descriptionsuffix: string;
  @Input() baseobjdata: any;

  showExtra = false;
  @ViewChild('extracatinfo') extra: CatalogbaseextraComponent;
  @ViewChild('datadescription') description: DatadatadescriptionComponent;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.baseobjdata);
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  toggleExtra(): void {
    if (this.showExtra) {
      this.showExtra = false;
    } else {
      this.showExtra = true;
    }
  }
  setData(info: any): void {
    if (info != null) {
      this.type = info.type;
      const catidJ = info.catid;
      if (info.catid != null) {
        this.simpleName = info.catid.simpleName;
      }
      this.simpleName = catidJ.simple;
      const descriptionloc = 'descr-' + this.descriptionsuffix;
      const titleloc = 'title-' + this.descriptionsuffix;
      if (info[descriptionloc] != null) {
        this.title = info[descriptionloc][titleloc];
      }
      this.extra.setData(info);
    }
  }
}
