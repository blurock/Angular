import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textareaprimitive',
  templateUrl: './textareaprimitive.component.html',
  styleUrls: ['./textareaprimitive.component.scss']
})
export class TextareaprimitiveComponent implements OnInit {

  @Input() textarea: string;
  text: string;
  @Input() textwidth: string
  
  constructor() { }

  ngOnInit(): void {
    this.text= this.textarea
  }

}
