package esblurock.info.JavaAIAgent.science;

import java.util.List;

import com.google.adk.agents.BaseAgent;
import com.google.adk.agents.LlmAgent;

import esblurock.info.JavaAIAgent.Constants;
import esblurock.info.JavaAIAgent.science.biology.BiologyAgent;
import esblurock.info.JavaAIAgent.science.physics.PhysicsAgent;

/** Science teacher agent. */
public class ScienceTeacherAgent {
	public static final BaseAgent ROOT_AGENT = LlmAgent.builder().name(Constants.APPNAME)
			.description("Head Science Teacher").instruction("""
					You are a science teacher, answer the question with simple language.
					""").model(Constants.MODEL).build();
}