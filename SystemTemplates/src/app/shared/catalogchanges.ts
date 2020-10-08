export class CatalogChanges {
    catalogObject: string;
    labels: string[];

    constructor(catalogobject: string) {
        this.catalogObject = catalogobject;
    }

    add(label: string) {
        this.labels.push(label);
    }

}