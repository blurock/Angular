package info.esblurock.background.services.transaction;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestCreateDatabasePerson {

	@Test
	public void test() {
		String jsonS = "{\n"
				+ "    \"prov:activity\": 'dataset:CreateDatabasePersonEvent',\n"
				+ "    \"dataset:objectype\": \"dataset:DatabasePerson\",\n"
				+ "    \"dataset:requiredtransitionid\":  {},\n"
				+ "    \"dataset:activityinfo\": {\n"
				+ "	\"foaf:Person\": {\n"
				+ "	    \"foaf:name\": {\n"
				+ "		\"foaf:familyName\":\"Blurock\",\n"
				+ "		\"foaf:givenName\":\"Edward\",\n"
				+ "		\"foaf:title\":\"dataset:Doctor\"\n"
				+ "	    },\n"
				+ "	    \"vcard:role\":\"dataset:ConceptProgrammer\"\n"
				+ "	},\n"
				+ "	\"dataset:publicread\": \"true\",\n"
				+ "	\"dataset:personfullname\":\"Edward Blurock\",\n"
				+ "	\"dcterms:identifier\":\"dataset:personcreate\",\n"
				+ "	\"dcterms:title\": \"Edward Blurock, Sweden\"\n"
				+ "    }\n"
				+ "}\n"
				+ "";
		JsonObject json = JsonObjectUtilities.jsonObjectFromString(jsonS);
		JsonObject response = TransactionProcess.processFromTransaction(json);
		System.out.println(JsonObjectUtilities.toString(response));
		
	}

}
