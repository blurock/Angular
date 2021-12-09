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
	 * @param transaction The transaction JsonObject
	 * 
	 *                    This deletes the catalog objects listed in the
	 *                    transaction, the RDFs (using the TransactionID) that were
	 *                    created and the transactions
	 */
	public static JsonObject deleteTransaction(JsonObject transaction) {
		Document document = MessageConstructor.startDocument("Transaction: " + transaction);
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
		JsonObject response = DatabaseServicesBase.standardErrorResponse(document, totalmessage, null);

		return response;
	}
}
