import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gravity-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card class="form-card">
      <mat-card-subtitle>Calculation Parameters</mat-card-subtitle>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Mass 1 (kg)</mat-label>
          <input matInput type="number" [(ngModel)]="formData.mass1">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Mass 2 (kg)</mat-label>
          <input matInput type="number" [(ngModel)]="formData.mass2">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Distance (m)</mat-label>
          <input matInput type="number" [(ngModel)]="formData.distance">
        </mat-form-field>
      </div>
      <mat-card-actions align="end">
        <button mat-raised-button color="primary" (click)="submit()">
          Calculate Force
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .form-card { margin: 10px 0; border-left: 4px solid #3f51b5; background: #fafafa; }
    .form-row { display: flex; gap: 10px; padding: 10px; flex-wrap: wrap; }
    mat-form-field { flex: 1; min-width: 120px; }
  `]
})
export class GravityFormComponent implements OnInit {
  @Input() initialData: any; // Data from the AI (arg0, arg1, etc or mass1, mass2)
  @Output() confirmed = new EventEmitter<any>();

  formData = {
    mass1: 0,
    mass2: 0,
    distance: 1
  };

  ngOnInit() {
    if (this.initialData) {
      // Map incoming AI arguments to our form fields
      // Handles both generic arg0/1 and named parameters
      this.formData.mass1 = this.initialData.mass1 || this.initialData.arg0 || 0;
      this.formData.mass2 = this.initialData.mass2 || this.initialData.arg1 || 0;
      this.formData.distance = this.initialData.distance || this.initialData.arg2 || 1;
    }
  }

  submit() {
    this.confirmed.emit(this.formData);
  }
}