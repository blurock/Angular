package info.esblurock.background.services.servicecollection;

import java.io.IOException;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.Firestore;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.FirestoreBaseClass;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;

public enum ServiceCollectionFirestoreCatalogAccess {
	FirestoreServiceWriteCatalogObject {

		@Override
		public JsonObject process(JsonObject json) {
			JsonObject response = new JsonObject();
			Firestore db;
			try {
				db = FirestoreBaseClass.getFirebaseDatabase();
				JsonObject catalog = json.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				JsonObject firestorecatalogid = json.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
				WriteFirestoreCatalogObject.write(db, catalog, firestorecatalogid);
				response = DatabaseServicesBase.standardServiceResponse("FirestoreServiceWriteCatalogObject", null);
			} catch (IOException e) {
				response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, false);
				response.addProperty(ClassLabelConstants.ServiceResponseMessage, e.getMessage());
				response.add(ClassLabelConstants.SimpleCatalogObject, null);
			}
			return response;
		}
		
	};
	public abstract JsonObject process(JsonObject json);
}
