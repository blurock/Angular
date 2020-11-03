import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  constructor(private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  call() {
 this.snackBar.open(`Call 😢`, 'Close', {
            duration: 4000,
          });   
  }
}
