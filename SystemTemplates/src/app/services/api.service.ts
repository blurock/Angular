import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY  = 'a7af3ce0b4d24ca9be238150d3903d62';

  constructor(private httpClient: HttpClient) { }

  public getNews() {
    //return this.httpClient.get('http://localhost:8080/DataSetAndOntologyServices/ontology/ftocservice/98');
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
  }
}
