import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentHITL } from '../../../services/agent-hitl';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hitl2-parameters',
  standalone: true,
  imports: [
	CommonModule,
	MatCardModule,
	MatGridListModule,
	ReactiveFormsModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule
  ],
  templateUrl: './hitl2-parameters.html',
  styleUrl: './hitl2-parameters.scss',
})
export class HITL2Parameters {
	
	objectform: FormGroup;
	// this event emitter sends the parameters to the parent component
	@Output() parameters = new EventEmitter<any>();
	
	constructor(
		private formBuilder: FormBuilder,
		public agentService: AgentHITL
	) {
		// The two input parameters form
		this.objectform = this.formBuilder.group({
			parameter1: ['', Validators.required],
			parameter2: ['', Validators.required]
		});
	}
	invalid(): boolean {
		// Return true if all the field have values
		var ans = this.objectform.invalid;
		return ans;
	}
	/* Submit the parameters when the user clicks the submit button
	*/
	submit() {
		if (this.objectform.valid) {
			const param1 = this.objectform.get('parameter1')?.value;
			const param2 = this.objectform.get('parameter2')?.value;
			// Here you can handle the parameters as needed
			const data = { parameter1: param1, parameter2: param2 };
			this.parameters.emit(data);
		  } else {
			console.log('Form is invalid');
		}
	}
	
}
