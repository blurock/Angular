package info.esblurock.background.services.firestore;

import java.io.FileInputStream;
import java.io.IOException;

import com.google.appengine.api.utils.SystemProperty;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;

public class InitiallizeSystem {

	static FirebaseOptions options = null;

	public static void initialize() {
		intializeFirebase();
	}

	private static void intializeFirebase() {
		if (options == null) {
			try {
			if (SystemProperty.environment.value() == SystemProperty.Environment.Value.Production) {
				options = FirebaseOptions.builder().setCredentials(GoogleCredentials.getApplicationDefault())
						.setStorageBucket("blurock-database.appspot.com").build();
				 } else {
					 FileInputStream serviceAccount =
							  new FileInputStream("path/to/serviceAccountKey.json");

							FirebaseOptions options = new FirebaseOptions.Builder()
							  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
							  .setStorageBucket("blurock-database.appspot.com")
							  .build();

							FirebaseApp.initializeApp(options);
				}
				FirebaseApp.initializeApp(options);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
