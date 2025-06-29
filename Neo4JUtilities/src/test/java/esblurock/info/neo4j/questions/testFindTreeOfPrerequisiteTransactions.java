package esblurock.info.neo4j.questions;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import esblurock.info.neo4j.rdf.RDFQuestionsUtilities;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class testFindTreeOfPrerequisiteTransactions {

	@Test
	public void test() {
		try {
			JsonObject input = new JsonObject();
			input.addProperty(ClassLabelConstants.CatalogObjectOwner, "Administrator");
			input.addProperty(ClassLabelConstants.DescriptionTitle, "Tree of Prerequisite for Interpretion transaction");
			input.addProperty(ClassLabelConstants.TransactionID, "6f9a4653-645d-4275-a5ec-7d485e61fd79");
			JsonObject response = RDFQuestionsUtilities.FindTreeOfPrerequisiteTransactions(input);
			JsonObjectUtilities.printResponse(response);
		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception in testFindListOfCatalogObjectUniqueGenericLabel: " + e.getMessage());
		}
	}
}
