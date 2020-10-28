package info.esblurock.background.services;

import java.io.IOException;
import java.net.URL;

import org.junit.Assert;
import org.junit.Test;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.FirestoreOptions.Builder;
import com.google.common.base.Strings;

public class HelloAppEngineTest {

  @Test
  public void test() throws IOException {
    
    Builder options = FirestoreOptions.getDefaultInstance()
    		.toBuilder()
    		  .setProjectId("blurock-firebase");
    String firestoreURL = "localhost:8080";
    
    if (!Strings.isNullOrEmpty(firestoreURL)) {
    	  options.setHost(firestoreURL);
    	  options.setCredentialsProvider(null);
    	} else {
    	  options.setCredentials(GoogleCredentials.getApplicationDefault());
    	}
    	Firestore instance = options.build().getService();
    	
    	
    
  }
}
