import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserinterfaceconstantsService {
  
  fetchInformationfailed = 'Fetch information failed';
  fetchInformationCanceled = 'Fetch information canceled';
  getannotationsfnotsuccessful = 'Annotations not found';
  
  displaybutton = 'Display';
  displaydescbutton = 'Display JSON of current object';
  loadfromfile = 'Load Catalog object from file';
  fetchobjectbutton = 'Fetch';

  constructor() { }
}
