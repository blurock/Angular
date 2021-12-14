package info.esblurock.background.services.firestore;

import java.io.IOException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

public class InitiallizeSystem {
	
	public static void initialize() {
		intializeFirebase();
	}
	
	private static void intializeFirebase() {
		FirebaseOptions options;
		try {
			options = FirebaseOptions.builder()
					.setCredentials(GoogleCredentials.getApplicationDefault())
					.setStorageBucket("blurock-database.appspot.com").build();
		FirebaseApp.initializeApp(options);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
