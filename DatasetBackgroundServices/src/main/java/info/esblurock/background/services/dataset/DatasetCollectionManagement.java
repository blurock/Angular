package info.esblurock.background.services.dataset;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.service.rdfs.GenerateAndWriteRDFForObject;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.GenericSimpleQueries;

public class DatasetCollectionManagement {

	// The set of DatasetCollectionSets that have been already read in from the
	// database
	private static JsonObject setOfDatasetCollectionSets;

	/**
	 * Retrieve copy of ChemConnectDatasetCollectionIDsSet with specification
	 * 
	 * @param collectionsetidinfo The ActivityInfoDatasetCollectionIDSpecification
	 * @return The corresponding ChemConnectDatasetCollectionIDsSet, null if it
	 *         doesn't exist.
	 * 
	 *         If the ChemConnectDatasetCollectionIDsSet is in local memory from
	 *         this process then it is retrieved. If not, it is retrieved and put
	 *         into local memory. If it does not exist, then null is returned
	 * 
	 */
	public static JsonObject getDatasetCollectionSets(JsonObject collectionsetidinfo) {
		String maintainer = collectionsetidinfo.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		String dataset = collectionsetidinfo.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
		JsonObject datasetcollectionset = null;
		if (setOfDatasetCollectionSets == null) {
			setOfDatasetCollectionSets = new JsonObject();
		}
		boolean notfound = true;
		if (setOfDatasetCollectionSets.get(maintainer) != null) {
			JsonObject maintainerset = setOfDatasetCollectionSets.get(maintainer).getAsJsonObject();
			if (maintainerset.get(dataset) != null) {
				datasetcollectionset = maintainerset.get(dataset).getAsJsonObject();
				notfound = false;
			}
		} else {
			JsonObject datasetelements = new JsonObject();
			setOfDatasetCollectionSets.add(maintainer, datasetelements);
		}

		if (notfound) {
			JsonObject firestorecoll = getDatabaseSetID(collectionsetidinfo);
			JsonObject response = ReadFirestoreInformation.readFirestoreCatalogObject(firestorecoll);
			if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				datasetcollectionset = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			}
		}
		return datasetcollectionset;
	}

	/**
	 * Generate the FirestoreCatalogID from the
	 * ActivityInfoDatasetCollectionIDSpecification
	 * 
	 * @param collectionsetidinfo The ActivityInfoDatasetCollectionIDSpecification
	 * @return The FirestoreID using the specification.
	 */
	public static JsonObject getDatabaseSetID(JsonObject collectionsetidinfo) {
		String maintainer = collectionsetidinfo.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		String dataset = collectionsetidinfo.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
		JsonObject idcollection = CreateDocumentTemplate.createTemplate("dataset:ChemConnectDatasetCollectionIDsSet");

		idcollection.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		idcollection.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, dataset);
		BaseCatalogData.insertFirestoreAddress(idcollection);

		JsonObject firestoreid = idcollection.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();

		return firestoreid;
	}

	/**
	 * Insert the ChemConnectDatasetCollectionIDsSet into local memory
	 * 
	 * @param collectionset A ChemConnectDatasetCollectionIDsSet
	 * 
	 *                      This uses the maintainer and dataset informmation to
	 *                      insert the ChemConnectDatasetCollectionIDsSet into local
	 *                      memory
	 */
	private static void putInLocalVersion(JsonObject collectionset) {
		String maintainer = collectionset.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		String dataset = collectionset.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
		if (setOfDatasetCollectionSets == null) {
			setOfDatasetCollectionSets = new JsonObject();
		}
		if (setOfDatasetCollectionSets.get(maintainer) != null) {
			JsonObject maintainerset = setOfDatasetCollectionSets.get(maintainer).getAsJsonObject();
			maintainerset.add(dataset, collectionset);
		} else {
			JsonObject set = new JsonObject();
			setOfDatasetCollectionSets.add(maintainer, set);
			set.add(dataset, collectionset);
		}
	}

	/**
	 * @param owner               The owner of the catalog object
	 * @param transactionID       The transaction ID of the process to create the
	 *                            catalog object
	 * @param descr               A short description of this dataset
	 * @param collectionsetidinfo The ActivityInfoDatasetCollectionIDSpecification
	 * @return An empty ChemConnectDatasetCollectionIDsSet with no datasets loaded.
	 * 
	 */
	public static JsonObject setupNewDatabaseCollectionSet(JsonObject info, String owner, String transactionID) {
		Document document = MessageConstructor.startDocument("CreateDatabasePersonEvent");
		Element body = MessageConstructor.isolateBody(document);
		String descr = info.get(ClassLabelConstants.DescriptionAbstract).getAsString();
		JsonObject recordid = info.get(ClassLabelConstants.DatasetCollectionSetRecordIDInfo).getAsJsonObject();
		String maintainer = recordid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		String collectionname = recordid.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
		body.addElement("div").addText("Maintainer      : " + maintainer);
		body.addElement("div").addText("Collection Name : " + collectionname);
		JsonObject idcollection = DatasetCollectionIDManagement
				.createEmptyChemConnectCurrentDatasetIDSet(collectionname, owner, transactionID, maintainer, descr);
		WriteFirestoreCatalogObject.writeCatalogObject(idcollection);
		putInLocalVersion(idcollection);
		JsonArray arr = new JsonArray();
		arr.add(idcollection);
		JsonObject response = DatabaseServicesBase.standardServiceResponse(document,
				"Succes: Create Dataset Collection IDs set", arr);
		return response;
	}

	/**
	 * Insert dataset into ChemConnectDatasetCollectionIDsSet
	 * 
	 * @param recordid            The FirestoreCatalogID of the dataset to include
	 * @param collectionsetidinfo The DatasetCollectionSetRecordIDInfo
	 * @return The ChemConnectDatasetCollectionIDsSet with the dataset info included
	 * 
	 */
	public static JsonObject insertCollectionInfoDataset(JsonObject info, JsonObject prerequisites) {
		Document document = MessageConstructor.startDocument("CreateDatabasePersonEvent");
		Element body = MessageConstructor.isolateBody(document);
		String classname = info.get(ClassLabelConstants.DatasetCollectionObjectType).getAsString();
		String datasetname = info.get(ClassLabelConstants.DatasetName).getAsString();
		String datasetversion = info.get(ClassLabelConstants.DatasetVersion).getAsString();
		JsonArray objs = TransactionProcess.retrieveSetOfOutputsFromTransaction(prerequisites,
				"dataset:datasetcollectionsetcreationevent");
		JsonObject response = null;
		if (objs.size() > 0) {
			JsonObject collectionset = objs.get(0).getAsJsonObject();
			String collection = collectionset.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
			String maintainer = collectionset.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			body.addElement("div").addText("Classname: " + classname + "(" + datasetname + ": " + datasetversion + ")");
			body.addElement("div").addText("Into collection: '" + collection + "'");
			JsonObject catrecordid = CreateDocumentTemplate.createTemplate("dataset:DatasetforTypeInCollectionSet");
			catrecordid.addProperty(ClassLabelConstants.DatasetCollectionObjectType, classname);
			catrecordid.addProperty(ClassLabelConstants.DatasetName, datasetname);
			catrecordid.addProperty(ClassLabelConstants.DatasetVersion, datasetversion);
			catrecordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);

			DatasetCollectionIDManagement.insertCollectionInfoDataset(catrecordid, collectionset);
			WriteFirestoreCatalogObject.writeCatalogObject(collectionset);
			putInLocalVersion(collectionset);
			JsonArray arr = new JsonArray();
			arr.add(collectionset);
			response = DatabaseServicesBase.standardServiceResponse(document,
					"Success: Insert Dataset '" + classname + "' to Collection IDs set '" + collection + "'", arr);
		} else {
			response = DatabaseServicesBase.standardErrorResponse(document,
					"Error: Insert " + classname + "' to Collection IDs set failed", null);
		}
		return response;
	}
	
	public static boolean writeCatalogObject(JsonObject catalog, JsonObject collectionids) {
		boolean success = true;
		String identifier = catalog.get(AnnotationObjectsLabels.identifier).getAsString();
		if (collectionids.get(identifier) != null) {
			String maintainer = collectionids.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			String collectioname = collectionids.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
			JsonObject collectionid = collectionids.get(identifier).getAsJsonObject();
			String datasetname = collectionid.get(ClassLabelConstants.DatasetName).getAsString();
			String datasetversion = collectionid.get(ClassLabelConstants.DatasetVersion).getAsString();
			JsonObject recordid = catalog.get(ClassLabelConstants.DatabaseCollectionOfCurrentClass)
					.getAsJsonObject();
			recordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
			recordid.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, collectioname);
			recordid.addProperty(ClassLabelConstants.DatasetName, datasetname);
			recordid.addProperty(ClassLabelConstants.DatasetVersion, datasetversion);
			recordid.addProperty(ClassLabelConstants.CatalogDataObjectStatus, "CatalogObjectStatusCurrent");
			String classname = GenericSimpleQueries.classFromIdentifier(identifier);
			recordid.addProperty(ClassLabelConstants.DatasetCollectionObjectType, classname);
			JsonObject catid = FindDatasetCollections.findDatasetCollectionID(classname, recordid);
			String id = catalog.get(ClassLabelConstants.CatalogObjectKey).getAsString();
			catid.addProperty(ClassLabelConstants.SimpleCatalogName, id);
			catalog.add(ClassLabelConstants.FirestoreCatalogID, catid);
			WriteFirestoreCatalogObject.writeCatalogObject(catalog);
			GenerateAndWriteRDFForObject.generate(catalog);
		} else {
			success = false;
		}
		return success;
	}

}
