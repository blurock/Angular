package info.esblurock.background.services.firestore;

import java.io.IOException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;


public class FirestoreBaseClass {

	public static String projectId = "blurock-database";
	public static String host = "localhost:8081";
	
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
		/*
		InputStream serviceAccount = new FileInputStream("/Users/edwardblurock/.config/firebase/blurock-database-firebase-adminsdk-rk0ap-cf327d31d0.json");
		GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
		*/
		
		
		
		GoogleCredentials cred = GoogleCredentials.getApplicationDefault();
		FirestoreOptions firestoreOptions = FirestoreOptions.getDefaultInstance().toBuilder()
				.setProjectId(projectId)
			    .setCredentials(cred)
			    .setEmulatorHost("localhost:8081")
			    .build();
			
			
		Firestore db = firestoreOptions.getService();
		return db;

	}

}
