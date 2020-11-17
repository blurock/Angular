import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogconceptpurpose',
  templateUrl: './catalogconceptpurpose.component.html',
  styleUrls: ['./catalogconceptpurpose.component.scss']
})
export class CatalogconceptpurposeComponent implements OnInit, OnChanges {

  @Input() descriptionsuffix: string;
  @Input() purpcondata: any;
  @Input() annoinfo: any;

  conceptlabel: string;
  concepttitle: string;
  conceptanno: string;
  purposelabel: string;
  purposetitle: string;
  purposeanno: string;
  fieldwidth = 'full';

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.purpcondata, this.annoinfo);
  }

  ngOnInit(): void {
  }
  setData(info: any, annoinfo: any): void {
    if (annoinfo != null) {
      const conceptloc = 'dataconcept-' + this.descriptionsuffix;
      const purposeloc = 'purposekey-' + this.descriptionsuffix;

      this.conceptlabel = 'dataset:objectconcept';
      this.purposelabel = 'dataset:objectpurpose';

      this.conceptanno = annoinfo[conceptloc];
      this.purposeanno = annoinfo[purposeloc];

      const rdfslabel = 'rdfs:label';

      this.concepttitle = this.conceptanno[rdfslabel];
      this.purposetitle = this.purposeanno[rdfslabel];
    }

  }

}
