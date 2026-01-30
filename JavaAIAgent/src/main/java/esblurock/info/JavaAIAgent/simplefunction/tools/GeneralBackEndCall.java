package esblurock.info.JavaAIAgent.simplefunction.tools;

import java.io.IOException;
import java.net.ResponseCache;
import java.net.http.HttpClient;


public class GeneralBackEndCall {

	public static String callBackEndService(String endpoint, String jsonInput){
		String responseBodyString = "";
	    HttpClient client = java.net.http.HttpClient.newHttpClient();
	    
	    String serverString = System.getenv("BACKEND_SERVER");
	    String url = serverString + endpoint;

	    java.net.http.HttpRequest.Builder requestBuilder = java.net.http.HttpRequest.newBuilder()
		        .uri(java.net.URI.create(url))
		        .header("Content-Type", "application/json")
		        .POST(java.net.http.HttpRequest.BodyPublishers.ofString(jsonInput));
	    
	    // --- AUTHENTICATION LOGIC ---
	    // Only fetch token if NOT using localhost (Emulator)
	    try {
	    if (!serverString.contains("localhost") && !serverString.contains("127.0.0.1")) {
	        String token = AuthUtils.getOidcToken(url);
	        requestBuilder.header("Authorization", "Bearer " + token);
	    }
	    java.net.http.HttpResponse<String> response = client.send(
		        requestBuilder.build(), 
		        java.net.http.HttpResponse.BodyHandlers.ofString()
		    );
	    if (response.statusCode() != 200) {
	    	responseBodyString = "ERROR: " + response.statusCode() + " - " + response.body();
	    } else {
	    	responseBodyString = response.body();
	    }
	} catch (IOException ex) {
		responseBodyString = "ERROR: Exception during authorization for backend call: " + ex.getMessage();
	} catch (InterruptedException ex) {
		responseBodyString = "ERROR: Exception during backend call: " + ex.getMessage();
	}
	    

		return responseBodyString;
	}
}
