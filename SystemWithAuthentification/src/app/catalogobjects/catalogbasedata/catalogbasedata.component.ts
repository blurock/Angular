import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { CatalogbaseextraComponent } from '../catalogbaseextra/catalogbaseextra.component';

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

  showExtra = false;
  @ViewChild('extracatinfo') extra: CatalogbaseextraComponent;
  constructor() { }
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
    alert('setData: CatalogbasedataComponent');
    this.type = info.type;
    alert(this.type);
    alert(JSON.stringify(info.catid));
    const catidJ = info.catid;
    alert('const catidJ = info.catid;  ' + JSON.stringify(catidJ) + 'catidJ.simple   ' + JSON.stringify(catidJ.simple));

    
    if (info.catid != null) {
      this.simpleName = info.catid.simpleName;
    }
    this.simpleName = catidJ.simple;
    alert(JSON.stringify(this.simpleName));
    const descriptionloc = 'descr-' + this.descriptionsuffix;
    const titleloc = 'title-' + this.descriptionsuffix;
    alert(JSON.stringify(descriptionloc));
    alert(JSON.stringify(info[descriptionloc]));
    if (info[descriptionloc] != null) {
      this.title = info[descriptionloc][titleloc];
    }

    this.extra.setData(info);

  }

}
