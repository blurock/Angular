package info.esblurock.background.services;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.DatasetCollectionIDManagement;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestCollectionIDManagement {

	@Test
	public void test() {
		String maintainer = "Administrator";
		String datasetname = "Standard";
		String datasetversion = "20200919";
		JsonObject catrecordid = CreateDocumentTemplate.createTemplate("dataset:DatabaseRecordIDInfo");
		catrecordid.addProperty(ClassLabelConstants.DatasetCollectionObjectType, "dataset:JThermodynamicsMetaAtomDefinition");
		catrecordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		catrecordid.addProperty(ClassLabelConstants.DatasetName, datasetname);
		catrecordid.addProperty(ClassLabelConstants.DatasetVersion, datasetversion);
		
		JsonObject firestoreid = DatasetCollectionIDManagement.firebaseIDOfCollection(catrecordid);
		System.out.println(JsonObjectUtilities.toString(firestoreid));
		
		String owner = "Administrator";
		String transactionID = "11111111111";
		String collectionname = "StandardCollection";
		String description = "The standard default dataset";
		JsonObject collectionset = DatasetCollectionIDManagement.createEmptyChemConnectCurrentDatasetIDSet(collectionname,
				owner, transactionID, maintainer, description);
	
		System.out.println(JsonObjectUtilities.toString(collectionset));
		

	}

}
