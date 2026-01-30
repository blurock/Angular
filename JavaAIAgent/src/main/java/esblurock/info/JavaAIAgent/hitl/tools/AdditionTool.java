package esblurock.info.JavaAIAgent.hitl.tools;

import com.google.adk.tools.FunctionTool;
import com.google.adk.tools.Annotations.Schema;

import esblurock.info.JavaAIAgent.agents.tools.ScienceTools;

public class AdditionTool {
	@Schema(name = "operation_tool", description = "Operate on parameter1 and parameter2.")
	public static double operateParameters(
			@Schema(name = "parameter1", description = "The first parameter") int parameter1,
			@Schema(name = "parameter2", description = "The second parameter") int parameter2) {
		return parameter1 + parameter2;
	}

	public static final FunctionTool ADDITION_TOOL 
	= FunctionTool.create(AdditionTool.class, "operateParameters" );

}
