import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-textareaprimitive',
  templateUrl: './textareaprimitive.component.html',
  styleUrls: ['./textareaprimitive.component.scss']
})
export class TextareaprimitiveComponent implements OnInit, OnChanges {

  @Input() textarea: string;
  
  @Input() textwidth: string
  @Input() annolabel: string;
  @Input() annohint: string;
  

text: string;
textlab: string;
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData();
  }
  setData() {
    this.text = this.textarea;
    this.textlab = this.annolabel;
  }

  ngOnInit(): void {
  }
}