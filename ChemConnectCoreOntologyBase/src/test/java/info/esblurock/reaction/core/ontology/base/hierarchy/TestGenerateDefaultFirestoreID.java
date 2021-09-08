package info.esblurock.reaction.core.ontology.base.hierarchy;


import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestGenerateDefaultFirestoreID {

	@Test
	public void test() {
		String catalogID = "dataset:TransactionEventObject";
		JsonObject firestoreid = CreateHierarchyElement.findDefaultCatalogID(catalogID);
		System.out.println(JsonObjectUtilities.toString(firestoreid));
	}

}
