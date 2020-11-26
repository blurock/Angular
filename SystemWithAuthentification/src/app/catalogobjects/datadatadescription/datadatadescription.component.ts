import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

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

  descr: string;
  abst: string;
  purconloc: string;
  keywordloc: string;

  abstrlabel: string;
  abstrdescr: string;
  titlelabel: string;
  titledescr: string;


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.abst = 'abstract-' + this.descriptionsuffix;
    this.purconloc = 'purpose-' + this.descriptionsuffix;
    this.keywordloc = 'keyword-' + this.descriptionsuffix;
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
      this.title = info[this.descr];
      this.abstracttext = info[this.abst];
      this.purposeconcept = info[this.purconloc];
      this.keywords = info[this.keywordloc];
    }
  }
}
