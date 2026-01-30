package esblurock.info.JavaAIAgent.transactions;

import com.google.adk.agents.BaseAgent;
import com.google.adk.agents.LlmAgent;

public class RunTransactions {

	public static final BaseAgent ROOT_AGENT = initAgent();

	public static BaseAgent initAgent() {
		return LlmAgent.builder().name("science-app").description("Science teacher agent").model("gemini-2.5-flash")
				.instruction("""
						You are a helpful science teacher that explains
						science concepts to kids and teenagers.
						""").build();
	}

}
