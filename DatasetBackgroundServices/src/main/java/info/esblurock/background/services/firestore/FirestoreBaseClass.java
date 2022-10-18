package info.esblurock.background.services.firestore;

import java.io.IOException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.storage.StorageOptions;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;

public class FirestoreBaseClass {

	public static String projectId = "blurock-database";
	public static String host = "localhost:8083";

	private static Firestore database = null;

	public static JsonObject createEmptyFirestoreCatalogID() {
		JsonObject firestoreid = CreateDocumentTemplate.createTemplate("dataset:FirestoreCatalogID");
		firestoreid.add(ClassLabelConstants.CollectionDocumentIDPair, new JsonArray());
		return firestoreid;
	}

	public static Firestore getFirebaseDatabase() throws IOException {
		if (database == null) {
			database = FirestoreBaseClass.setUpDatabaseLocal();
		}
		return database;
	}

	private static Firestore setupDatabase() throws IOException {
	    
	    Firestore db =
	            FirestoreOptions.newBuilder().setProjectId("blurock-database").build().getService();

		return db;
	}

	private static Firestore setUpDatabaseLocal() throws IOException {
		GoogleCredentials cred = GoogleCredentials.getApplicationDefault();
		FirestoreOptions firestoreOptions = FirestoreOptions.getDefaultInstance().toBuilder().setProjectId(projectId)
				.setCredentials(cred)
				.setEmulatorHost("localhost:8083")
				.build();
		 
		Firestore db = firestoreOptions.getService();
		return db;

	}

}
