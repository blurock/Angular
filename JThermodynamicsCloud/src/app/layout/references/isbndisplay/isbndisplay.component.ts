import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { CitationData } from '../citationdisplay/citation-data.model';
import { IsbnService } from '../../../services/isbn.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-isbndisplay',
  standalone: true,
  imports: [
	CommonModule,
	FormsModule

  ],
  templateUrl: './isbndisplay.component.html',
  styleUrl: './isbndisplay.component.scss'
})
export class IsbndisplayComponent implements AfterViewInit {
	citationData: CitationData | null = null;
	  isLoading = false;
	  errorMessage: string | null = null;
	  
	  // Use a string to capture user input
	  @Input() currentISBN: string = '';

	  constructor(private isbnService: IsbnService) {
		this.fetchCitation();
	  }
	  
	  ngAfterViewInit(): void {
		this.fetchCitation();
	    }

	  fetchCitation(): void {
	    if (!this.currentISBN) {
	      this.errorMessage = 'Please enter an ISBN.';
	      return;
	    }

	    this.isLoading = true;
	    this.errorMessage = null; 
	    this.citationData = null; 

	    this.isbnService.getCitationData(this.currentISBN)
	      .subscribe({
	        next: (data) => {
	          this.citationData = data;
	          this.isLoading = false;
	        },
	        error: (err) => {
	          this.errorMessage = 'Failed to fetch book data. Please check the ISBN or service connection.';
	          this.isLoading = false;
	          this.citationData = null;
	        }
	      });
	  }
}
