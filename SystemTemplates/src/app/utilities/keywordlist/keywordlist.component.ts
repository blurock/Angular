import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-keywordlist',
  templateUrl: './keywordlist.component.html',
  styleUrls: ['./keywordlist.component.css']
})


export class KeywordlistComponent implements OnInit {

  selectable = true;
  removable = true;
    visible = true;
    addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywords: string[] = [];

  keywordtitle: string;
  @Input() keywordparameter: Observable<any>;
  constructor() { }

  ngOnInit(): void {
    this.keywordparameter.subscribe(val => {
      alert("keyword: " + val["rdfs:label"]);
      this.keywordtitle = val["rdfs:label"];
    });
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
