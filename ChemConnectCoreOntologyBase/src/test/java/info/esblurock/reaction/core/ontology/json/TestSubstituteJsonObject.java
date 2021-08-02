package info.esblurock.reaction.core.ontology.json;

import static org.junit.Assert.*;

import java.util.UUID;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.transaction.ProcessTransactionBase;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.SubstituteJsonValues;

public class TestSubstituteJsonObject {

	@Test
	public void testSingleSubstitution() {
		String transactionS = "dataset:CreateDatabasePersonEvent";
		JsonObject json = ProcessTransactionBase.setupActivityInformationTemplate(transactionS);
		SubstituteJsonValues.substituteJsonValueString(json,"foaf:givenName", "DoWinkle");
		System.out.println(JsonObjectUtilities.toString(json));
	}
	@Test
	public void testFullSubstitution() {
		String transactionS = "dataset:CreateDatabasePersonEvent";
		JsonObject json = ProcessTransactionBase.setupCatalogObjectTemplate(transactionS);
		String jsonS = "{\n"
				+ "  \"foaf:Person\": {\n"
				+ "    \"foaf:name\": {\n"
				+ "      \"foaf:givenName\": \"Edward\",\n"
				+ "      \"foaf:title\": \"Dr.\",\n"
				+ "      \"foaf:familyName\": \"Blurock\"\n"
				+ "    },\n"
				+ "    \"vcard:role\": \"Researcher\"\n"
				+ "  },\n"
				+ "  \"dataset:title-person\": \"Edward S. Blurock\"\n"
				+ "}\n"
				+ "";
		JsonObject jsonsub = JsonObjectUtilities.jsonObjectFromString(jsonS);
		SubstituteJsonValues.substituteJsonObject(json, jsonsub);
		System.out.println(JsonObjectUtilities.toString(json));
		
	}
}
