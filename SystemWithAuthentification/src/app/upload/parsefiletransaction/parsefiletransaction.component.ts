import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {ParseuploadedfileComponent} from '../parseuploadedfile/parseuploadedfile.component';
import {InterfaceconstantsService} from '../../const/interfaceconstants.service';

@Component({
  selector: 'app-parsefiletransaction',
  templateUrl: './parsefiletransaction.component.html',
  styleUrls: ['./parsefiletransaction.component.scss']
})
export class ParsefiletransactionComponent implements OnInit {
  
  @Input() parseinfo: ParseuploadedfileComponent;
  @Input() catalogObject: EventEmitter<any>;
  
  parsesubtitle = 'Parse File Transaction';
  displaydescbutton = 'Display (and save to file) parsed file catalog objects';
  displaybutton = 'Display';
	loadfromdatabase = 'Load  parsed catalog blocks information from database';
	load = 'load';
	fetchparsed = 'Database';
	submit = 'Submit'
	subtransaction = 'Submit parsing transaction with given information';
	transactionidsubtitle = 'Transaction IDs for parsing';
	
	
	resultHtml: string;
	ctypeid: number;
	catalogtypes: any;
	

  constructor(interfaceconstants: InterfaceconstantsService) { 
    
    interfaceconstants.getTherGasCatalogTypes().subscribe(result => {
			if (result != null) {
				this.catalogtypes = result;
			} else {
				alert(interfaceconstants.errorcatalogtypes);
			}
			});

  }

  ngOnInit(): void {
  }
  
  
  displayTransactionInput(): void {
    
  }
  
  fetchInformation(): void {
    
  }
  
  submitInformation(): void {
    
  }

}
