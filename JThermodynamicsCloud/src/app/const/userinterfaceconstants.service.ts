import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserinterfaceconstantsService {
  
  fetchInformationfailed = 'Fetch information failed';
  fetchInformationCanceled = 'Fetch information canceled';
  getannotationsfnotsuccessful = 'Annotations not found';
  notimplemented = 'Not implemented';
  cqncelled = 'Canceled';
  
  	filenamehint = 'Can be changed from upload name';
	filesourceidentifierlabel = 'File Source Identifier'

  
  displaybutton = 'Display';
  displaydescbutton = 'Display JSON of current object';
  loadfromfile = 'Load Catalog object from file';
  fetchobjectbutton = 'Fetch';
  cataloginfotitle = 'Catalog Object Information';
  catalogaddresstitle = 'Catalog Address';
  transactionpositiontitle = 'Transaction Address';
  
  refresh = 'Refresh Information';
  fetchinfo = 'Fetch Information';
  displayinfo = 'Display Information';
  changeinfo = 'Change Information';
  saveinfo = 'Save Information';
  
  constructor() { }
}
