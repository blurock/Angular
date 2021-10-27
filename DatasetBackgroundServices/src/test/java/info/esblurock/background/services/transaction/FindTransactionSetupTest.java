package info.esblurock.background.services.transaction;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class FindTransactionSetupTest {

	@Test
	public void test() {
		String type = "dataset:PartiionSetWithinRepositoryFile";
		JsonObject response = FindTransactions.findLabelFirestoreIDPairByType(type);
		 JsonObjectUtilities.printResponse(response);
	}

}
