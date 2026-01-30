export interface AgentJsonResponse {
  status: 'SUCCESS' | 'INTERRUPT' | 'ERROR';
  message: string;
  sessionId: string;
  interruptData?: {
    toolName: string;
    arguments: any;
  };
}
