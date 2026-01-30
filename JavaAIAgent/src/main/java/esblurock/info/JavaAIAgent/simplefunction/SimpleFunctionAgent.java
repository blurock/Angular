package esblurock.info.JavaAIAgent.simplefunction;

import java.util.List;

import com.google.adk.agents.LlmAgent;

import esblurock.info.JavaAIAgent.Constants;
import esblurock.info.JavaAIAgent.simplefunction.tools.TransactionTool;

public class SimpleFunctionAgent {

	public static LlmAgent USE_PARAMETERS_AGENT = LlmAgent.builder()
		    .name("Transaction Executor")
		    .model(Constants.MODEL)
		    .instruction("Use the provided tools to run the transaction with the gathered parameters.")
		    .tools(List.of(new TransactionTool())) // Register the tool here
		    .build();
}
