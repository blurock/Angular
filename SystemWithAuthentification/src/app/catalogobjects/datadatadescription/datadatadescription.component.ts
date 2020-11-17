import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OnelineprimitiveComponent } from 'src/app/primitives/onelineprimitive/onelineprimitive.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-datadatadescription',
  templateUrl: './datadatadescription.component.html',
  styleUrls: ['./datadatadescription.component.scss']
})
export class DatadatadescriptionComponent implements OnInit, OnChanges {

  title: string;
  abstracttext: string;
  purposeconcept: string;
  keywords: string;
  fieldwidth = 'full';

  @Input() descriptiondata: any;
  @Input() descriptionsuffix: string;
  @Input() annoinfo: any;

  abstrlabel: string;
  abstrdescr: string;
  titlelabel: string;
  titledescr: string;


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.descriptiondata, this.annoinfo);
  }

  ngOnInit(): void {

  }
  setData(info: any, annoinfo: any): void {

    if (annoinfo != null) {
      const abstrloc = 'abstract-' + this.descriptionsuffix;
      const abstranno = annoinfo[abstrloc];
      const rdfslabel = 'rdfs:label';
      const rdfsdescr = 'rdfs:comment';
      this.abstrlabel = abstranno[rdfslabel];
      this.abstrdescr = abstranno[rdfsdescr];
      const titleloc = 'title-' + this.descriptionsuffix;
      const titleanno = annoinfo[titleloc];
      this.titlelabel = titleanno[rdfslabel];
      this.titledescr = titleanno[rdfsdescr];
    }
    if (info != null) {
      const descr = 'title-' + this.descriptionsuffix;
      this.title = info[descr];
      const abst = 'abstract-' + this.descriptionsuffix;
      this.abstracttext = info[abst];
      const purconloc = 'purpose-' + this.descriptionsuffix;
      this.purposeconcept = info[purconloc];
      const keywordloc = 'keyword-' + this.descriptionsuffix;
      this.keywords = info[keywordloc];
    }
  }
}
