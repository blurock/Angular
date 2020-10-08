import { Component, OnInit } from '@angular/core';
import { ModelParameterAnnotations } from 'src/app/models/modelparameterannotations';
import { Observable } from 'rxjs';
import { OntoogyannotationinfoService } from 'src/app/services/ontoogyannotationinfo.service';

@Component({
  selector: 'app-toppage',
  templateUrl: './toppage.component.html',
  styleUrls: ['./toppage.component.css']
})
export class ToppageComponent implements OnInit {

  titleparameters: Observable<any>;
  descrparameters: Observable<any>;
  keywordparameters: Observable<any>;
  classifications: Observable<object>;
  title = 'SystemTemplates';
  classificationtitle = 'Classifications';
  defaultvalue = 'no value;';
  
  constructor(
    private ontologyservice: OntoogyannotationinfoService
    ) { }

  ngOnInit(): void {
    this.getAnnot();
  }

  getAnnot(): void {
    this.keywordparameters = this.ontologyservice.getAnnotationsFromID('dataset:DescriptionKeyword');
    this.titleparameters = this.ontologyservice.getAnnotationsFromID('dataset:DescriptionTitle');
    this.descrparameters = this.ontologyservice.getAnnotationsFromID('dataset:DescriptionAbstract');
    this.classifications = this.ontologyservice.getClassificationTree('');
  }

}
