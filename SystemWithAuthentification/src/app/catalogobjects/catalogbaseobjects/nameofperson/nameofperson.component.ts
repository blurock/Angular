import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Ontologyconstants } from 'src/app/const/ontologyconstants';

@Component({
  selector: 'app-nameofperson',
  templateUrl: './nameofperson.component.html',
  styleUrls: ['./nameofperson.component.scss']
})
export class NameofpersonComponent implements OnInit, OnChanges {

    @Input() namedata: any;
  @Input() annoinfo: any;
  @Output() namedatachange = new EventEmitter<any>();

  nametitletitle: string;
  nametitlecomment: string;
  namegiventitle: string;
  namegivencomment: string;
  namefamilytitle: string;
  namefamilycomment: string;


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.namedata, this.annoinfo);
  }

  ngOnInit(): void {
  }
setData(info: any, anno: any): void {
  const titleanno = anno.usertitle;
  this.nametitletitle = titleanno[Ontologyconstants.rdfslabel];
  this.nametitlecomment = titleanno[Ontologyconstants.rdfscomment];

  const givenanno = anno.given;
  this.namegiventitle = givenanno[Ontologyconstants.rdfslabel];
  this.namegivencomment = givenanno[Ontologyconstants.rdfscomment];

  const familyanno = anno.fname;
  this.namefamilytitle = familyanno[Ontologyconstants.rdfslabel];
  this.namefamilycomment = familyanno[Ontologyconstants.rdfscomment];
}

}
