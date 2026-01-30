package esblurock.info.JavaAIAgent.background;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.adk.events.Event;
import com.google.adk.runner.Runner;
import com.google.adk.sessions.InMemorySessionService;
import com.google.genai.types.Content;
import com.google.genai.types.Part;

import esblurock.info.JavaAIAgent.Constants;
import esblurock.info.JavaAIAgent.dto.AgentJsonResponse;
import esblurock.info.JavaAIAgent.science.ScienceTeacherAgent;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/agent/simple")
public class SimpleLLMServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	ObjectMapper mapper = new ObjectMapper();

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");

		// Set CORS for Angular (Change localhost:4200 to your actual frontend URL)
		resp.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
		resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		resp.setHeader("Access-Control-Allow-Headers", "Content-Type");

		TypeReference<Map<String, Object>> mapType = new TypeReference<>() {
		};
		Map<String, Object> body = mapper.readValue(req.getReader(), mapType);

		String userId = (String) body.get("userId");
		String sessionId = (String) body.get("sessionId");
		String prompt = (String) body.get("prompt");

		// set up a seession service with the current session and user ID
		ConcurrentMap<String, Object> initialState = new ConcurrentHashMap<String, Object>();
		InMemorySessionService sessionService = new InMemorySessionService();
		sessionService.createSession(Constants.HITLAPPNAME, // App Name
				userId, // User ID
				initialState, // Initial state (Map<String, Object>)
				sessionId // Wrap your String ID in an Optional
		).blockingGet(); // Wait for completion/ Use blockingGet() to ensure it's created before the next
							// line

		// Create the runner with the top-level agent and session service
		Runner runner = Runner.builder().appName(Constants.HITLAPPNAME).agent(ScienceTeacherAgent.ROOT_AGENT)
				.sessionService(sessionService) // <--- Tell the runner where to look
				.build();
		// set up content with the prompt
		Content newMessage = Content.builder().role("user") // <--- Some versions REQUIRE the role to be set to "user"
				.parts(List.of(Part.builder().text(prompt).build())).build();
		// run the agent asynchronously
		Iterable<Event> events = runner.runAsync(userId, sessionId, newMessage // <--- Ensure this object actually
																				// contains the text
		).blockingIterable();
		// We put the processing in a separate method for clarity
		processEvents(events, sessionId, resp);

	}

	/*
	 * Process the events from the agent run Loop through the events
	 * 
	 * Since this is a simple example agent (there are no subagents or , we just
	 * look for final responses Technically there could be multiple events (with
	 * subagents or functions, but here we just expect one final response)
	 * 
	 */
	private void processEvents(Iterable<Event> events, String sessionId, HttpServletResponse resp) {
		try {
			for (Event event : events) {
				// 1. Check if it's the final answer
				if (event.finalResponse()) {
					// stringifyContent() is the library's built-in way to turn the
					// complex Content object into a simple String for your UI.
					String text = event.stringifyContent();
					System.out.println("Final Event: " + text);
					mapper.writeValue(resp.getWriter(), new AgentJsonResponse("SUCCESS", text, sessionId));
					return;
				} else {
					String text = event.stringifyContent();
					// mapper.writeValue(resp.getWriter(), new AgentJsonResponse("SUCCESS", text,
					// sessionId));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
