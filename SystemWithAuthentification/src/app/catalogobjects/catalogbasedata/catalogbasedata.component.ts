import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { CatalogbaseextraComponent } from '../catalogbaseextra/catalogbaseextra.component';
import { DatadatadescriptionComponent } from '../datadatadescription/datadatadescription.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogbasedata',
  templateUrl: './catalogbasedata.component.html',
  styleUrls: ['./catalogbasedata.component.scss']
})
export class CatalogbasedataComponent implements OnInit, AfterViewInit {

   type = 'type';
  simpleName = 'simpleName';
  title = 'one line description';

  @Input() descriptionsuffix: string;
  @Input() baseobjdata: Observable<any>;

  showExtra = false;
  @ViewChild('extracatinfo') extra: CatalogbaseextraComponent;
  @ViewChild('datadescription') description: DatadatadescriptionComponent;
  constructor() { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.baseobjdata.subscribe({
      next: (catalog: any) => {this.setData(catalog)},
      error: (info: any) => {alert('Get CatalogbasedataComponent failed:' + info); }
    })
  }

  toggleExtra(): void {
      if (this.showExtra) {
        this.showExtra = false;
      } else {
        this.showExtra = true;
      }
  }
  setData(info: any): void {
    alert('setData: CatalogbasedataComponent');
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
    alert('setData: CatalogbasedataComponent Done');
  }

}
