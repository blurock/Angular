package info.esblurock.background.services.firestore.gcs;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.datamanipulation.PartitionSetOfStringObjects;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class PartiionSetWithinRepositoryFileProcess {
	
	/**
	 * @param transactionID The transactionID
	 * @param owner The owner of the created objects
	 * @param prerequisites The InitialReadInOfRepositoryFile, where the text content lies
	 * @param info Source of extra information (ActivityRepositoryPartitionToCatalog), including the method of partition
	 * @return A set of subclasses of RepositoryDataPartitionBlock, depending on the partition method.
	 * 
	 * This calls the desired partition method (PartitionSetOfStringObjects)
	 * For each of the partitions, additional information is added (from ActivityRepositoryPartitionToCatalog)
	 * 
	 */
	public static JsonObject process(String transactionID, String owner, JsonObject prerequisites, JsonObject info) {
		Document document = MessageConstructor.startDocument("PartiionSetWithinRepositoryFile");
		Element body = MessageConstructor.isolateBody(document);
		String content = retrieveContentFromTransaction(prerequisites);
		// Parse the content using the info (FilePartitionMethod)
		String methodS = info.get(ClassLabelConstants.FilePartitionMethod).getAsString();
		info.addProperty(ClassLabelConstants.CatalogObjectOwner, owner);
		info.addProperty(ClassLabelConstants.TransactionID, transactionID);
		JsonArray objects = PartitionSetOfStringObjects.partitionString(info, content);
		String sourceformat = info.get(ClassLabelConstants.FileSourceFormat).getAsString();
		String version = info.get(ClassLabelConstants.DatasetVersion).getAsString();
		String datasetname = info.get(ClassLabelConstants.DatasetName).getAsString();
		JsonArray set = new JsonArray();
		Element table = body.addElement("table");
		Element hrow = table.addElement("tr");
		hrow.addElement("th").addText("Position");
		hrow.addElement("th").addText("Structure");
		hrow.addElement("th").addText("Message");
		for(int i=0;i<objects.size();i++) {
			Element row = table.addElement("tr");
			JsonObject catalog = objects.get(i).getAsJsonObject();
			catalog.addProperty(ClassLabelConstants.FileSourceFormat, sourceformat);
			catalog.addProperty(ClassLabelConstants.DatasetVersion, version);
			catalog.addProperty(ClassLabelConstants.DatasetName, datasetname);
			catalog.addProperty(ClassLabelConstants.FilePartitionMethod, methodS);
			String message = WriteFirestoreCatalogObject.writeCatalogObject(catalog);
			row.addElement("td").addText(catalog.get(ClassLabelConstants.Position).getAsString());
			row.addElement("td").addText(message);
			System.out.println(JsonObjectUtilities.toString(catalog));
			set.add(catalog);
		}
		String message = "Successful: " + objects.size() + "blocks";
		JsonObject response = DatabaseServicesBase.standardServiceResponse(document, message , set);
		return response;
	}
	
	/** Read in the content from the blob storage using transaction
	 * 
	 * @param prerequisites The prerequisite transaction
	 * @return The content
	 * 
	 * Using the InitialReadInOfRepositoryFile transaction, read in the content from the blob storage.
	 * If the content string is empty, then the read was not successful
	 * 
	 */
	private static String retrieveContentFromTransaction(JsonObject prerequisites) {
		String content = "";
		JsonObject staging = TransactionProcess.retrieveSingleOutputFromTransaction(prerequisites, "dataset:initreposfile");
		if(staging != null) {
			// From the RepositoryDataPartitionBlock get the blob information (GCSBlobFileInformationStaging)
			JsonObject gcsinfo = staging.get(ClassLabelConstants.GCSBlobFileInformationStaging).getAsJsonObject();
			// read content from blob storage
			content = ReadCloudStorage.read(gcsinfo);
		}
		return content;
	}

}
