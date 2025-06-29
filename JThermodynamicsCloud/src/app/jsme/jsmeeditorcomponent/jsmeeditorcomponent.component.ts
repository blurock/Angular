import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone

// Declare the JSME global variable to inform TypeScript
// This assumes JSME has been loaded globally, e.g., via a script tag
// in index.html or included in the 'scripts' array in angular.json
declare var JSApplet: any;

interface Window { jsmeApplet: any; };

@Component({
  selector: 'app-jsme-editor',
  standalone: true, // Mark as a standalone component (Angular 14+)
  imports: [CommonModule], // Import necessary modules for standalone
  template: `
    <!--div #jsmeContainer [style.width]="width" [style.height]="height" [style.border]="'1px solid #ccc'">
      <p *ngIf="!jsmeLoaded" class="p-4 text-center text-gray-500">Loading JSME Editor...</p>
    </div -->
    <html>

<head>
    <script type="text/javascript" language="javascript" src="jsme/jsme.nocache.js"></script>
  <script>
    // Force the module base to be /assets/jsme/
    if (window.jsme) {
      window.jsme.__moduleBase = '/assets/jsme/';
    }
  </script>

    <script>
        //this function will be called after the JavaScriptApplet code has been loaded.
        function jsmeOnLoad() {
            jsmeApplet = new JSApplet.JSME("jsme_container", "380px", "340px");
        }
    </script>
</head>

<body>
<div #jsmeContainer id="jsme_container"></div>

</body>
</html>
  `,
  styles: [`
    /* Add any component-specific styles here if needed */
    :host {
      display: block; /* Ensure the component takes up block space */
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush // Use OnPush for better performance
})
export class JsmeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
	
	private jsmeScriptElement: HTMLScriptElement | null = null;
	jsmeInstance: any;

  // --- Inputs ---
  @Input() width: string = '500px'; // Default width
  @Input() height: string = '400px'; // Default height
  @Input() jsmeOptions: string = 'depict'; // Default JSME options (can be customized)
  // Example: "depict, hydrogencarbons, labels, atommovebutton, bondmovebutton, deletemovebutton, query, multipart, number"
  @Input() initialMolfile: string | null = null; // Optional initial molecule structure in Molfile format
  @Input() initialSmiles: string | null = null; // Optional initial molecule structure in SMILES format

  // --- View Child ---
  // Get a reference to the div element where JSME will be rendered
  @ViewChild('jsmeContainer') jsmeContainer!: ElementRef<HTMLDivElement>;

  // --- Private Properties ---
  private jsmeAppletInstance: any = null; // Holds the JSME instance
  public jsmeLoaded: boolean = false; // Flag to track if JSME is initialized

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Component initialization logic (if any needed before view is ready)
    console.log('JSME Component OnInit');
  }

  ngAfterViewInit(): void {
    // This lifecycle hook ensures the view (and #jsmeContainer) is ready
    console.log('JSME Component AfterViewInit');
    //this.loadJsmeEditor();
  }
  loadJsmeScript(scriptUrl: string): void {
    this.jsmeScriptElement = document.createElement('script');
    this.jsmeScriptElement.src = scriptUrl;
    this.jsmeScriptElement.type = 'text/javascript';
    this.jsmeScriptElement.async = true; // Or false, depending on your needs

    document.head.appendChild(this.jsmeScriptElement);
  }


  ngOnDestroy(): void {
    // Cleanup logic if needed when the component is destroyed
    // JSME doesn't typically require explicit cleanup if the container div is removed,
    // but setting the instance to null is good practice.
    console.log('JSME Component OnDestroy');
    this.jsmeAppletInstance = null;
    this.jsmeLoaded = false;
  }

  /**
   * Loads and initializes the JSME editor instance.
   */
  private loadJsmeEditor(): void {
    // Check if JSME library is loaded globally
    if (typeof JSApplet === 'undefined') {
      console.error('JSME library (JSApplet) not found. Make sure it is loaded globally (e.g., in index.html or angular.json scripts).');
      //return;
    }

    // Ensure the container is available
    if (!this.jsmeContainer || !this.jsmeContainer.nativeElement) {
        console.error('JSME container element not found.');
        return;
    }
    

    try {
      // Create a unique ID for the applet instance if needed, or use a fixed one if only one editor exists
      const appletId = `jsmeApplet_${Date.now()}`; // Simple unique ID

      // Initialize JSME within the container div
      this.jsmeAppletInstance = new JSApplet.JSME(
        this.jsmeContainer.nativeElement, // Target DOM element
        this.width,                      // Width
        this.height,                     // Height
        {                                // Configuration object
          options: this.jsmeOptions
          // Add other JSME configuration options here if needed
        }
      );

      console.log('JSME Instance created:', this.jsmeAppletInstance);

      // Load initial structure if provided
      if (this.initialMolfile) {
        this.jsmeAppletInstance.readMolFile(this.initialMolfile);
        console.log('Loaded initial Molfile');
      } else if (this.initialSmiles) {
        this.jsmeAppletInstance.readGenericMolecularInput(this.initialSmiles);
        console.log('Loaded initial SMILES');
      }

      this.jsmeLoaded = true;
      this.cdRef.markForCheck(); // Notify Angular that changes occurred

    } catch (error) {
      console.error('Error initializing JSME editor:', error);
      this.jsmeLoaded = false;
       this.cdRef.markForCheck();
    }
  }

  /**
   * Public method to retrieve the current molecule structure as a Molfile string.
   * @returns {string} The Molfile representation of the molecule, or an empty string if JSME is not loaded.
   */
  public getMolfile(): string {
	if (window['jsmeApplet']) {
      this.jsmeInstance = window['jsmeApplet'];
      console.log('JSME Applet instance:', this.jsmeInstance);
      console.log(this.jsmeInstance.molFile(false));
      // Now you can call methods on this.jsmeInstance
      // For example:
      // this.jsmeInstance.setSmiles("CCO");
    } else {
      console.error('JSME Applet instance not found.');
    }
  
	

    if (this.jsmeAppletInstance && this.jsmeLoaded) {
      try {
        return this.jsmeAppletInstance.molFile();
      } catch (error) {
        console.error('Error getting Molfile from JSME:', error);
        return ''; // Return empty string on error
      }
    } else {
      console.warn('JSME instance not available to get Molfile.');
      return ''; // Return empty string if JSME is not ready
    }
  }

  /**
   * Public method to retrieve the current molecule structure as a SMILES string.
   * @returns {string} The SMILES representation of the molecule, or an empty string if JSME is not loaded.
   */
  public getSmiles(): string {
    if (this.jsmeAppletInstance && this.jsmeLoaded) {
       try {
        return this.jsmeAppletInstance.smiles();
      } catch (error) {
        console.error('Error getting SMILES from JSME:', error);
        return ''; // Return empty string on error
      }
    } else {
      console.warn('JSME instance not available to get SMILES.');
      return ''; // Return empty string if JSME is not ready
    }
  }

  /**
   * Public method to reset the editor to an empty state.
   */
  public resetEditor(): void {
    if (this.jsmeAppletInstance && this.jsmeLoaded) {
       try {
        this.jsmeAppletInstance.reset();
      } catch (error) {
        console.error('Error resetting JSME editor:', error);
      }
    } else {
      console.warn('JSME instance not available to reset.');
    }
  }

}
