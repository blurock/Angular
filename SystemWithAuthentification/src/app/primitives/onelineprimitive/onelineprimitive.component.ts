import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-onelineprimitive',
  templateUrl: './onelineprimitive.component.html',
  styleUrls: ['./onelineprimitive.component.scss']
})
export class OnelineprimitiveComponent implements OnInit, OnChanges {

  @Input() oneline: string;
  @Input() linelength: string;
  @Input() annohint: string;
  @Input() annolabel: string;
  @Output() onelineChange = new EventEmitter<string>();
  linewidth: string;
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData();
  }

  ngOnInit(): void {
  }
  setData() {
    this.linewidth = this.linelength;
  }
 onelineC($event) {
  this.oneline = $event;
  this.onelineChange.emit($event);
}
}
