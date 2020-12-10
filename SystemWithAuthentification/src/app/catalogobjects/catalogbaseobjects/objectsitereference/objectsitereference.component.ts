import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Ontologyconstants } from 'src/app/const/ontologyconstants';

@Component({
  selector: 'app-objectsitereference',
  templateUrl: './objectsitereference.component.html',
  styleUrls: ['./objectsitereference.component.scss']
})
export class ObjectsitereferenceComponent implements OnInit, OnChanges {
  @Input() annoinfo: any;
  @Input() refinfo: any;
  @Output() refinfoChange = new EventEmitter<any>();

  httpaddrlabel: string;
  httpaddrcomment: string;
  httpaddrlocation = 'dataset:HttpAddress';
  addrtypelabel: string;
  addrtypecomment: string;
  httploclabel: string;
  httploccomment: string;
  httploclocation = 'dataset:HttpAddressSourceLocation';


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData();
  }
  setData() {
    const httpaddranno = this.annoinfo.http;
    this.httpaddrlabel = httpaddranno[Ontologyconstants.rdfslabel];
    this.httpaddrcomment = httpaddranno[Ontologyconstants.rdfscomment];

    //const addrtypeanno = this.annoinfo.httptype;
    //alert(JSON.stringify(addrtypeanno));
    //this.addrtypelabel = addrtypeanno[Ontologyconstants.rdfslabel];
    //this.addrtypecomment = addrtypeanno[Ontologyconstants.rdfscomment];

    const httplocanno = this.annoinfo.httploctype;
    this.httploclabel = httplocanno[Ontologyconstants.rdfslabel];
    this.httploccomment = httplocanno[Ontologyconstants.rdfscomment];
  }

  ngOnInit(): void {
  }

}
