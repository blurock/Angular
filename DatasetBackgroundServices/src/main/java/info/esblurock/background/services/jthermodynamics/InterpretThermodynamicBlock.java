package info.esblurock.background.services.jthermodynamics;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class InterpretThermodynamicBlock {
	public static JsonObject interpretMolecularThermodynamics(String transactionID, 
			String owner, JsonObject prerequisites, JsonObject info) {
		JsonArray set = getBlocksFromTransaction(prerequisites);
		JsonArray thermo = standardThermodynamics(set);
		return null;
	}
	public static JsonObject interpretBensonRuleThermodynamics(String transactionID, 
			String owner, JsonObject prerequisites, JsonObject info) {
		JsonArray set = getBlocksFromTransaction(prerequisites);
		JsonArray thermo = standardThermodynamics(set);
		return null;
	}
	
	/**
	 * @param prerequisites The standard set of prerequisites
	 * @return The set of thermodynamics block information read in
	 * 
	 * This isolates the output from the PartiionSetWithinRepositoryFile transaction:
	 * This is done by reading at once all the RepositoryTherGasThermodynamicsBlock
	 * by using the transactionID of the transaction.
	 * 
	 */
	static JsonArray getBlocksFromTransaction(JsonObject prerequisites) {
		JsonArray set = new JsonArray();
		return set;
	}
	
	
	
	/**
	 * @param set The set of thermo block as read in 
	 * @return The set of standard thermodynamics, one-to-one with the blocks
	 */
	static JsonArray standardThermodynamics(JsonArray set) {
		JsonArray thermoset = new JsonArray();
		return set;		
	}
}
