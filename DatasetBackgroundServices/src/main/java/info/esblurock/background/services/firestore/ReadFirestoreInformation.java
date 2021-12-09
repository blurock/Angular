package info.esblurock.background.services.firestore;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class ReadFirestoreInformation {

	/**
	 * Read in the Catalog Object
	 * 
	 * @param firestoreid The complete FirestoreCatalogID
	 * @return The object read in from the database
	 * 
	 */
	public static JsonObject readFirestoreCatalogObject(JsonObject firestoreid) {
		Document docmessage = MessageConstructor.startDocument("readFirestoreCollection");
		Element body = MessageConstructor.isolateBody(docmessage);
		body.addElement("pre").addText(JsonObjectUtilities.toString(firestoreid));
		JsonObject response = new JsonObject();
		Firestore db;
		try {
			db = FirestoreBaseClass.getFirebaseDatabase();
			DocumentReference docref = SetUpDocumentReference.setup(db, firestoreid);
			ApiFuture<DocumentSnapshot> future = docref.get();
			DocumentSnapshot document = future.get();
			if (document.exists()) {
				Map<String, Object> mapObj = document.getData();
				String jsonString = new Gson().toJson(mapObj);
				JsonObject catalog = JsonObjectUtilities.jsonObjectFromString(jsonString);
				response = DatabaseServicesBase.standardServiceResponse(docmessage, "Success: ReadFirestoreInformation",
						catalog);
			} else {
				String message = "Document not found: ";
				response = DatabaseServicesBase.standardErrorResponse(docmessage, message, response);
			}
		} catch (IOException e) {
			response = DatabaseServicesBase.standardErrorResponse(docmessage, e.toString(), response);
		} catch (InterruptedException e) {
			response = DatabaseServicesBase.standardErrorResponse(docmessage, e.toString(), response);
		} catch (ExecutionException e) {
			response = DatabaseServicesBase.standardErrorResponse(docmessage, e.toString(), response);
		}
		return response;
	}

	/**
	 * 
	 * @param setofprops         (SetOfPropertyValueQueryPairs) properties for query
	 *                           conditions
	 * @param firestorecatalogid (FirestoreCatalogID) The collection to search from
	 * @return response with SetOfCatalogObject object
	 * 
	 *         The PropertyValueQueryPair are the conditions of the search, using
	 *         collection.whereEqualTo The JsonArray (in SetOfCatalogObject) is the
	 *         catalog objects meeting this requirement
	 * 
	 *         Response:
	 *         <ul>
	 *         <li>ServiceProcessSuccessful: true if successful
	 *         <li>SimpleCatalogObject: the SetOfCatalogObject of the catalog object
	 *         retrieved
	 *         <li>ServiceResponseMessage: the ServiceResponseMessage with text
	 *         (error text if unsuccessful)
	 *         <ul>
	 */
	public static JsonObject readFirestoreCollection(JsonObject setofprops, JsonObject firestorecatalogid) {
		Document docmessage = MessageConstructor.startDocument("readFirestoreCollection");
		Element body = MessageConstructor.isolateBody(docmessage);
		firestorecatalogid.remove(ClassLabelConstants.SimpleCatalogName);
		JsonArray setofobjs = new JsonArray();
		JsonObject response = new JsonObject();
		try {
			Firestore db = FirestoreBaseClass.getFirebaseDatabase();
			CollectionReference collection = SetUpDocumentReference.setupCollection(db, firestorecatalogid);
			Query query = null;
			if (setofprops != null) {
				JsonArray props = setofprops.get(ClassLabelConstants.PropertyValueQueryPair).getAsJsonArray();
				Iterator<JsonElement> iter = props.iterator();

				Element table = body.addElement("table");
				Element rowheader = table.addElement("tr");
				rowheader.addElement("th", "Type");
				rowheader.addElement("th", "Key");
				while (iter.hasNext()) {
					Element row = table.addElement("tr");
					JsonObject pair = iter.next().getAsJsonObject();
					String type = pair.get(ClassLabelConstants.DatabaseObjectType).getAsString();
					String value = pair.get(ClassLabelConstants.ShortStringKey).getAsString();
					row.addElement("td", type);
					row.addElement("td", value);
					if (query == null) {
						query = collection.whereEqualTo(type, value);
					} else {
						query = query.whereEqualTo(type, value);
					}
				}
			}
			ApiFuture<QuerySnapshot> future = null;
			if (query == null) {
				future = collection.get();
			} else {
				future = query.get();
			}
			List<QueryDocumentSnapshot> documents = future.get().getDocuments();
			Element ul = body.addElement("ul");
			for (DocumentSnapshot document : documents) {
				Map<String, Object> mapObj = (Map<String, Object>) document.getData();
				String jsonString = new Gson().toJson(mapObj);
				JsonObject rdf = JsonObjectUtilities.jsonObjectFromString(jsonString);

				ul.addElement("li").addText(rdf.get(ClassLabelConstants.CatalogObjectKey).getAsString());
				setofobjs.add(rdf);
			}
			JsonObject set = CreateDocumentTemplate.createTemplate("dataset:SetOfCatalogObjects");
			set.add(ClassLabelConstants.SimpleCatalogObject, setofobjs);
			response = DatabaseServicesBase.standardServiceResponse(docmessage, "Successful read of catalog objects",
					set);
		} catch (IOException e) {
			response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, false);
			response.addProperty(ClassLabelConstants.ServiceResponseMessage, e.toString());
			response.add(ClassLabelConstants.SimpleCatalogObject, null);
		} catch (InterruptedException e) {
			response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, false);
			response.addProperty(ClassLabelConstants.ServiceResponseMessage, e.toString());
			response.add(ClassLabelConstants.SimpleCatalogObject, null);
		} catch (ExecutionException e) {
			response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, false);
			response.addProperty(ClassLabelConstants.ServiceResponseMessage, e.toString());
			response.add(ClassLabelConstants.SimpleCatalogObject, null);
		}
		return response;
	}

}
