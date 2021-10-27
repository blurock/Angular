package info.esblurock.background.services.set.metaatoms;

import static org.junit.Assert.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.transaction.FindTransactions;
import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestTransactionInterpretTextBlock {

	@Test
	public void test() {
		String srcpath = "src/test/java/resources/metaatoms/createmetaatoms.json";
		try {
			String content = Files.readString(Paths.get(srcpath));
			JsonObject json = JsonObjectUtilities.jsonObjectFromString(content);
			String type = "dataset:PartiionSetWithinRepositoryFile";
			JsonObject transresponse = FindTransactions.findLabelFirestoreIDPairByType(type);
			if(transresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonObject transout = transresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				System.out.println(JsonObjectUtilities.toString(transout));
				JsonArray labelids = transout.get(ClassLabelConstants.LabelFirestoreIDPair).getAsJsonArray();
				JsonObject first = labelids.get(0).getAsJsonObject();
				JsonObject firestorid = first.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
				JsonObject prerequisites = json.get(ClassLabelConstants.DatabaseIDFromRequiredTransaction).getAsJsonObject();
				prerequisites.add(ClassLabelConstants.PartiionSetWithinRepositoryFile, firestorid);
				JsonObject response = TransactionProcess.processFromTransaction(json);
				JsonObjectUtilities.printResponse(response);
			} else {
				System.out.println("Failed to get prerequisite: " + type);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}
