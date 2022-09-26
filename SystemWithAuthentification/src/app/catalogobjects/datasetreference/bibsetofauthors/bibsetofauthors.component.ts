import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { OntologycatalogService } from 'src/app/services/ontologycatalog.service';
import {UploadmenuserviceService} from 'src/app/services/uploadmenuservice.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';

@Component({
	selector: 'app-bibsetofauthors',
	templateUrl: './bibsetofauthors.component.html',
	styleUrls: ['./bibsetofauthors.component.scss']
})
export class BibsetofauthorsComponent implements OnInit {

	authors: FormArray;
	selectedtitle: any;

	@Input() anno: any;

	addauthor = 'Add Author';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = 'rdfs:comment';
    titleinformation = [
		{
			'dc:type': 'dataset:Professor',
			'rdfs:label': 'Prof.',
			'rdfs:comment': 'the academic rank of professor in a university or other institution'
		},
		{
			'dc:type': 'dataset:Eur_Ing',
			'rdfs:label': 'Eur Ing',
			'rdfs:comment': 'engineers registered as European Engineers with the European Federation of National Engineering Associations'
		},
		{
			'dc:type': 'dataset:Doctor',
			'rdfs:label': 'Dr.',
			'rdfs:comment': 'Academic title of doctor or Ph.D'
		},
		 {
			 'dc:type': 'dataset:Mister',
			'rdfs:label': 'Mr.',
			'rdfs:comment': 'Mister'
		},
		{
			'dc:type': 'dataset:Ms',
			'rdfs:label': 'Ms.',
			'rdfs:comment': 'Ms.'
		},
		{
			'dc:type': 'Lord',
			'rdfs:label': 'Lord',
			'rdfs:comment': 'male barons, viscounts, earls, and marquesses, as well as some of their children'
		}
		]


	constructor(
		private formBuilder: FormBuilder,
		private annotations: OntologycatalogService,
		public identifiers: IdentifiersService) {
	}

	ngOnInit(): void {
	}

	newAuthor(): FormGroup {
		return this.formBuilder.group({
			index: [''],
			AuthorFamilyName: ['', Validators.required],
			AuthorGivenName: [''],
			AuthorNameTitle: ['']
		});
	}

	addAuthor(): void {
		const author = this.newAuthor();
		this.authors.push(author);
	}

	setData(authors: []) {
    for(let author of authors) {
		const authorform = this.newAuthor();
		authorform.get('AuthorFamilyName').setValue(author[this.identifiers.AuthorFamilyName]);
		authorform.get('AuthorGivenName').setValue(author[this.identifiers.AuthorGivenName]);
		//authorform.get('AuthorNameTitle').setValue(author[this.identifiers.AuthorNameTitle]);
		this.authors.push(authorform);
		}
	}

 settitle($event): void {
	 alert("Choice selected: " + JSON.stringify($event));
	 //authorform.get('AuthorNameTitle').setValue('');
 }
}
