package esblurock.info.JavaAIAgent.science.biology;

import com.google.adk.agents.BaseAgent;
import com.google.adk.agents.LlmAgent;

import esblurock.info.JavaAIAgent.Constants;

public class BiologyAgent {
	public static final BaseAgent AGENT = LlmAgent.builder().name("biology-specialist")
			.description("Expert in biology and life sciences")
			.instruction("You are a Biology Teacher. Focus on cells and ecosystems.").model(Constants.MODEL).build();
}