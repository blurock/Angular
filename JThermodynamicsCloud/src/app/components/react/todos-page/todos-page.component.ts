import { Component, OnInit } from '@angular/core';
import Select from 'react-select';
import type { ComponentProps } from 'react';
@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
  template: `
    <h1>Todos page</h1>
    <button (click)="changeProps()">Change</button>
    <div [reactComponent]="Select" [props]="selectProps"></div>
    `
})
export class TodosPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  Select = Select;
  selectProps: ComponentProps<Select> = {
    onChange(v) {
      console.log(v)
    },
    options: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
  }
  
  changeProps() {
    this.selectProps = {
      ...this.selectProps,
      options: [{ value: 'changed', label: 'Changed' }]
    }
  }
}
