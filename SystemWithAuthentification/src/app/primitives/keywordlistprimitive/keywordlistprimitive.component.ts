import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
	selector: 'app-keywordlistprimitive',
	templateUrl: './keywordlistprimitive.component.html',
	styleUrls: ['./keywordlistprimitive.component.scss']
})
export class KeywordlistprimitiveComponent implements OnInit {
	selectable = true;
	removable = true;
	visible = true;
	addOnBlur = true;
	separatorKeysCodes: number[] = [ENTER, COMMA];
	keywords: string[] = [];

	keywordtitle: string;
	constructor() {
	}

	ngOnInit(): void {
	}

	setKeys(keys: []): void {
		if (keys != null) {
			this.keywords = [];
			if (keys.length > 0) {
				for (let num = 0; num < keys.length; num++) {
					this.keywords.push(keys[num]);
				}
			}
		}
	}
	
	getKeys(): any {
		var keys = [];
		for (let key of this.keywords) {
				keys.push(key);
		}
		return keys;
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our keyword
		if ((value || '').trim()) {
			this.keywords.push(value.trim());
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	remove(keyword: string): void {
		const index = this.keywords.indexOf(keyword);
		if (index >= 0) {
			this.keywords.splice(index, 1);
		}
	}

}
