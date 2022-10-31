import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { ParameterspecificationComponent } from '../parameterspecification/parameterspecification.component';

@Component({
  selector: 'app-parametervalue',
  templateUrl: './parametervalue.component.html',
  styleUrls: ['./parametervalue.component.scss']
})
export class ParametervalueComponent implements OnInit {
  
  @Input() annoinfo: any;
  @Input() parameterinfo: any;
  @Input() title: string;
  
  display = true;
  specdisplay = false;
  objectform: FormGroup;
  	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

  	@ViewChild('paramspec') paramspec: ParameterspecificationComponent;


  constructor(
    private formBuilder: FormBuilder
  ) {
    		this.objectform = this.formBuilder.group({
			ValueAsString: ['', Validators.required],
			ValueUncertainty: ['', Validators.required],
		});

   }

  ngOnInit(): void {
    
  }

	getData(activity: any): void {
		activity[this.annoinfo['dataset:ValueAsString'][this.identifier]] = this.objectform.get('ValueAsString').value;
		activity[this.annoinfo['dataset:ValueUncertainty'][this.identifier]] = this.objectform.get('ValueUncertainty').value;
		const paramspecvalue = {};
		this.paramspec.getData(paramspecvalue);
		activity[this.annoinfo['dataset:ParameterSpecification'][this.identifier]] = paramspecvalue;
	}
	setData(activity: any): void {
    alert("ParametervalueComponent 0");
		this.objectform.get('ValueAsString').setValue(activity[this.annoinfo['dataset:ValueAsString'][this.identifier]]);
    alert("ParametervalueComponent 1");
    alert("ParametervalueComponent 1.1" + activity[this.annoinfo['dataset:ValueUncertainty'][this.identifier]]);
		this.objectform.get('ValueUncertainty').setValue(activity[this.annoinfo['dataset:ValueUncertainty'][this.identifier]]);
    alert("ParametervalueComponent 2");
    const spec = activity[this.annoinfo['dataset:ParameterSpecification'][this.identifier]];
		this.paramspec.setData(spec);
    alert("ParametervalueComponent Done");
	}


}
