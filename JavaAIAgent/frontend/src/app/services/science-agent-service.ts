import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScienceAgentService {
  // A stream that the component will subscribe to for interrupts
  private interruptSource = new Subject<{tool: string, sessionId: string}>();
  interrupt$ = this.interruptSource.asObservable();

  constructor(private http: HttpClient) {}

  private messageList = signal<any[]>([]); // Using Angular Signals or a simple array
  messages = this.messageList.asReadonly();

  addMessage(msg: any) {
    this.messageList.update(current => [...current, msg]);
  }

  clearChat() {
    this.messageList.set([]);
  }
  sendMessage(text: string, sessionId: string): Observable<any> {
    const body = { 
      prompt: text, 
      sessionId: sessionId || null // Ensure sessionId isn't 'undefined'
    };
    
    // Explicitly set headers if your server is strict
    return this.http.post<any>('/api/agent/ask', body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // This handles the user clicking "Calculate" on the Angular form
  resumeAgent(toolData: any, sessionId: string): Observable<any> {
    return this.http.post<any>('/api/agent/resume', { 
      data: toolData, 
      sessionId: sessionId 
    });
  }

  // Call this when the HTTP response status is 'INTERRUPT'
  triggerInterrupt(tool: string, sessionId: string) {
    this.interruptSource.next({ tool, sessionId });
  }
}
