import { Injectable } from '@angular/core';
import { ModelParameterAnnotations } from '../models/modelparameterannotations';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OntoogyannotationinfoService {

  annotations: Map<string, ModelParameterAnnotations>;
  titleparameters: ModelParameterAnnotations;
  descrparameters: ModelParameterAnnotations;
  keywordparameters: ModelParameterAnnotations;

  constructor(private httpClient: HttpClient) {
    this.annotations = new Map();

    this.titleparameters = new ModelParameterAnnotations();
    this.titleparameters.value = 'DescriptionTitle';
    this.titleparameters.label = 'Title';
    this.titleparameters.comment = 'The main title of object';
    this.titleparameters.altlabel = 'title';
    this.titleparameters.type = 'OneLine';
    this.titleparameters.identifier = 'dcterms:title';
    this.titleparameters.valueChanged = false;

    this.descrparameters = new ModelParameterAnnotations();
    this.descrparameters.value = 'DescriptionAbstract';
    this.descrparameters.label = 'Abstract';
    this.descrparameters.comment = 'A paragraph description of the entity';
    this.descrparameters.altlabel = 'abstract';
    this.descrparameters.type = 'Paragraph';
    this.descrparameters.identifier = 'dcterms:description';
    this.descrparameters.valueChanged = false;

    this.keywordparameters = new ModelParameterAnnotations();
    this.keywordparameters.value = '';
    this.keywordparameters.label = 'Keywords';
    this.keywordparameters.comment = 'A keyword describing the entity';
    this.keywordparameters.altlabel = 'keyword';
    this.keywordparameters.type = 'ShortString';
    this.keywordparameters.identifier = 'dcat:keyword';
    this.keywordparameters.valueChanged = false;

    this.annotations.set(this.titleparameters.identifier, this.titleparameters);
    this.annotations.set(this.descrparameters.identifier, this.descrparameters);
    this.annotations.set(this.keywordparameters.identifier, this.keywordparameters);
  }

  public getAnnotationsFromID(id: string) {

    const annotationshttp = 'http://localhost:8080/DataSetAndOntologyServices/annotation';
    const annwithid = annotationshttp + "?catalogname=" + id;
    return this.httpClient.get(annwithid);

    //return of(this.annotations.get(id));
  }

  getClassificationTree(top: string): Observable<object> {
    const nodes = [
      {
        name: 'root1',
        children: [
          { name: 'child1' },
          { name: 'child2' }
        ]
      },
      {
        name: 'root2',
        children: [
          { name: 'child2.1', children: [] },
          {
            name: 'child2.2', children: [
              { name: 'grandchild2.2.1' }
            ]
          }
        ]
      },
      { name: 'root3' },
      { name: 'root4', children: [] },
      { name: 'root5', children: null }
    ];
    return of(nodes);
  }
}
