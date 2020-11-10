import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-onelineprimitive',
  templateUrl: './onelineprimitive.component.html',
  styleUrls: ['./onelineprimitive.component.scss']
})
export class OnelineprimitiveComponent implements OnInit {

  @Input() oneline: string;
  text: string;
  @Input() linelength: string;
  linewidth: string;
  constructor() {

  }

  ngOnInit(): void {
    this.text = this.oneline;
    this.linewidth = this.linelength;
  }


}
