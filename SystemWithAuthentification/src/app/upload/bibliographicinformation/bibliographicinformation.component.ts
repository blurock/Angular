import { Input, Output, EventEmitter, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetofauthorsComponent } from '../setofauthors/setofauthors.component';

@Component({
	selector: 'app-bibliographicinformation',
	templateUrl: './bibliographicinformation.component.html',
	styleUrls: ['./bibliographicinformation.component.scss']
})
export class BibliographicinformationComponent implements OnInit {

	@Input() references: FormArray;
	@Input() titleInformation: any;
	@Output() newItemEvent = new EventEmitter<FormGroup>();
	constructor(private formbuilder: FormBuilder) { }

	addreference = 'Add Reference';
	bibliolabel = 'Full Title';
	bibliohint = 'The full title of the manuscript, paper or report';
	referencelabel = 'Bibliographic Reference';
	referencehint = 'One line reference indicating publication, date, pages, etc.';
	doilabel = 'Identification';
	doihint = 'The DOI or ISBN or any other appropriate identifier';

	authorFamilylabel = 'Family Name';
	ngOnInit(): void {
	}

	addreferencegroup(): void {
		const bibliographicform = this.formbuilder.group({
			ReferenceTitle: ['', Validators.required, Validators.minLength(15)],
			ReferenceString: ['', Validators.required],
			DOI: ['', Validators.required],
			authors: this.formbuilder.array([]),
		});
		this.references.push(bibliographicform);
		this.newItemEvent.emit(bibliographicform);
	}

	referenceAuthors(empIndex: number): FormArray {
		return this.references.at(empIndex).get('authors') as FormArray;
	}

	addAuthor(author: FormGroup): void {
		const index = author.get('index').value;
		const authors = this.referenceAuthors(index);
		authors.push(author);
	}

}
