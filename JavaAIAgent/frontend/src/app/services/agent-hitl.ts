import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { ChatMessage } from '../models/chat-model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentHITL {
	// List of messages stored as a signal
	private messageList = signal<any[]>(this.loadMessages());
	messages = this.messageList.asReadonly();
	// storage of session ID
	
	userId: string = '';
	sessionId: string = '';
	
	constructor(private http: HttpClient, private router: Router) {
	}
	
	setUserAndSession() {
		this.userId = 'user123';
		this.sessionId = new Date().getTime().toString();
	}
	public getSessionId(): string {
		return this.sessionId;
		}
	public getUserId(): string {
		return this.userId;
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
	sendMessage(body: any): Observable<any>  {
		return this.http.post<any>('/api/agent/simplehitl', body, {
		  headers: { 'Content-Type': 'application/json' }
		})

	}
	// Add a message to the list (this is called by the chat  component)
	addMessage(msg: any) {
	  this.messageList.update(current => [...current, msg]);
	}
}
