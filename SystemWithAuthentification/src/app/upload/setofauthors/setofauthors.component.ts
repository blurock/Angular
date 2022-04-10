import { EventEmitter, Input, Output, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'app-setofauthors',
	templateUrl: './setofauthors.component.html',
	styleUrls: ['./setofauthors.component.scss']
})
export class SetofauthorsComponent implements OnInit {

	@Input() index: number;
	@Output() newItemEvent = new EventEmitter<FormGroup>();

	authors: FormArray;

	addauthor = 'Add Author';

	authorfamilynamelabel = 'Family Name';
	authorgivennamelabel = 'Given Name';
	authorgivennamehint = 'this includes middle and and initials';
	authortitle = 'Title';

	constructor(private formBuilder: FormBuilder) { }

	public setAuthors(authors: FormArray): void {
		this.authors = authors;
	}
	newAuthor(): FormGroup {
		return this.formBuilder.group({
			index: [''],
			AuthorFamilyName: ['', Validators.required],
			AuthorGivenName: [''],
			AuthorNameTitle: [''],
		});
	}

	addAuthor(): void {
		const author = this.newAuthor();
		author.get('index').setValue(this.index);
		this.authors.push(author);
		this.newItemEvent.emit(author);
	}

	ngOnInit(): void {
		this.authors = new FormArray([]);
	}
}
