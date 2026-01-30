package esblurock.info.JavaAIAgent.simplerag;


import esblurock.info.JavaAIAgent.Constants;
import esblurock.info.JavaAIAgent.generic.SimpleGenericServlet;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/api/agent/simplerag")
public class SimpleRagServlet extends SimpleGenericServlet {
	private static final long serialVersionUID = 4749598458122810112L;

	public SimpleRagServlet() {
		super(Constants.SIMPLERAGAPPNAME, SimpleRagAgents.EXTRACTOR_AGENT);
	}
}
