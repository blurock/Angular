import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-submitfileandinformatioon',
  templateUrl: './submitfileandinformatioon.component.html',
  styleUrls: ['./submitfileandinformatioon.component.scss']
})
export class SubmitfileandinformatioonComponent implements OnInit {
  
  @Input() uploadinfo: string;
  @Output() submitUploadEvent = new EventEmitter<string>();
  
  jsonobj = {
    "dataset:JThermodynamicsVibrationalModes": "",
    'dataset:TherGasBensonRules': ""
  }
  

disabled: boolean;
  constructor() { }

  ngOnInit(): void {
    this.disabled = false;
  }
  
  submit(): void {
    this.submitUploadEvent.emit('upload');
  }

}
