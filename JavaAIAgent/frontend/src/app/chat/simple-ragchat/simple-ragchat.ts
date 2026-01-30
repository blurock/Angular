import { Component } from '@angular/core';
import { AgentGeneric } from '../../services/agent-generic';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-simple-ragchat',
  imports: [
	CommonModule,
	FormsModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatIconModule
  ],
  templateUrl: './simple-ragchat.html',
  styleUrl: './simple-ragchat.scss',
})
export class SimpleRAGChat {
	// The prompt field bound to the input box
	userInput = '';
	
	constructor(public agentService: AgentGeneric) {
		// Initialize user and session by the agent
		this.agentService.setUserAndSession();
	}
	
	onSend(body: any) {
		// Send the body to the backend to get a response and add it to the chat
		this.agentService.sendMessage(body,'/api/agent/simplerag').subscribe({
			next: (res) => {
				try {
					const data = JSON.parse(res);
					const formalName = data.formalName;
					const confidence = data.confidence;
					const description  = data.description;
					const text = `The match is to ${formalName}: ${description}  (confidence ${confidence})`;
					this.agentService.addMessage({ role: 'assistant', text: text });
					} catch (e) {
						console.error('Error parsing response', e);
					}
					},
			error: (err) => console.error('Communication failed', err)
					});;

}
getPrompt() {
	// userInput comes from the input field bound with [(ngModel)]
	this.agentService.addMessage({ role: 'user', text: this.userInput });
	const prompt = this.userInput;
	if (!prompt.trim()) return;
	this.userInput = ''; // Reset the input field
	// Add the user's message to the UI immediately through the service
	const data = {};
	const body = {
		statius: 'initial',
		prompt: prompt,
		data: data,
		sessionId: this.agentService.getSessionId(),
		userId: this.agentService.getUserId()
	};
	this.onSend(body);
}

}
