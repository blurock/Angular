import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Ontologyconstants } from 'src/app/const/ontologyconstants';

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
  title: string;
  choice = null;

  @Input() selectedValue: string;
  @Input() annoref: string;

  @Input() annoinfo: any
  @Input() choiceLabel: string;
  @Output() selectedValueChange = new EventEmitter<string>();

  choicesList: choiceelement[];
  filled = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.findChoices();
  }

  findChoices(): void {
    if (!this.filled) {
      const anno = this.annoinfo[this.annoref];
      this.title = anno[Ontologyconstants.rdfslabel];
      const choiceanno = anno[this.choiceLabel];
      const subclasses = choiceanno.subclassifications;
      this.choicesList = [];
      this.choice = null;
      for (let i = 0; i < subclasses.length; i++) {
        const element = subclasses[i];
        const susanno = element.catalogAnnotations;
        const ontobj = element.classification;
        const alabel = susanno[this.rdfslabel];
        const acomment = susanno[this.rdfscomment];
        const celement = { ontobject: ontobj, label: alabel, comment: acomment };
        this.choicesList.push(celement);
        if (this.selectedValue == celement.ontobject) {
          this.choice = celement;
        }
      };
      if (this.choice == null) {
        this.choice = this.choicesList[0];
      }

      this.filled = true;
    }
  }
  selectionPicked($event) {
    this.choice = $event;
    this.selectedValue = $event.ontobject;
    this.selectedValueChange.emit($event.ontobject);
  }
}
