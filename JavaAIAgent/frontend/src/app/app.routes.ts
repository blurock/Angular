import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { SimpleChat } from './chat/simple-chat/simple-chat';
import { ChatHITL } from './chat/chat-hitl/chat-hitl';
import { SimpleRAGChat } from './chat/simple-ragchat/simple-ragchat';

export const routes: Routes = [
	{ path: '', component: AppComponent },
	{ path: 'simplerag', component: SimpleRAGChat },
	{ path: 'chat-hitl', component: ChatHITL },
	{ path: 'simple', component: SimpleChat }
];
