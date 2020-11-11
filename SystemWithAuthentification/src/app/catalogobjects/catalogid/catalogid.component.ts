import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogid',
  templateUrl: './catalogid.component.html',
  styleUrls: ['./catalogid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogidComponent implements OnInit, OnChanges {

  simple: string;
  catalog: string ;
  catalogbase: string;

  @Input() catidobj: any;

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setData(this.catidobj);
  }

  ngOnInit(): void {
  }

  setData(info: any): void {
    if (info != null) {
    this.simple = info.simple;
    this.catalog = info.catalog;
    this.catalogbase = info.base;
  }
  }
}
