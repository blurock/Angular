package info.esblurock.background.services.dataset;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestReadInMetaAtomCollection {

	@Test
	public void test() {
		JsonObject json = new JsonObject();
		String service = "ReadInDatasetWithDatasetCollectionLabel";
		String maintainer = "Administrator";
		String dataset = "StandardDataset";
		String classname = "dataset:JThermodynamicsMetaAtomDefinition";
		
		json.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		json.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, dataset);
		json.addProperty(ClassLabelConstants.DatasetCollectionObjectType, classname);
		json.addProperty(DatabaseServicesBase.service, service);
		
		JsonObject response = DatabaseServicesBase.process(json);
		JsonObjectUtilities.printResponse(response);
	}

}
