import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Ontologyconstants } from 'src/app/const/ontologyconstants';

@Component({
  selector: 'app-referenceinformation',
  templateUrl: './referenceinformation.component.html',
  styleUrls: ['./referenceinformation.component.scss']
})
export class ReferenceinformationComponent implements OnInit, OnChanges {

  @Input() annoinfo: any;
  @Input() refinfo: any;
  @Output() refinfoChange = new EventEmitter<any>();


  reftitletitle: string;
  reftitlecomment: string;
  refreftitle: string;
  refrefcomment: string;
  refdoititle: string;
  refdoicomment: string;


  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.refinfo, this.annoinfo);
  }

  ngOnInit(): void {
  }


  setData(info: any, anno: any): void {
    const annotitle = anno.reftitle;
    this.reftitletitle = annotitle[Ontologyconstants.rdfslabel];
    this.reftitlecomment = annotitle[Ontologyconstants.rdfscomment];

    const annorefstr = anno.refstr;
    this.refreftitle = annorefstr[Ontologyconstants.rdfslabel];
    this.refrefcomment = annorefstr[Ontologyconstants.rdfscomment];

    const annodoi = anno.doi;
    this.refdoititle = annodoi[Ontologyconstants.rdfslabel];
    this.refdoicomment = annodoi[Ontologyconstants.rdfscomment];

  }

}
