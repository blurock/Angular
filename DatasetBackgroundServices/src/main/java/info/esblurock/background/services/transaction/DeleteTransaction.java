package info.esblurock.background.services.transaction;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.cloud.firestore.DocumentReference;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.DeleteCatalogDataObject;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.SetUpDocumentReference;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.service.rdfs.DeleteRDFs;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class DeleteTransaction extends DeleteCatalogDataObject {

	public static JsonObject deleteTransactionwithID(JsonObject firestoreid) {
		JsonObject deleteresponse = null;
		JsonObject response = ReadFirestoreInformation.readFirestoreCatalogObject(firestoreid);
		if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			JsonObject object = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			deleteresponse = DeleteTransaction.deleteTransaction(object);
		} else {
			deleteresponse = response;
		}
		return deleteresponse;
	}
	
	/**
	 * @param info Info with TransactionEventType and DatasetCollectionSetRecordIDInfo
	 * @return The response for the deleted transaction
	 * 
	 * This finds the dataset transaction (using FindTransactions.findDatasetTransaction)
	 * and then deletes it and the associated transaction objects (using deleteTransaction in this class)
	 * 
	 */
	public static JsonObject deleteDatasetTransaction(JsonObject info) {
		String transactiontype = info.get(ClassLabelConstants.TransactionEventType).getAsString();
		JsonObject transaction = FindTransactions.findDatasetTransaction(info,transactiontype, true);
		JsonObject response = deleteTransaction(transaction);
		return response;
	}

	/**
	 * @param transaction The transaction JsonObject
	 * 
	 *                    This deletes the catalog objects listed in the
	 *                    transaction, the RDFs (using the TransactionID) that were
	 *                    created and the transactions
	 */
	public static JsonObject deleteTransaction(JsonObject transaction) {
	    String idS = transaction.get(ClassLabelConstants.CatalogObjectKey).getAsString();
		Document document = MessageConstructor.startDocument("Transaction: " + idS);
		Element body = MessageConstructor.isolateBody(document);
		getFirestoreID();
		int deleted = 0;
		JsonArray arr = transaction.get(ClassLabelConstants.DatabaseObjectIDOutputTransaction).getAsJsonArray();
		for (int i = 0; i < arr.size(); i++) {
			JsonObject firestoreid = arr.get(i).getAsJsonObject();
			DocumentReference docref = SetUpDocumentReference.setup(db, firestoreid);
			docref.delete();
			deleted++;
		}
		String message1 = "Deleted objects: " + Integer.toString(deleted);
		body.addElement("div").addText(message1);
		String transactionid = transaction.get(ClassLabelConstants.TransactionID).getAsString();
		int rdfdeleted = DeleteRDFs.deleteRDFs(transactionid);
		String message2 = "Deleted RDFs: " + Integer.toString(rdfdeleted);
		body.addElement("div").addText(message2);
		deleted += rdfdeleted;

		JsonObject transid = transaction.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
		DocumentReference docref = SetUpDocumentReference.setup(db, transid);
		docref.delete();
		body.addElement("div").addText("Deleted Transaction");

		deleted++;

		String totalmessage = "Total number of deleted items: " + Integer.toString(deleted);
		JsonObject response = DatabaseServicesBase.standardServiceResponse(document, totalmessage, null);

		return response;
	}
}
