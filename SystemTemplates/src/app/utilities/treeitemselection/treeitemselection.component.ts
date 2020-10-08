import { Component, OnInit, Input, Inject } from '@angular/core';
import { TreeNode, ITreeOptions } from '@circlon/angular-tree-component';
import { MatDialogRef } from '@angular/material/dialog';


import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-treeitemselection',
  templateUrl: './treeitemselection.component.html',
  styleUrls: ['./treeitemselection.component.css']
})
export class TreeitemselectionComponent implements OnInit {

  subtitle = 'Choose title from tree';
  subtitleplusfree = 'Choose title from tree or set in new value';
  freechoicetitle = 'free value';

  classificationTitle: string;

  constructor(public dialogRef: MatDialogRef<TreeitemselectionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {

  }

  freeChoiceEntered(event: any) {
    this.choiceEntered(event.target.value);
  }
  options: ITreeOptions = {
    actionMapping: {
      mouse: {
        click: (tree: TreeNode, node: TreeNode, $event: Event) => {
          this.choiceEntered(node.displayField);
        }
      }
    }
  };

  choiceEntered(choice: string): void {
    this.dialogRef.close(choice);
  }

  cancel(event: Event): void {
this.dialogRef.close();
  }
}
