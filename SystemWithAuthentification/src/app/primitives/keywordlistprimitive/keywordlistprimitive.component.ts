import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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
  @Input() keywordparameter: string;
  constructor() {
  }

  ngOnInit(): void {
    this.setData(this.keywordparameter);
  }

  setData(keywords: string): void {

    let num = 0;
    const keys = keywords.split(',');
    for (num = 0; num < keys.length; num++) {
      this.keywords.push(keys[num].trim());
    }
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
