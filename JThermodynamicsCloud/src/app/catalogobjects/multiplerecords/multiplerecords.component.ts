import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import {NgIf,NgSwitch,NgSwitchCase,NgFor,NgSwitchDefault} from '@angular/common';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-multiplerecords',
  templateUrl: './multiplerecords.component.html',
  styleUrls: ['./multiplerecords.component.scss'],
  standalone: true,
  imports: [NgIf,MatIconModule,NgSwitch,ScrollingModule,NgSwitchCase,NgFor,NgSwitchDefault]
})

export class MultiplerecordsComponent implements OnInit, OnChanges {

  recordlabel: string = 'Record';
  recordtype: string = 'Type';
  comment: string = 'Comment';
  addrecord: string = 'Add';

objanno: any;
  @Input() annoinfo: any;
  @Input() refinfo: any;
  @Input() objlabel: string = '';
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
      if (this.recordtype == 'BibliographicReferenceLink') {
        const element: Record<string,any> = {};
        element[Ontologyconstants.datacitePrimaryResourceIdentifier] = 'DOI';
        element[Ontologyconstants.dctermstitle] = 'title';
        element[Ontologyconstants.dctermsdescription] =  'reference';
        element[Ontologyconstants.dccreator] = [];
        this.refinfo.push(element);
      }
      if (this.recordtype == 'NameOfPerson') {
      const element: Record<string,any> = {};
      element[Ontologyconstants.foaftitle] = 'Dr.';
      element[Ontologyconstants.foafGivenName] = 'Bugs';
      element[Ontologyconstants.foafFamilyName] = 'Bunny';
      this.refinfo.push(element);
      }
  }

}

