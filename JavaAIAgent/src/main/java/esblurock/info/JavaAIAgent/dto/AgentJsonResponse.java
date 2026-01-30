package esblurock.info.JavaAIAgent.dto;

import java.util.Map;

public class AgentJsonResponse {
	public String status;
	public String message;
	public String sessionId;
	public Map<String, Object> interruptData; // Holds toolName and arguments

	// Default constructor for Jackson deserialization
	public AgentJsonResponse() {
	}

	public AgentJsonResponse(String status, String message, String sessionId) {
		this.status = status;
		this.message = message;
		this.sessionId = sessionId;
	}
}
