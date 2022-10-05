import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ThermodynamicsdatasetcollectionidssetComponent } from '../../datasetcollection/thermodynamicsdatasetcollectionidsset/thermodynamicsdatasetcollectionidsset.component';

@Component({
  selector: 'app-visualizedatasetcollectionids',
  templateUrl: './visualizedatasetcollectionids.component.html',
  styleUrls: ['./visualizedatasetcollectionids.component.scss']
})
export class VisualizedatasetcollectionidsComponent implements OnInit {
  
  @Input() newCollection: EventEmitter<any>;
  @Input() annoReady: EventEmitter<any>;
  
  title = 'Collection Set ID';
  
  	@ViewChild('thermocollectionset') thermocollectionset: ThermodynamicsdatasetcollectionidssetComponent;


  constructor() { }

  ngOnInit(): void {
    this.newCollection.subscribe(result => {
      this.thermocollectionset.setData(result);
  });
}
}
