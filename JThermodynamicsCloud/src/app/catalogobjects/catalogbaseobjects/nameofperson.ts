import { Ontologyconstants } from 'systemconstants';

export class NameOfPerson {

    userTitle: string;
    givenName: string;
    familyName: string;

    public fillFromJSON(obj: any): void {
        this.userTitle = obj[Ontologyconstants.foaftitle];
        this.givenName = obj[Ontologyconstants.foafGivenName];
        this.familyName = obj[Ontologyconstants.foafFamilyName];
    }
}
