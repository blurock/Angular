package esblurock.info.JavaAIAgent.hitl;

import java.util.List;
import java.util.Map;

import com.google.adk.JsonBaseModel;
import com.google.adk.agents.LlmAgent;
import esblurock.info.JavaAIAgent.Constants;
import esblurock.info.JavaAIAgent.hitl.tools.AdditionTool;

public class SimpleHumanInTheLoop {

	class OutputSchema extends JsonBaseModel {
		public String status;
		public String taskString;
	}

	private static LlmAgent setupparameters = LlmAgent.builder().name("Setup Parameters Agent").model(Constants.MODEL)
			.description(
					"The input is a task keyword. The output is the same task keyword and the status 'GetParameters' ")
			.instruction("You are a terminal response generator. "
					+ "1. Identify the task field of the input JSON object, for example 'do operation'"
					+ "2. Set 'task' field of the output to the input task field (in the example, 'do operation'"
					+ "3. Set 'status' to 'GetParameters'. ")
			.disallowTransferToParent(true).disallowTransferToPeers(true).build();

	private static LlmAgent useparameters = LlmAgent.builder().name("Operation Agent").model(Constants.MODEL)
			.description("An agent use the parameters to perform addition.")
			.instruction(
					"You are a calculation assistant. In the JSON input, the data field has the two parameters, parameter1 and parameter2"
							+ "Use the 'operation_tool' to operate on them. " + "The response is a JSON object"
							+ "Set 'status' to 'answer' " + "Set 'result' to the result of the operation. ")
			.tools(List.of(AdditionTool.ADDITION_TOOL)).build();

	public static LlmAgent COORDINATOR = LlmAgent.builder().name("Coordinator").model(Constants.MODEL)
			.description("I am the coordinator between setup and use of parameters")
			.instruction("Analyze the 'status' field and call one and only one of the following agents "
					+ "If 'new', send the request to 'Setup Parameters Agent'. "
					+ "If 'use', send the request to 'Operation Agent'."
					+ "These agents will create a JSON response with the fields: 'status' and other fields based on the status."
					+ "Rely this JSON response as your output.")
			.subAgents(SimpleHumanInTheLoop.setupparameters, SimpleHumanInTheLoop.useparameters) // Assign sub_agents
																									// here
			.build();

}
