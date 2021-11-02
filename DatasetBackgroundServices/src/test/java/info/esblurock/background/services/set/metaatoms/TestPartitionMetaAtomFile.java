package info.esblurock.background.services.set.metaatoms;

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

public class TestPartitionMetaAtomFile {

	@Test
	public void test() {
		String srcpath = "src/test/java/resources/metaatoms/parsemetaatom.json";
		try {
			String content = Files.readString(Paths.get(srcpath));
			JsonObject json = JsonObjectUtilities.jsonObjectFromString(content);
			String type = "dataset:InitialReadInOfRepositoryFile";
			JsonObject transresponse = FindTransactions.findLabelFirestoreIDPairByType(type,null);
			if(transresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonObject transout = transresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				JsonArray labelids = transout.get(ClassLabelConstants.LabelFirestoreIDPair).getAsJsonArray();
				JsonObject first = labelids.get(0).getAsJsonObject();
				JsonObject firestorid = first.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
				JsonObject prerequisites = json.get(ClassLabelConstants.DatabaseIDFromRequiredTransaction).getAsJsonObject();
				prerequisites.add("dataset:initreposfile", firestorid);
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
