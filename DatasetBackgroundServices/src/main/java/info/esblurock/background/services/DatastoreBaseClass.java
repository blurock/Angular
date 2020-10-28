package info.esblurock.background.services;

import java.io.IOException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;

public class DatastoreBaseClass {

	String projectId = "blurock-firebase";
	String host = "localhost:8000";

	public Firestore setupDatabase() throws IOException {
		
		GoogleCredentials cred = GoogleCredentials.getApplicationDefault();

		FirestoreOptions firestoreOptions = FirestoreOptions.getDefaultInstance().toBuilder().setProjectId(projectId)
				.setCredentials(cred)
				.build();
		Firestore db = firestoreOptions.getService();
		return db;
	}

}
