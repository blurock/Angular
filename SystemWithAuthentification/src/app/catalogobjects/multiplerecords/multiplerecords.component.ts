import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiplerecords',
  templateUrl: './multiplerecords.component.html',
  styleUrls: ['./multiplerecords.component.scss']
})
export class MultiplerecordsComponent implements OnInit {
  recordtype: string;
  comment: string;
  addrecord: string;

  constructor() { }

  ngOnInit(): void {
  }

}
