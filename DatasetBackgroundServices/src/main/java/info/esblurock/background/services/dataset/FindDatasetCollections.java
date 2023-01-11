package info.esblurock.background.services.dataset;

import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class FindDatasetCollections {

	/**
	 * Find the FirebaseCatalogID
	 * 
	 * @param classname The class name (type) of the object
	 * @param recordid  The DatasetSpecificationForCollectionSet with Catalog
	 *                  location specification
	 * @return The FirebaseCatalogID
	 */
	public static JsonObject findDatasetCollectionID(String classname, JsonObject recordid) {
		JsonObject empty = CreateDocumentTemplate.createTemplate(classname);
		empty.add(ClassLabelConstants.DatasetSpecificationForCollectionSet, recordid);
		// In some objects, this conflicts 
		empty.remove(ClassLabelConstants.DatasetTransactionSpecificationForCollection);
		JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(empty);
		firestoreid.remove(ClassLabelConstants.SimpleCatalogName);

		return firestoreid;
	}

	public static JsonObject findDatasetCollectionID(String classname, String maintainer, String dataset,
			String version) {
		JsonObject empty = CreateDocumentTemplate.createTemplate(classname);
		JsonObject recordid = empty.get(ClassLabelConstants.DatasetSpecificationForCollectionSet).getAsJsonObject();
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		recordid.addProperty(ClassLabelConstants.DatasetVersion, version);
		recordid.addProperty(ClassLabelConstants.DatasetName, dataset);
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectStatus, "CatalogObjectStatusCurrent");

		JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(empty);
		firestoreid.remove(ClassLabelConstants.SimpleCatalogName);

		return firestoreid;
	}

    /**
     * Read in entire collection
     * 
     * @param classname The class name (type) of the object
     * @param recordid  The DatasetSpecificationForCollectionSet with Catalog
     *                  location specification
     * @return The response of reading in the entire collection
     */
	public static JsonObject readInDatasetCollection(String classname, JsonObject recordid) {
		JsonObject firestoreid = findDatasetCollectionID(classname, recordid);
		JsonObject response = ReadFirestoreInformation.readFirestoreCollection(null, firestoreid);
		return response;
	}
}
