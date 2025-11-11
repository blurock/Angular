import { Component, Input, NgModule, NgModuleRef, OnInit } from '@angular/core';
import { CitationData } from './citation-data.model';
import { CrossrefService } from '../../../services/crossref.service';
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citationdisplay',
  standalone: true,
  imports: [
	CommonModule,
	FormsModule
  ],
  templateUrl: './citationdisplay.component.html',
  styleUrl: './citationdisplay.component.scss'
})
export class CitationdisplayComponent implements OnInit {
	
	  @Input() currentDoi: string = '10.1038/nrd842';
	
	  citationData: CitationData | null = null;
	  isLoading = false;
	  errorMessage: string | null = null;

	  // Input properties
	   // Example DOI
	  currentStyle: string = 'apa'; // Default style

	  constructor(private crossrefService: CrossrefService) {}

	  ngOnInit(): void {
	    // Optionally fetch initial data on component load
	    this.fetchCitation();
	  }

	  fetchCitation(): void {
	    if (!this.currentDoi) {
	      this.errorMessage = 'Please enter a DOI.';
	      return;
	    }
	    this.isLoading = true;
	    this.errorMessage = null; // Clear previous errors
	    this.citationData = null; // Clear previous data

	    this.crossrefService.getCitationData(this.currentDoi, this.currentStyle)
	      .subscribe({
	        next: (data) => {
	          this.citationData = data;
	          this.isLoading = false;
	        },
	        error: (err) => {
	          this.errorMessage = 'Failed to fetch citation data. Please check the DOI or your network connection.';
	          this.isLoading = false;
	          this.citationData = null;
	        }
	      });
	  }
}
