import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, FormGroup, Validators } from '@angular/forms';
import { IdentifiersService } from '../../const/identifiers.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { CatalogrecordbaseComponent } from '../../primitives/catalogrecordbase/catalogrecordbase.component';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import { NavItem } from '../../primitives/nav-item';
import { MenuItemComponent } from '../../primitives/menu-item/menu-item.component';

@Component({
	selector: 'app-datasetreference',
	templateUrl: './datasetreference.component.html',
	styleUrls: ['./datasetreference.component.scss'],
	standalone: true,
	imports: [MatFormFieldModule, MatCardModule, MatIconModule,
		CommonModule, ReactiveFormsModule, MatMenuModule, MatSelectModule, MatInput,MenuItemComponent]
})
export class DatasetreferenceComponent extends CatalogrecordbaseComponent implements OnInit {


	titleinformation: Record<string, any>[] = [];

	referencesForm: FormGroup;
	referencedata: any[] = [];

	addreference = "Add Reference";
	nametitleclass = 'dataset:AuthorNameTitle';
	filled = false;
	title = 'Title';
	
	titleitems: NavItem[] = [];

	constructor(
		private formBuilder: FormBuilder,
		public identifiers: IdentifiersService,
		public menusetup: MenutreeserviceService) {
			super();
		this.referencesForm = this.newReferenceSet();
		
		
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['anno'] && changes['anno'].currentValue) {
			this.titleitems = this.menusetup.findChoices(this.annoinfo,this.nametitleclass);
			if (this.referencedata)
				this.setData(this.referencedata);
		}
	}


	ngOnInit(): void {
		this.findChoices('dataset:AuthorNameTitle');
		this.titleitems = this.menusetup.findChoices(this.annoinfo,this.nametitleclass);
	}

	newReferenceSet(): FormGroup {
		return this.formBuilder.group({
			references: this.formBuilder.array([]),
		});
	}

	get referenceset() {
		return this.referencesForm.get('references') as FormArray;
	}

	newAuthor(): FormGroup {
		return this.formBuilder.group({
			index: [''],
			AuthorFamilyName: ['', Validators.required],
			AuthorGivenName: [''],
			AuthorNameTitle: [''],
		});
	}
	get referenceform(): FormGroup {
		const objectform = this.formBuilder.group({
			DOI: ['', Validators.required],
			ReferenceString: ['', Validators.required],
			ReferenceTitle: ['', Validators.required],
			AuthorInformation: this.formBuilder.array([])
		});
		return objectform;
	}


	addreferencegroup(): void {
		const objectform = this.referenceform;
		this.referenceset.push(objectform);
	}

	override setData(refs: any[]): void {
		this.referencedata = refs;
		this.referencesForm = this.newReferenceSet();
		for(const ref of refs) {
			this.addreferencegroup();
			}
		let index = 0;
		for (const referencelocal of this.referenceset.controls) {
			const ref = refs[index];
			referencelocal.get('DOI')!.setValue(ref[this.identifiers.DOI]);
			referencelocal.get('ReferenceString')!.setValue(ref[this.identifiers.ReferenceString]);
			referencelocal.get('ReferenceTitle')!.setValue(ref[this.identifiers.ReferenceTitle]);

			const setofauthors = ref[this.identifiers.AuthorInformation] as [];
			const authorsform = referencelocal.get('AuthorInformation') as UntypedFormArray;
			let i = 0;
			for (const author of setofauthors) {
				const authorForm = this.newAuthor();
				authorForm.get('index')!.setValue(i);
				authorForm.get('AuthorGivenName')!.setValue(author[this.identifiers.AuthorGivenName]);
				authorForm.get('AuthorFamilyName')!.setValue(author[this.identifiers.AuthorFamilyName]);
				authorForm.get('AuthorNameTitle')!.setValue(author[this.identifiers.AuthorNameTitle]);
				authorsform.push(authorForm);
				i++;
			}
			index++;
		}
		
	}

	referenceAuthors(empIndex: number): UntypedFormArray {
		return this.referenceset.at(empIndex).get('AuthorInformation') as UntypedFormArray;
	}

	addNewAuthor(reference: AbstractControl<any, any>) {
		const setofauthors = reference.get('AuthorInformation') as UntypedFormArray;
		const author = this.newAuthor();
		author.get('index')?.setValue(setofauthors.length);
		setofauthors.push(author);
	}

	deleteAuthor(reference: UntypedFormArray, author: UntypedFormGroup) {
		const index = author.get('index')?.value ?? '';
		const authors = reference.get('AuthorInformation') as UntypedFormArray;
		authors.removeAt(index);
		for (let i = 0; i < authors.length; i++) {
			let author = authors.at(i);
			author.get('index')?.setValue(i);
		}

	}

	addAuthor(author: AbstractControl<any, any>): void {
		const index = author.get('index')?.value ?? '';
		const authors = this.referenceAuthors(index);
		authors.push(author);
	}

	override getData(catalog: any): void {
		const refs: any[] = [];
		catalog[this.identifiers.DataSetReference] = refs;
		for (let i = 0; i < this.referenceset.length; i++) {
			const referenceform = this.referenceset.at(i) as UntypedFormGroup;
			const ref: Record<string, any> = {};
			refs.push(ref);
			ref[this.identifiers.DOI] = referenceform.get('DOI')!.value;
			ref[this.identifiers.ReferenceString] = referenceform.get('ReferenceString')!.value;
			ref[this.identifiers.ReferenceTitle] = referenceform.get('ReferenceTitle')!.value;
			const authors = referenceform.get('AuthorInformation') as UntypedFormArray;
			const authorsarray: Record<string, any>[] = [];
			ref[this.identifiers.AuthorInformation] = authorsarray;
			for (let j = 0; j < authors.length; j++) {
				const auth: Record<string, any> = {};
				authorsarray.push(auth);
				const a = authors.at(j) as UntypedFormGroup;
				auth[this.identifiers.AuthorFamilyName] = a.get('AuthorFamilyName')?.value ?? '';
				auth[this.identifiers.AuthorGivenName] = a.get('AuthorGivenName')?.value ?? '';
				auth[this.identifiers.AuthorNameTitle] = a.get('AuthorNameTitle')?.value ?? '';
			}
		}
	}
	deleteReference(empIndex: number): void {
		this.referenceset.removeAt(empIndex);
	}

	getAuthorInformationControls(authorInformation: AbstractControl<any, any>): AbstractControl<any, any>[] {
		return this.isFormArray(authorInformation) ? authorInformation.controls : this.formBuilder.array([]).controls;
	}
	
	setTitleSelection($event: any, refindex: number, index: number): void {
		const authors = this.referenceAuthors(refindex); 
		const author = authors.at(index) as UntypedFormGroup;
			author.get('AuthorNameTitle')!.setValue($event);
		}


	isFormArray(control: AbstractControl | null): control is FormArray {
		return control instanceof FormArray;
	}
	findChoices(annoref: string): void {
		if(this.annoinfo) {
		if (!this.filled) {
			const choiceanno = this.annoinfo[annoref];
			const classification = choiceanno['classification'];
			this.title = choiceanno[this.rdfslabel];
			if (classification != null) {
				const subclasses = classification['dataset:classificationtree'];
				if (subclasses != null) {
					this.titleinformation = [];
					for (let i = 0; i < subclasses.length; i++) {
						const classelement = subclasses[i];
						const type = classelement['dataset:catalogtype'];
						const typeinfo = this.annoinfo[type];
						if (typeinfo != null) {
							const alabel = typeinfo[this.rdfslabel];
							const acomment = typeinfo[this.rdfscomment];
							const celement = { 'dc:type': type, 'rdfs:label': alabel, 'rdfs:comment': acomment };
							this.titleinformation.push(celement);
						}
					};
					this.filled = true;
				} else {
					alert('no classification tree');
					alert(JSON.stringify(classification));
				}

			} else {
				alert('No classifications');
			}
		} else {
			alert('filled false');
		}
		}
	}

}
