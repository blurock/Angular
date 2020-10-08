import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeitemselectionComponent } from '../treeitemselection/treeitemselection.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'app-classificationchooser',
  templateUrl: './classificationchooser.component.html',
  styleUrls: ['./classificationchooser.component.css']
})
export class ClassificationchooserComponent implements OnInit {

  @Input() treeobs: Observable<object>;
  @Input() classificationTitle: string;
  @Input() classification: string;
  @Input() allowFreeChoice: boolean;
  classtree = {};

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.treeobs.subscribe(val => {
      this.classtree = val;
    });
  }
  makeDialog() {
    const data = {
      tree: {},
      title: '',
      freechoice: true
    };
    data.tree = this.classtree;
    data.title = this.classificationTitle;
    data.freechoice = this.allowFreeChoice;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(TreeitemselectionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.classification = result;
    });

  }
  chooseClassification($event: Event) {
    this.makeDialog();
  }
}
