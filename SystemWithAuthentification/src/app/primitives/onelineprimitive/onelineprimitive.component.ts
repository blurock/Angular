import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-onelineprimitive',
  templateUrl: './onelineprimitive.component.html',
  styleUrls: ['./onelineprimitive.component.scss']
})
export class OnelineprimitiveComponent implements OnInit, OnChanges {

  @Input() oneline: string;
  text: string;
  @Input() linelength: string;
  @Input() annohint: string;
  @Input() annolabel: string;
  linewidth: string;
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData();
  }

  ngOnInit(): void {
  }
  setData() {
    this.text = this.oneline;
    this.linewidth = this.linelength;
  }

}
