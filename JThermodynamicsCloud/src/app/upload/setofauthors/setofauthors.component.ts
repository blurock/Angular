import { EventEmitter, Input, Output, Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'app-setofauthors',
	templateUrl: './setofauthors.component.html',
	styleUrls: ['./setofauthors.component.scss']
})
export class SetofauthorsComponent implements OnInit {

	@Input() index: number;
	@Input() titleInformation: any;
	@Output() newItemEvent = new EventEmitter<UntypedFormGroup>();
	@Output() deleteItemEvent = new EventEmitter<UntypedFormGroup>();

	authors: UntypedFormArray;

	addauthor = 'Add Author';

	authorfamilynamelabel = 'Family Name';
	authorgivennamelabel = 'Given Name';
	authorgivennamehint = 'this includes middle and and initials';
	authortitle = 'Title';

	constructor(private formBuilder: UntypedFormBuilder) { }

	public setAuthors(authors: UntypedFormArray): void {
		this.authors = authors;
	}
	newAuthor(): UntypedFormGroup {
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
	
	deleteAuthor(authorIndex: number): void {
		this.authors.removeAt(authorIndex);
	}

	ngOnInit(): void {
		this.authors = new UntypedFormArray([]);
	}
}
