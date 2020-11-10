import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { OnelineprimitiveComponent } from 'src/app/primitives/onelineprimitive/onelineprimitive.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datadatadescription',
  templateUrl: './datadatadescription.component.html',
  styleUrls: ['./datadatadescription.component.scss']
})
export class DatadatadescriptionComponent implements OnInit {

  title: string;
  abstracttext: string;
  fieldwidth = 'full';

  @Input() descriptiondata: any;
  @Input() descriptionsuffix: string;


  constructor() { }

  ngOnInit(): void {
    this.setData(this.descriptiondata);
  }
setData(info: any): void {
  const descr = 'title-' + this.descriptionsuffix;
  this.title = info[descr];
  const abst = 'abstract-' + this.descriptionsuffix;
  this.abstracttext = info[abst];
}
}
