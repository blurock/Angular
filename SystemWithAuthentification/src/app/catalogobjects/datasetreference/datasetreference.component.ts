import { Input, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentifiersService } from '../../const/identifiers.service';
import { Ontologyconstants } from '../../const/ontologyconstants';

@Component({
	selector: 'app-datasetreference',
	templateUrl: './datasetreference.component.html',
	styleUrls: ['./datasetreference.component.scss']
})
export class DatasetreferenceComponent implements OnInit {

	titleinformation = [];

	references: FormArray;

	@Input() anno: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';

	addreference = "Add Reference";
	filled = false;
	title = 'Title';

	constructor(
		private formBuilder: FormBuilder,
		public identifiers: IdentifiersService) { }

	ngOnInit(): void {
		this.references = new FormArray([]);
		this.findChoices('dataset:AuthorNameTitle');

	}
	newAuthor(): FormGroup {
		return this.formBuilder.group({
			index: [''],
			AuthorFamilyName: ['', Validators.required],
			AuthorGivenName: [''],
			AuthorNameTitle: [''],
		});
	}
	referenceform(): FormGroup {
		const objectform = this.formBuilder.group({
			DOI: ['', Validators.required],
			ReferenceString: ['', Validators.required],
			ReferenceTitle: ['', Validators.required],
			AuthorInformation: this.formBuilder.array([])
		});
		return objectform;
	}


	addreferencegroup(): void {
		const objectform = this.referenceform();
		this.references.push(objectform);
	}
	public setData(refs: []): void {
		this.references = new FormArray([]);
		for (const ref of refs) {
			const objectform = this.referenceform();
			objectform.get('DOI').setValue(ref[this.identifiers.DOI]);
			objectform.get('ReferenceString').setValue(ref[this.identifiers.ReferenceString]);
			objectform.get('ReferenceTitle').setValue(ref[this.identifiers.ReferenceTitle]);

			const setofauthors = ref[this.identifiers.AuthorInformation] as [];
			const authorsform = objectform.get('AuthorInformation') as FormArray;
			let i = 0;
			for (const author of setofauthors) {
				const authorForm = this.newAuthor();
				authorForm.get('index').setValue(i);
				authorForm.get('AuthorGivenName').setValue(author[this.identifiers.AuthorGivenName]);
				authorForm.get('AuthorFamilyName').setValue(author[this.identifiers.AuthorFamilyName]);
				authorForm.get('AuthorNameTitle').setValue(author[this.identifiers.AuthorNameTitle]);
				authorsform.push(authorForm);
				i++;
			}
			this.references.push(objectform);
		}
	}

	referenceAuthors(empIndex: number): FormArray {
		return this.references.at(empIndex).get('AuthorInformation') as FormArray;
	}

	addNewAuthor(reference: FormGroup) {
		const setofauthors = reference.get('AuthorInformation') as FormArray;
		const author = this.newAuthor();
		author.get('index').setValue(setofauthors.length);
		setofauthors.push(author);
	}

	deleteAuthor(reference: FormArray, author: FormGroup) {
		const index = author.get('index').value;
		const authors = reference.get('AuthorInformation') as FormArray;
		authors.removeAt(index);
		for (let i = 0; i < authors.length; i++) {
			let author = authors.at(i);
			author.get('index').setValue(i);
		}

	}

	addAuthor(author: FormGroup): void {
		const index = author.get('index').value;
		const authors = this.referenceAuthors(index);
		authors.push(author);
	}

	public getData(catalog: any): void {
		const refs = [];
		catalog[this.identifiers.DataSetReference] = refs;
		for (let i = 0; i < this.references.length; i++) {
			const referenceform = this.references.at(i) as FormGroup;
			const ref = {};
			refs.push(ref);
			ref[this.identifiers.DOI] = referenceform.get('DOI').value;
			ref[this.identifiers.ReferenceString] = referenceform.get('ReferenceString').value;
			ref[this.identifiers.ReferenceTitle] = referenceform.get('ReferenceTitle').value;
			const authors = referenceform.get('AuthorInformation') as FormArray;
			const authorsarray = [];
			ref[this.identifiers.AuthorInformation] = authorsarray;
			for (let j = 0; j < authors.length; j++) {
				const auth = {};
				authorsarray.push(auth);
				const a = authors.at(j) as FormGroup;
				auth[this.identifiers.AuthorFamilyName] = a.get('AuthorFamilyName').value;
				auth[this.identifiers.AuthorGivenName] = a.get('AuthorGivenName').value;
				auth[this.identifiers.AuthorNameTitle] = a.get('AuthorNameTitle').value;
			}
		}
	}
	deleteReference(empIndex: number): void {
		this.references.removeAt(empIndex);
	}


	findChoices(annoref: string): void {
		if (!this.filled) {
			const choiceanno = this.anno[annoref];
			const classification = choiceanno['classification'];
			this.title = choiceanno[this.rdfslabel];
			if (classification != null) {
				const subclasses = classification['dataset:classificationtree'];
				if (subclasses != null) {
					this.titleinformation = [];
					for (let i = 0; i < subclasses.length; i++) {
						const classelement = subclasses[i];
						const type = classelement['dataset:catalogtype'];
						const typeinfo = this.anno[type];
						if (typeinfo != null) {
							const alabel = typeinfo[this.rdfslabel];
							const acomment = typeinfo[this.rdfscomment];
							const celement = { 'dc:type': type, 'rdfs:label': alabel, 'rdfs:comment': acomment };
							this.titleinformation.push(celement);
						}
					};
					this.filled = true;
				} else {
					alert("no classification tree");
					alert(JSON.stringify(classification));
				}

			} else {
				alert("No classifications");
			}
		} else {
			alert('filled false');
		}
	}

}
