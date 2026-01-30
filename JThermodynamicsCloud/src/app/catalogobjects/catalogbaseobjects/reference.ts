import { NameOfPerson } from './nameofperson';
import { Ontologyconstants } from 'systemconstants';


export class reference {
	DOI: string;
	referenceString: string;
	referenceTitle: string;
	authors: NameOfPerson[];

	public fillFromJSON(obj: any) {
		this.DOI = obj[Ontologyconstants.datacitePrimaryResourceIdentifier];
		this.referenceString = obj[Ontologyconstants.dctermsdescription];
		this.referenceTitle = obj[Ontologyconstants.dctermstitle];
		const authors = obj[Ontologyconstants.dccreator];
		for (let i = 0; i < authors; i++) {
			const author = authors[i];
			const person: NameOfPerson = new NameOfPerson();
			person.fillFromJSON(author);
		}
	}
	public outToJSON(): any {
		const obj = {};
		obj[Ontologyconstants.datacitePrimaryResourceIdentifier] = this.DOI;
		obj[Ontologyconstants.dctermsdescription] = this.referenceString;
		obj[Ontologyconstants.dctermstitle] = this.referenceTitle;
		obj[Ontologyconstants.dccreator] = this.authors;
		return obj;
	}
	public toString(): string {
		const str = this.DOI + '  ' + this.referenceString + ' ' + this.referenceTitle;
	return str;

	}
}