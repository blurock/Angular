package info.esblurock.background.services;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.google.gson.JsonObject;
import org.junit.Test;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;


public class TestReadCatalogWithAnnotations {

	@Test
	public void test() throws IOException {
		/*
		String projectId = "blurock-firebase";
		
	    FirestoreOptions firestoreOptions =
	            FirestoreOptions.getDefaultInstance().toBuilder()
	                .setProjectId(projectId)
	                .setHost("localhost:8000")
	                .setCredentials(GoogleCredentials.getApplicationDefault())
	                .build();
	        Firestore db = firestoreOptions.getService();

			String catalogname = "dataset:RepositoryFileStaging";
			DocumentReference docRef = db.collection("catalog").document(catalogname);
			ApiFuture<DocumentSnapshot> future = docRef.get();
			try {
				DocumentSnapshot document = future.get();
				if (document.exists()) {
					  JsonObject obj = JSONToMap.ConvertMapToJsonObject(document.getData());
					  System.out.println("Document data: " + obj);
					} else {
					  System.out.println("No such document!");
					}
			} catch (InterruptedException | ExecutionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

	        */
	}

}
