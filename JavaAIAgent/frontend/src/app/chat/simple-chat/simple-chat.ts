import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgentService } from '../../services/agent';

@Component({
  selector: 'app-simple-chat',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],

  templateUrl: './simple-chat.html',
  styleUrl: './simple-chat.scss',
})
export class SimpleChat {
	userInput = ''; 
	
	// For simplicity, using a fixed session and user ID here
	currentSessionId = 'session123';
	userID = 'user1';
	
	// this list manipulation is done through the AgentService
	constructor(public agentService: AgentService) {}
	
	onSend() { 
		// userInput comes from the input field bound with [(ngModel)]
	  const textToSend = this.userInput;
	  if (!textToSend.trim()) return;
	  
	  this.userInput = ''; // Reset the input field
	  
	  // Add the user's message to the UI immediately through the service
	  this.agentService.addMessage({ role: 'user', text: textToSend });
	// Send the message to the backend to get a response and add it to the chat
	  this.agentService.sendMessage(textToSend, this.userID, this.currentSessionId).subscribe({
	    next: (res) => {
	        this.agentService.addMessage({ role: 'assistant', text: res.message });
	    },
	    error: (err) => console.error('Communication failed', err)
	  });
	}

}
