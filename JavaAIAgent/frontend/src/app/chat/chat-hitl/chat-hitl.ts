import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AgentHITL } from '../../services/agent-hitl';
import { HITL2Parameters } from './hitl2-parameters/hitl2-parameters';

@Component({
	selector: 'app-chat-hitl',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		HITL2Parameters
	],
	templateUrl: './chat-hitl.html',
	styleUrl: './chat-hitl.scss',
})
export class ChatHITL {
	// The prompt field bound to the input box
	userInput = '';

	// This activates the parameter input component
	showparameterinput = false;
	// The two input parameters and result
	parameter1 = '';
	parameter2 = '';
	result = '';

	// this list manipulation is done through the AgentService
	constructor(public agentService: AgentHITL) {
		// Initialize user and session by the agent
		this.agentService.setUserAndSession();
	}

	/* Main function to send the message to the backend and handle the response
	  body: the body to send to the backend API (set up by calling functions)
	  
	  - GetParameters: show the parameter input component
	  - answer: display the result in the chat
	*/
	onSend(body: any) {
		// Send the body to the backend to get a response and add it to the chat
		this.agentService.sendMessage(body).subscribe({
			next: (res) => {
				try {
					const data = JSON.parse(res);
					const status = data.status;
					if (status === 'GetParameters') {
						// Show the parameter input component
						this.showparameterinput = true;
					} else if (status === 'answer') {
						// Isolate the result
						this.result = data.result;
						const text = 'Operation(' + this.parameter1 + ', ' + this.parameter2 + ') = ' + this.result;
						// display the result in the chat
						this.agentService.addMessage({ role: 'assistant', text: text });
						// Hide the parameter input component
						this.showparameterinput = false;
					}
				} catch (e) {
					console.error('Error parsing response', e);
				}
			},
			error: (err) => console.error('Communication failed', err)
		});;
	}
	/*  Called when the user submits a prompt 
	
	1. Adds the user's message to the chat via the service
	2. Prepares the body for the backend API call (add the prompt and set status to 'new')
	3. Calls onSend to send the message to the backend
	*/
	getPrompt() {
		// userInput comes from the input field bound with [(ngModel)]
		this.agentService.addMessage({ role: 'user', text: this.userInput });
		const prompt = this.userInput;
		if (!prompt.trim()) return;
		this.userInput = ''; // Reset the input field
		// Add the user's message to the UI immediately through the service
		const data = {};
		const body = {
			status: 'new',
			task: prompt,
			data: data,
			sessionId: this.agentService.getSessionId(),
			userId: this.agentService.getUserId()
		};
		this.onSend(body);
	}
	/* Called when the parameter input component emits the parameters
	1. Prepares the body for the backend API call (add the parameters and set status to 'use')
	*/
	getParameters($event: any) {
		const data = $event;
		this.parameter1 = data.parameter1;
		this.parameter2 = data.parameter2;
		const body = {
			status: 'use',
			task: prompt,
			data: $event,
			sessionId: this.agentService.getSessionId(),
			userId: this.agentService.getUserId()
		};
		this.onSend(body);
	}

}
