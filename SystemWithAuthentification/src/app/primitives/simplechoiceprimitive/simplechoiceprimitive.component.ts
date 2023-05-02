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
    this.findChoices();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  findChoices(): void {
    if (!this.filled) {
      const anno = this.annoinfo[this.annoref];
      const choiceanno = anno[this.choiceLabel];
      const classification = choiceanno['classification'];
      this.title = choiceanno[Ontologyconstants.rdfslabel];
      if(classification != null) {
        const subclasses = classification['classificationtree'];
        if(subclasses != null) {
      this.choicesList = [];
      this.choice = null;
      for (let i = 0; i < subclasses.length; i++) {
        const classelement = subclasses[i];
        const type = classelement['dataset:catalogtype'];
        const typeinfo = this.annoinfo[type];
        if(typeinfo != null) {
        const alabel = typeinfo[this.rdfslabel];
        const acomment = typeinfo[this.rdfscomment];
          const celement = { ontobject: type, label: alabel, comment: acomment };
          this.choicesList.push(celement);
                  if (this.selectedValue == celement.ontobject) {
          this.choice = celement;
        }

        } else {
          alert('Type not found: ' + type);
        }
      };
      if (this.choice == null) {
        this.choice = this.choicesList[0];
      }
      this.filled = true;
      } else {
        alert('no classification tree');
      }
      } else {
        alert('No classifications');
      }
    }
  }
  selectionPicked($event) {
    this.choice = $event;
    this.selectedValue = $event.ontobject;
    this.selectedValueChange.emit($event.ontobject);
  }
}
