package info.esblurock.background.services.dataset;


import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;

public class DatasetCollectionIDManagement {

	/**
	 * @param the classname of the catalog object collection
	 * @param recordid DatasetforTypeInCollectionSet
	 * @return The firestore ID of collection
	 * 
	 * the DatabaseCollectionOfCurrentClass should have:
	 * <ul>
	 * <li> dataset:catalogobjectmaintainer    maintainer 
	 * <li> dataset:datasetname                datasetname
	 * <li> dataset:datasetversion:  datasetversion
	 * <ul>
	 * 
	 */
	public static JsonObject firebaseIDOfCollection(JsonObject recordid) {
		String classname = recordid.get(ClassLabelConstants.DatasetCollectionObjectType).getAsString();
		String maintainer  = recordid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		String datasetname  = recordid.get(ClassLabelConstants.DatasetName).getAsString();
		String datasetversion  = recordid.get(ClassLabelConstants.DatasetVersion).getAsString();
		String collectionname  = recordid.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
		
		JsonObject catrecordid = CreateDocumentTemplate.createTemplate("dataset:DatabaseCollectionOfCurrentClass");
		catrecordid.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, collectionname);
		catrecordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		catrecordid.addProperty(ClassLabelConstants.DatasetName, datasetname);
		catrecordid.addProperty(ClassLabelConstants.DatasetVersion, datasetversion);
		catrecordid.addProperty(ClassLabelConstants.CatalogDataObjectStatus, "CatalogObjectStatusCurrent");
		JsonObject firestoreid = FindDatasetCollections.findDatasetCollectionID(classname, catrecordid);
		
		return firestoreid;
	}
	
	/** Create an empty ChemConnectDatasetCollectionIDsSet
	 * 
	 * @param collectionname The name of the new collection set to create
	 * @param owner the owner of the collection
	 * @param transactionID The transaction id of the collection set
	 * @param maintainer the maintainer of the collection set
	 * @param descr A short description of the collection set
	 * @return An empty collection set (with no sets added).
	 * 
	 */
	public static JsonObject createEmptyChemConnectCurrentDatasetIDSet(
			String collectionname,String  owner, String transactionID, String maintainer, String descr) {
		JsonObject idcollection = BaseCatalogData.createStandardDatabaseObject("dataset:ChemConnectDatasetCollectionIDsSet", 
				owner, transactionID, "false");
		idcollection.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		idcollection.addProperty(ClassLabelConstants.DescriptionAbstract, descr);
		idcollection.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, collectionname);
		BaseCatalogData.insertFirestoreAddress(idcollection);
		return idcollection;
	}
	
	/** Derive and insert collectionid into the ChemConnectDatasetCollectionIDsSet
	 * 
	 * @param recordid DatabaseCollectionOfCurrentClass
	 * @param datasetcollection The dataset collection to insert the collection id in
	 * 
	 * The DatasetCollectionObjectType within the DatabaseCollectionOfCurrentClass is used to find the class
	 * The identifier for the inserted collection is the identifier for the class
	 * The collectionid is derived from the DatabaseCollectionOfCurrentClass
	 * 
	 */
	public static void insertCollectionInfoDataset(JsonObject recordid, JsonObject collectionids) {
		String classname = recordid.get(ClassLabelConstants.DatasetCollectionObjectType).getAsString();
		String identifier = DatasetOntologyParseBase.getIDFromAnnotation(classname);
		collectionids.add(identifier, recordid);
	}
	
	/** Collection address of current objects of class
	 * 
	 * @param classname The name of the class collection to retrieve
	 * @param collectionids The set of collection ids
	 * @return The collection address of the class (null if not found)
	 */
	public static JsonObject collectionInDatasetIDs(String classname, JsonObject collectionids) {
		String identifier = DatasetOntologyParseBase.getIDFromAnnotation(classname);
		JsonObject firestoreid = null;
		if(collectionids.get(identifier) != null) {
			JsonObject recordid =  collectionids.get(identifier).getAsJsonObject();
			firestoreid = firebaseIDOfCollection(recordid);
		}
		
		return firestoreid;
	}
	/**
	 * 
	 * @param classname The name of the class collection to retrieve
	 * @param status The type of collection
	 * @param collectionids The set of collection ids
	 * @return The collection address of the class
	 * 
	 * This takes the collection address of the current database and finds the 
	 * collection referring to the status.
	 * 
	 * The status can with or without the 'dataset:' namespace
	 * 
	 */
	public static JsonObject collectionInDatasetIDs(String classname, String status, JsonObject collectionids) {
		JsonObject firestoreid = collectionInDatasetIDs(classname, collectionids);
		JsonObject newfirestoreid = null;
		if(firestoreid != null) {
			newfirestoreid = firestoreid.deepCopy();
			String s = status;
			if(status.startsWith("dataset:")) {
				s = status.substring(8);
			}
			newfirestoreid.addProperty(ClassLabelConstants.DataCatalog, s);
		}
		return firestoreid;
	}
	
	public static JsonObject getCollectionOfDatasetCollectionIDsSetAddress(String maintainer) {
		JsonObject idcollection = CreateDocumentTemplate.createTemplate("dataset:ChemConnectDatasetCollectionIDsSet");
		idcollection.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		idcollection.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, "default");
		BaseCatalogData.insertStandardBaseInformation(idcollection,"","","false");
		JsonObject address = idcollection.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
		
		return address;
		
	}
	
}
