import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-doi',
  templateUrl: './doi.component.html',
  styleUrls: ['./doi.component.scss']
})
export class DoiComponent implements OnInit, OnChanges {
  @Input() doi: string;
  @Input() doihint: string;
  @Input() doilabel: string;
  @Output() doiChange = new EventEmitter<string>();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }
  doiC($event: any): void {
    this.doi = $event;
    this.doiChange.emit($event);
  }
}
