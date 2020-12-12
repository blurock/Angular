package info.esblurock.background.services.firestore;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;


public class FirestoreBaseClass {

	public static String projectId = "blurock-firebase";
	public static String host = "localhost:8000";
	
	private static Firestore database = null;
	
	public static Firestore getFirebaseDatabase() throws IOException {
		if(database == null) {
				database = FirestoreBaseClass.setUpDatabaseLocal();
		}
		return database;
	}

	private static Firestore setupDatabase() throws IOException {
		
		GoogleCredentials cred = GoogleCredentials.getApplicationDefault();

		FirestoreOptions firestoreOptions = FirestoreOptions.getDefaultInstance().toBuilder().setProjectId(projectId)
				.setCredentials(cred)
				.build();
		Firestore db = firestoreOptions.getService();
		return db;
	}
	
	private static Firestore setUpDatabaseLocal() throws IOException {
		InputStream serviceAccount = new FileInputStream("/Users/edwardblurock/eclipse-angular/blurock-firebase-e22a29315682.json");
		GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
		
		
		FirebaseOptions options = FirebaseOptions.builder()
			    .setCredentials(credentials)
			    .build();

			FirebaseApp.initializeApp(options);

		Firestore db = FirestoreClient.getFirestore();
		return db;

	}

}
