import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GravityFormComponent } from '../components/calculate/gravity-form.component';
import { ScienceAgentService } from '../services/science-agent-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, GravityFormComponent,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	showGravityForm = false;
	userInput = ''; // Added to fix [(ngModel)]
	  currentSessionId = '';
	  
	  @ViewChild('scrollContainer') private scrollContainer?: ElementRef;
	  
	  constructor(public agentService: ScienceAgentService) {}

	  ngOnInit() {
	      // Listen for interrupts to ensure we have the latest sessionId
	      this.agentService.interrupt$.subscribe(data => {
	        this.currentSessionId = data.sessionId;
	        // Note: We don't set showGravityForm here because your HTML 
	        // renders the form inside the message loop based on 'isInterrupt'
	      });
	    }

		onSend() { // No parameter needed
		  const textToSend = this.userInput;
		  if (!textToSend.trim()) return;
		  
		  this.userInput = ''; // Reset the input field
		  
		  // Add the user's message to the UI immediately
		  this.agentService.addMessage({ role: 'user', text: textToSend });

		  this.agentService.sendMessage(textToSend, this.currentSessionId).subscribe({
		    next: (res) => {
				alert("onSend() status" + res.status);
				console.log("onSend() status" + res.status);
		      if (res.status === 'INTERRUPT') {
		        this.agentService.addMessage({
		          role: 'assistant',
		          text: 'I need some specific numbers to calculate the gravitational force accurately.',
		          isInterrupt: true,
		          toolName: res.tool,
		          initialArgs: res.initialArgs
		        });
		        this.currentSessionId = res.sessionId;
		      } else {
				console.log("onSend() normal response: " + res.text);
		        this.agentService.addMessage({ role: 'assistant', text: res.text });
		      }
		    },
		    error: (err) => console.error('Communication failed', err)
		  });
		}
	  
		  handleFormSubmit(formData: any) {
		      this.agentService.resumeAgent(formData, this.currentSessionId).subscribe(res => {
		        // Find the last interrupt message and "resolve" it or just add the new response
		        // Typically, you'd hide the form or replace it with the calculation result
		        this.agentService.addMessage({ role: 'assistant', text: res.text });
		        this.scrollToBottom();
		      });
		    }

		    private scrollToBottom(): void {
			
		      setTimeout(() => {
				if(this.scrollContainer) {
					this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
				}
		        
		      }, 100);
			  
		    }
	}