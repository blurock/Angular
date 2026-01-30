
import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgentJsonResponse } from "../models/agent-response";
import { ChatMessage } from "../models/chat-model";
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AgentService {
	// List of messages stored as a signal
	private messageList = signal<any[]>(this.loadMessages());
	messages = this.messageList.asReadonly();
	// storage of session ID
	sessionId = signal<string | null>(sessionStorage.getItem('agent_session'));
	
	constructor(private http: HttpClient) {
		// This 'effect' automatically runs whenever messages or sessionId change
		effect(() => {
			sessionStorage.setItem('agent_messages', JSON.stringify(this.messageList()));
			if (this.sessionId()) {
				sessionStorage.setItem('agent_session', this.sessionId()!);
			}
		});
	}
	// Retrieve messages from sessionStorage
	// Note that the session is updated by the effect defined in the constructor
	private loadMessages(): ChatMessage[] {
		const saved = sessionStorage.getItem('agent_messages');
		return saved ? JSON.parse(saved) : [];
	}
	// This is called to clear the chat history (from session and the list itself)
	clearChat() {
		sessionStorage.clear();
		this.messageList.set([]);
	}
	// This is the main function to send a message to the backend agent API
	// For this simple chat the endpoint is /api/agent/simple
	sendMessage(prompt: string, userId: string, sessionId: string): Observable<AgentJsonResponse>  {
		const body = {
			prompt: prompt,
			sessionId: sessionId,
			userId: userId
		};
		return this.http.post<AgentJsonResponse>('/api/agent/simple', body, {
		  headers: { 'Content-Type': 'application/json' }
		});

	}
	// Add a message to the list (this is called by the chat  component)
	addMessage(msg: any) {
	  this.messageList.update(current => [...current, msg]);
	}

}