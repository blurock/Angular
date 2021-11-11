package info.esblurock.background.services.servicecollection;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestGetListOfDatasetCollectionIDsSet {

	@Test
	public void test() {
		System.out.println("-----------------------------------------------------");
		System.out.println("GetListOfDatasetCollectionIDsSet: get all collections");
		System.out.println("-----------------------------------------------------");
		
		JsonObject json = new JsonObject();
		json.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer,"Administrator");
		json.addProperty(DatabaseServicesBase.service, "GetListOfDatasetCollectionIDsSet");
		JsonObject response = DatabaseServicesBase.process(json);
		JsonObjectUtilities.printResponse(response);

		String collectionlabel = "StandardDatasetX";
		System.out.println("-----------------------------------------------------");
		System.out.println("GetListOfDatasetCollectionIDsSet: get collection: " + collectionlabel);
		System.out.println("-----------------------------------------------------");
		json.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, collectionlabel);
		response = DatabaseServicesBase.process(json);
		JsonObjectUtilities.printResponse(response);

		
	}

}
