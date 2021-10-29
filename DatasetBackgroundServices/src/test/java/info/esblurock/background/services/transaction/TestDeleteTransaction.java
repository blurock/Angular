package info.esblurock.background.services.transaction;

import org.junit.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestDeleteTransaction {

	@Test
	public void test() {
		
		//String type = "dataset:InitialReadInOfRepositoryFile";
		String type = "dataset:PartiionSetWithinRepositoryFile";
		JsonObject transresponse = FindTransactions.findLabelFirestoreIDPairByType(type);
		if(transresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			JsonObject transout = transresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			JsonArray labelids = transout.get(ClassLabelConstants.LabelFirestoreIDPair).getAsJsonArray();
			JsonObject first = labelids.get(0).getAsJsonObject();
			JsonObject firestorid = first.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
			JsonObject response = ReadFirestoreInformation.readFirestoreCatalogObject(firestorid);
			if(response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonObject object = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				JsonObject deleteresponse = DeleteTransaction.deleteTransaction(object);
				System.out.println(JsonObjectUtilities.toString(deleteresponse));
			}
		}
	}

}
