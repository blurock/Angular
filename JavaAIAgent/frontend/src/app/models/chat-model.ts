export interface ChatMessage {
  role: 'user' | 'agent';
  text: string;
  }

export interface GravityArgs {
  mass1?: number;
  mass2?: number;
  distance?: number;
}
