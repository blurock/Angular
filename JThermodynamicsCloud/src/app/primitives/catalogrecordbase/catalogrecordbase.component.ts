import { Component, Input } from '@angular/core';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { BaseInterface } from '../../primitives/basecatalog.interface';

@Component({
	selector: 'app-catalogrecordbase',
	standalone: true,
	imports: [],
	templateUrl: './catalogrecordbase.component.html',
	styleUrl: './catalogrecordbase.component.scss'
})
export class CatalogrecordbaseComponent implements BaseInterface {

	@Input() annoinfo: any;

	rdfslabel: string = Ontologyconstants.rdfslabel;
	rdfscomment: string = Ontologyconstants.rdfscomment;
	identifier: string = Ontologyconstants.dctermsidentifier;


	setData(catalog: any): void {

	}

	getData(catalog: any): void {

	}


}
