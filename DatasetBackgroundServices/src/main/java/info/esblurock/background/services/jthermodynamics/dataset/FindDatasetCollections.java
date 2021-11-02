package info.esblurock.background.services.jthermodynamics.dataset;

import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;

public class FindDatasetCollections {
	
	
	public static JsonObject findDatasetCollectionID(String classname, JsonObject recordid) {
		JsonObject empty = CreateDocumentTemplate.createTemplate(classname);
		empty.add(ClassLabelConstants.DatabaseRecordIDInfo, recordid);
		JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(empty);
		firestoreid.remove(ClassLabelConstants.SimpleCatalogName);
		
		return firestoreid;
	}
	
	public static JsonObject findDatasetCollectionID(String classname, String maintainer, String dataset, String version) {
		JsonObject empty = CreateDocumentTemplate.createTemplate(classname);
		JsonObject recordid = empty.get(ClassLabelConstants.DatabaseRecordIDInfo).getAsJsonObject();
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		recordid.addProperty(ClassLabelConstants.DatasetVersion, version);
		recordid.addProperty(ClassLabelConstants.DatasetName, dataset);
		recordid.addProperty(ClassLabelConstants.CatalogObjectUniqueGenericLabel, "Generic");
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectStatus, "CatalogObjectStatusCurrent");
		
		JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(empty);
		firestoreid.remove(ClassLabelConstants.SimpleCatalogName);
		
		return firestoreid;
	}
	
	public static JsonObject readInDatasetCollection(String classname, JsonObject recordid) {
		JsonObject firestoreid = findDatasetCollectionID(classname, recordid);
		JsonObject response = ReadFirestoreInformation.readFirestoreCollection(null, firestoreid);
		return response;
	}
}
