package info.esblurock.background.services.transaction;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class DeleteDatasetTransaction {

	@Test
	public void test() {
		String infoS = "{\n"
				+ "	\"prov:activity\": \"dataset:TransactionInterpretTextBlock\",\n"
				+ "	\"dataset:datasettransactionspecification\": {\n"
				+ "		\"dataset:catalogobjectmaintainer\": \"Administrator\",\n"
				+ "		\"dataset:datasetname\": \"Standard\",\n"
				+ "		\"dataset:datasetversion\": \"1.0\",\n"
				+ "		\"dataset:uniquegenericname\": \"tableA1CarbonBensonRules\"\n"
				+ "	}\n"
				+ "}";
		JsonObject info = JsonObjectUtilities.jsonObjectFromString(infoS);
		JsonObject response = DeleteTransaction.deleteDatasetTransaction(info);
		JsonObjectUtilities.printResponse(response);
	}

}
