package info.esblurock.background.services.dataset;

import com.google.gson.JsonObject;

import info.esblurock.background.services.jthermodynamics.dataset.FindDatasetCollections;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

public class DatasetCollectionIDManagement {

	/**
	 * @param the classname of the catalog object collection
	 * @param recordid DatabaseCollectionOfCurrentClass
	 * @return The firestore ID of collection
	 * 
	 */
	public static JsonObject firebaseIDOfCollection(JsonObject recordid) {
		String classname = recordid.get(ClassLabelConstants.DatasetCollectionObjectType).getAsString();
		String maintainer  = recordid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		String datasetname  = recordid.get(ClassLabelConstants.DatasetName).getAsString();
		String datasetversion  = recordid.get(ClassLabelConstants.DatasetVersion).getAsString();
		
		JsonObject catrecordid = CreateDocumentTemplate.createTemplate("dataset:DatabaseRecordIDInfo");
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
	public static JsonObject createEmptyChemConnectCurrentDatasetIDSet(String collectionname, 
			String owner, String transactionID, String maintainer, String descr) {
		
		JsonObject idcollection = BaseCatalogData.createStandardDatabaseObject("dataset:ChemConnectDatasetCollectionIDsSet", 
				owner, transactionID, "false");
		
		idcollection.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		idcollection.addProperty(ClassLabelConstants.DescriptionAbstract, descr);
		idcollection.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, collectionname);
		BaseCatalogData.insertFirestoreAddress(idcollection);
		return idcollection;
	}
	
	/** Derive and insert collectionid into the DatabaseCollectionOfCurrentClass
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
		JsonObject firestorid = firebaseIDOfCollection(recordid);
		String classname = recordid.get(ClassLabelConstants.DatasetCollectionObjectType).getAsString();
		String identifier = OntologyUtilityRoutines.typesFromIdentifier(classname);
		collectionids.add(identifier, firestorid);
	}
	
}
