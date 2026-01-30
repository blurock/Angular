package esblurock.info.JavaAIAgent.simplerag;

import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.stream.Collectors;

import com.google.adk.agents.LlmAgent;
import com.google.genai.types.Schema;
import com.google.gson.JsonObject;

import esblurock.info.JavaAIAgent.Constants;
import esblurock.info.JavaAIAgent.simplerag.dictionary.DictionaryElementSet;
import esblurock.info.JavaAIAgent.simplerag.dictionary.SimpleDictionarySet;


public class SimpleRagAgents {
	
	public static String simpleDictionaryString = SimpleDictionarySet.createSimple().toRAGString();

	public static LlmAgent EXTRACTOR_AGENT = LlmAgent.builder()
	    .name("ParameterExtractor")
	    .model(Constants.MODEL)
	    .instruction("You are a specialized entity extractor. Your goal is to map user text " +
	                 "to a 'formal name' from the provided dictionary below.\n\n" +
	                 "DICTIONARY:\n" + simpleDictionaryString + "\n\n" +
	                 "RULES:\n" +
	                 "1. Analyze the user's input text in the prompt field of the input JSON object.\n" +
	                 "2. Identify which parameter description best matches the user's intent.\n" +
	                 "3. Return the formal name and the description of the matching element as the result.\n" +
	                 "4. If no clear match exists, return 'UNKNOWN'.")
	    // Use an output schema to ensure you get a clean JSON object back
	    .outputSchema(Schema.builder()
	        .type("OBJECT")
	        .properties(Map.of(
		            "formalName", Schema.builder().type("STRING").description("The matched identifier").build(),
		            "description", Schema.builder().type("STRING").description("The description of the identifier").build(),
	            "confidence", Schema.builder().type("STRING").description("HIGH, MEDIUM, or LOW").build()
	        ))
	        .required(List.of("formalName"))
	        .build())
	    .build();
}
