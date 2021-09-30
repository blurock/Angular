package info.esblurock.background.services.transaction;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestCreateUserAccount {

	@Test
	public void test() {
		String jsonS = "{\n"
				+ "    \"prov:activity\": 'dataset:CreateUserAccountEvent',\n"
				+ "    \"dataset:transreqobj\":  {\n"
				+ "	    \"dataset:eventcreateperson\": {\n"
				+ "	    \"dataset:firestorecatalog\": {\n"
				+ "                 \"qb:DataSet\": \"1c05abf3-52a5-4bb6-831c-1a66b00006a1\",\n"
				+ "                 \"dataset:addressidpairs\": {\n"
				+ "                     \"dataset:collectiondocpair\": []\n"
				+ "                 },\n"
				+ "                 \"skos:inScheme\": \"transactionobject\"\n"
				+ "            }\n"
				+ "	}\n"
				+ "    },\n"
				+ "    \"dataset:activityinfo\": {\n"
				+ "	\"dcterms:title\": \"blurock\",\n"
				+ "	\"dataset:AuthorizationType\": \"\",\n"
				+ "	\"foaf:account\": \"blurock\"\n"
				+ "    }\n"
				+ "}\n"
				+ "";
		JsonObject json = JsonObjectUtilities.jsonObjectFromString(jsonS);
		JsonObject personid = createDatabaseUser();
		JsonObject inputs = json.get(ClassLabelConstants.DatabaseIDFromRequiredTransaction).getAsJsonObject();
		inputs.add("dataset:eventcreateperson", personid);
		System.out.println("Test:\n" + JsonObjectUtilities.toString(json));
		System.out.println("Required: " + ClassLabelConstants.DatabaseIDFromRequiredTransaction);
		System.out.println("Call:");
		//System.out.println(JsonObjectUtilities.toString(TransactionProcess.getPrerequisiteObjects(json)));
		JsonObject response = TransactionProcess.processFromTransaction(json);
		System.out.println(JsonObjectUtilities.toString(response));
	}
	JsonObject createDatabaseUser() {
		String jsonS = "{\n"
				+ "    \"prov:activity\": 'dataset:CreateDatabasePersonEvent',\n"
				+ "    \"dataset:objectype\": \"dataset:DatabasePerson\",\n"
				+ "    \"dataset:transreqobj\":  {},\n"
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
		JsonObject output = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
		JsonObject id = output.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
		return id;
	}

}
