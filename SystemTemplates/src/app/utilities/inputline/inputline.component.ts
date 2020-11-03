import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef , } from '@angular/core';
import {ModelParameterAnnotations} from '../../models/modelparameterannotations';
import { Observable } from 'rxjs';
import { OntoogyannotationinfoService } from 'src/app/services/ontoogyannotationinfo.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-inputline',
  templateUrl: './inputline.component.html',
  styleUrls: ['./inputline.component.css']
})
export class InputlineComponent implements OnInit {

  show = false;
  linelabel: string;
  linetitle: string;
  constructor() { }
  @Input() textarea: boolean
  @Input() subchecked: boolean
  @Input() parameters: Observable<any>;
  @Output() changeTitleEvent: EventEmitter<ModelParameterAnnotations> = new EventEmitter();
  @Output() checkboxchanged: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('titleField') titleField: ElementRef;
  
  ngOnInit(): void {
    alert("input line");
    this.parameters.subscribe(val => {
      alert("Val: ");
      alert(val);
      this.linelabel = val["rdfs:label"];
      this.linetitle = val["rdfs:comment"];
    })

  }

  toggle(event: Event) {
    this.show = !this.show;
    this.checkboxchanged.emit(this.show);
  }
  onChange($event: Event) {
    //this.parameters.valueChanged = true;
    //this.parameters.value = this.titleField.nativeElement.value;
    //this.changeTitleEvent.emit(this.parameters);
  }

}
