package esblurock.info.JavaAIAgent.science.physics;

import java.sql.DatabaseMetaData;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.adk.agents.Callbacks.BeforeAgentCallback;
import com.google.adk.agents.Callbacks.BeforeToolCallback;
import com.google.adk.agents.CallbackContext;

import com.google.adk.tools.ToolContext;
import com.google.cloud.aiplatform.v1beta1.ToolCall;
import com.google.adk.agents.CallbackContext;
import com.google.adk.agents.InvocationContext;
import com.google.adk.agents.BaseAgent;
import com.google.adk.agents.CallbackContext;
import com.google.adk.agents.LlmAgent;
import com.google.adk.agents.RunConfig;
import com.google.adk.flows.llmflows.RequestConfirmationLlmRequestProcessor;
import com.google.adk.tools.BaseTool;
import com.google.adk.tools.ToolConfirmation;
import com.google.genai.types.Content;

import esblurock.info.JavaAIAgent.Constants;
import esblurock.info.JavaAIAgent.agents.tools.ScienceTools;
import io.reactivex.rxjava3.core.Maybe;

public class PhysicsAgent {

	public static final BaseAgent CALCULATE_GRAVITY_MISSING = LlmAgent.builder().name("gravity-missing-params")
			.instruction("You are a data validation assistant. "
					+ "When a user asks about gravity but hasn't provided mass1, mass2, and distance, "
					+ "respond ONLY with this JSON: "
					+ "{ \"status\": \"GetInput\", \"tool\": \"calculate_gravity\", \"missing\": [\"mass1\", \"mass2\", \"distance\"] }")
			.build();

	// AGENT 2: The Executor
	// Used when we have the data and want to run the actual tool.
	public static final BaseAgent CALCULATE_GRAVITY_EXEC = LlmAgent.builder().name("gravity-executor")
			.instruction("You are a physics engine. Use the calculate_gravity tool provided to "
					+ "compute the force and explain the result scientifically.")
			.tools(List.of(ScienceTools.GRAVITY_TOOL)).build();

}
