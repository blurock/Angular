import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-httpaddress',
  templateUrl: './httpaddress.component.html',
  styleUrls: ['./httpaddress.component.scss']
})
export class HttpaddressComponent implements OnInit {
  @Input() httpaddress: string;
  @Input() annohint: string;
  @Input() annolabel: string;
  @Output() httpaddressChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
 input($event) {
  this.httpaddress = $event;
  this.httpaddressChange.emit($event);
}

}
