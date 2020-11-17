import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl } from '@angular/forms';

interface choiceelement {
  ontobject: string;
  label: string;
  comment: string;

}
@Component({
  selector: 'app-simplechoiceprimitive',
  templateUrl: './simplechoiceprimitive.component.html',
  styleUrls: ['./simplechoiceprimitive.component.scss']
})


export class SimplechoiceprimitiveComponent implements OnInit, OnChanges {

  choices = new FormControl();
  rdfslabel = 'rdfs:label';
  rdfscomment = 'rdfs:comment';
  selectedValue: string;
  @Input() title: string;

  @Input() choiceanno: any
  @Input() choiceLabel: string;

  choicesList: choiceelement[];
  constructor() { }

  ngOnInit(): void {
  }

    ngOnChanges(changes: SimpleChanges): void {
      this.findChoices();
    }

  findChoices(): void  {
    this.choicesList = [];
    const c = this.choiceanno[this.choiceLabel];
    const subclasses = c.subclassifications;
    for(let i = 0; i<subclasses.length; i++) {
    const element = subclasses[i];
      const susanno = element.catalogAnnotations;
      const ontobj = element.classification;
      const alabel = susanno[this.rdfslabel];
      const acomment = susanno[this.rdfscomment];
      const celement = {ontobject: ontobj, label: alabel, comment: acomment};
      this.choicesList.push(celement);
    };
  }

}
