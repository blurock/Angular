package info.esblurock.reaction.core.ontology.base.hierarchy;


import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestDatasetFirestoreID {

	@Test
	public void test() {
		String classname = "dataset:JThermodynamicsMetaAtomDefinition";
		String owner = "blurock";
		String transactionID = "xxxxxx";
		String publicB = "true";
		JsonObject json = BaseCatalogData.createStandardDatabaseObject(classname, owner, transactionID, publicB);
		
		String recordid = ClassLabelConstants.DatabaseRecordIDInfo;
		JsonObject rec = json.get(recordid).getAsJsonObject();
		rec.addProperty(ClassLabelConstants.DatasetName, "DatasetName");
		rec.addProperty(ClassLabelConstants.CatalogDataObjectStatus, "DatasetStatus");
		rec.addProperty(ClassLabelConstants.DatasetVersion, "version");
		rec.addProperty(ClassLabelConstants.CatalogObjectUniqueGenericLabel, "Unique");
		rec.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, "Maintainer");
		
		JsonObject address = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(json);
		
		
		System.out.println(JsonObjectUtilities.toString(address));
		
		
	}

}
