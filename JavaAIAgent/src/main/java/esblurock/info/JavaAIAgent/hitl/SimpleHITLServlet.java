package esblurock.info.JavaAIAgent.hitl;


import esblurock.info.JavaAIAgent.Constants;
import esblurock.info.JavaAIAgent.generic.SimpleGenericServlet;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/api/agent/simplehitl")
public class SimpleHITLServlet extends SimpleGenericServlet {

	private static final long serialVersionUID = 4749598458122810112L;

	public SimpleHITLServlet() {
		super(Constants.HITLAPPNAME, SimpleHumanInTheLoop.COORDINATOR);
	}
/*
	private static final long serialVersionUID = 1L;
	ObjectMapper mapper = new ObjectMapper();

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		System.out.println("Entered SimpleHITLServlet doPost");
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
		String promptString = mapper.writeValueAsString(body);
		System.out.println("SimpleLLMServlet doPost: " + promptString);

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
		Runner runner = Runner.builder().appName(Constants.HITLAPPNAME).agent(SimpleHumanInTheLoop.COORDINATOR)
				.sessionService(sessionService) // <--- Tell the runner where to look
				.build();
		// set up content with the prompt
		Content newMessage = Content.builder().role("user") // <--- Some versions REQUIRE the role to be set to "user"
				.parts(List.of(Part.builder().text(promptString).build())).build();
		// run the agent asynchronously
		Iterable<Event> events = runner.runAsync(userId, sessionId, newMessage // <--- Ensure this object actually
																				// contains the text
		).blockingIterable();
		// We put the processing in a separate method for clarity
		processEvents(events, sessionId, resp);
	}

	private void processEvents(Iterable<Event> events, String sessionId, HttpServletResponse resp) {
		try {
			for (Event event : events) {
				System.out.println("Event Type: " + event.stringifyContent());
				// 1. Check if it's the final answer
				if (event.finalResponse()) {
					// stringifyContent() is the library's built-in way to turn the
					// complex Content object into a simple String for your UI.
					String text = event.stringifyContent();
					System.out.println("----------------------------------------------------------");
					System.out.println("Final Event: " + text);
					mapper.writeValue(resp.getWriter(), text);
					return;
				} else {
					String text = event.stringifyContent();
					System.out.println("----------------------------------------------------------");
					System.out.println("Intermediate Event: " + text);
					// mapper.writeValue(resp.getWriter(), new AgentJsonResponse("SUCCESS", text,
					// sessionId));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("DONE   ----------------------------------------------------------");
	}
*/
}
