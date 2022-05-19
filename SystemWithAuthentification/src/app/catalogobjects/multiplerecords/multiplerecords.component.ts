import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Ontologyconstants } from 'src/app/const/ontologyconstants';


@Component({
  selector: 'app-multiplerecords',
  templateUrl: './multiplerecords.component.html',
  styleUrls: ['./multiplerecords.component.scss']
})

export class MultiplerecordsComponent implements OnInit, OnChanges {

  recordlabel: string;
  recordtype: string;
  comment: string;
  addrecord: string;

objanno: any;
  @Input() annoinfo: any;
  @Input() refinfo: any;
  @Input() objlabel: string;
  @Input() primary = true;
 // @Output() refinfochange = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.setData();
  }

  public setData(): void {
    this.objanno = this.annoinfo[this.objlabel];
    this.recordlabel = this.objanno[Ontologyconstants.rdfslabel];
    this.comment = this.objanno[Ontologyconstants.rdfscomment];
    this.recordtype = this.objanno[Ontologyconstants.dctype];
  }

  addElement(): void {
      if (this.refinfo == null) {
        this.refinfo = [];
      }
      if (this.recordtype == 'DataSetReference') {
        const element = {};
        element[Ontologyconstants.datacitePrimaryResourceIdentifier] = 'DOI';
        element[Ontologyconstants.dctermstitle] = 'title';
        element[Ontologyconstants.dctermsdescription] =  'reference';
        element[Ontologyconstants.dccreator] = [];
        this.refinfo.push(element);
      }
      if (this.recordtype == 'NameOfPerson') {
      const element = {};
      element[Ontologyconstants.foaftitle] = 'Dr.';
      element[Ontologyconstants.foafGivenName] = 'Bugs';
      element[Ontologyconstants.foafFamilyName] = 'Bunny';
      this.refinfo.push(element);
      }
  }

}

