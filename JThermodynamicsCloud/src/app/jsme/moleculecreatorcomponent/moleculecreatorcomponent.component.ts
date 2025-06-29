import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsmeEditorComponent } from '../jsmeeditorcomponent/jsmeeditorcomponent.component'

@Component({
  selector: 'app-molecule-creator', // Your parent component selector
  standalone: true,
  imports: [CommonModule, JsmeEditorComponent], // Import the JSME component here
  templateUrl: './moleculecreatorcomponent.component.html', // Link to the HTML template above
})
export class MoleculeCreatorComponent implements AfterViewInit {

  // Get a reference to the JsmeEditorComponent instance in the template
  @ViewChild('jsmeEditorInstance') jsmeEditor!: JsmeEditorComponent;
  // @ViewChild('jsmeEditorWithOptions') jsmeEditorWithOptions!: JsmeEditorComponent; // If using the second example

  currentMolfile: string | null = null;
  currentSmiles: string | null = null;

  ngAfterViewInit(): void {
      // You can access the editor instance here if needed after the view is initialized
      // Example: Set initial data programmatically if not using @Input
      // setTimeout(() => { // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError if needed
      //   if (this.jsmeEditor) {
      //      console.log("Parent component accessing JSME editor instance.");
      //   }
      // }, 0);
  }


  logMolfile(): void {
    if (this.jsmeEditor) {
      this.currentMolfile = this.jsmeEditor.getMolfile();
      console.log('Retrieved Molfile:', this.currentMolfile);
      this.currentSmiles = null; // Clear smiles display
    } else {
        console.error("JSME Editor instance not found!");
    }
  }

  logSmiles(): void {
     if (this.jsmeEditor) {
      this.currentSmiles = this.jsmeEditor.getSmiles();
      console.log('Retrieved SMILES:', this.currentSmiles);
      this.currentMolfile = null; // Clear molfile display
    } else {
        console.error("JSME Editor instance not found!");
    }
  }

   resetEditor(): void {
     if (this.jsmeEditor) {
        this.jsmeEditor.resetEditor();
        this.currentMolfile = null;
        this.currentSmiles = null;
        console.log('Editor reset requested.');
    } else {
        console.error("JSME Editor instance not found!");
    }
  }

  // --- Methods for the second example editor (if used) ---
  /*
  logMolfileWithOptions(): void {
    if (this.jsmeEditorWithOptions) {
      const molfile = this.jsmeEditorWithOptions.getMolfile();
      console.log('Retrieved Molfile (Options Editor):', molfile);
      alert('Molfile logged to console.'); // Simple feedback
    }
  }
  */
}
