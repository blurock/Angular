import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 

@Component({
  selector: 'app-doi',
  templateUrl: './doi.component.html',
  styleUrls: ['./doi.component.scss'],
  standalone: true,
  imports: [FormsModule,MatFormFieldModule]
})
export class DoiComponent implements OnInit, OnChanges {
  @Input() doi: string = 'DOI';
  @Input() doihint: string = 'The DOI specification';
  @Input() doilabel: string = 'DOI';
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
