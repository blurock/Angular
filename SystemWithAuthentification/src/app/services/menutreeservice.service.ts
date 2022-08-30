import { Injectable } from '@angular/core';
import { NavItem } from '../primitives/nav-item';
import { Ontologyconstants } from '../const/ontologyconstants';


@Injectable({
	providedIn: 'root'
})
export class MenutreeserviceService {

	constructor() { }

	annotationslabel = 'annotations';
	annoreflabel = 'annoref';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';
	dataobjectlabel = 'dataobject';
	classificationlabel = 'classification';


	public findChoices(anno: any, annoref: string): NavItem[] {
		const navitemarray: NavItem[] = [];
		const choiceanno = anno[annoref];
		const classification: any = choiceanno[this.classificationlabel];
		if (classification != null) {
			this.subchoices(anno, classification, navitemarray);
		} else {
			alert('No classifications');
		}
		return navitemarray;
	}
	
	public findTransactionChoices(transactiontree: any): NavItem[] {
		const classification = transactiontree[this.dataobjectlabel];
		const anno = transactiontree[this.annotationslabel];
		const navitemarray: NavItem[] = [];
		if (classification != null) {
			this.subchoices(anno, classification, navitemarray);
		} else {
			alert('No classifications registered');
		}
		return navitemarray;
	}

	subchoices(anno: any, classification: any, navitemarray: NavItem[]): void {
		const subclasses = classification['dataset:classificationtree'];
		if (subclasses != null) {
			for (let i = 0; i < subclasses.length; i++) {
				const classelement = subclasses[i];
				const type = classelement['dataset:catalogtype'];
				const typeinfo = anno[type];
				if (typeinfo != null) {
					const alabel = typeinfo[this.rdfslabel];
					// const acomment = typeinfo[this.rdfscomment];
					const children: NavItem[] = [];
					const celement: NavItem = {
						displayName: alabel,
						disabled: false,
						value: type,
						children: children
					};
					this.subchoices(anno, classelement, children);
					navitemarray.push(celement);
				}

			}
		}
	}


}
