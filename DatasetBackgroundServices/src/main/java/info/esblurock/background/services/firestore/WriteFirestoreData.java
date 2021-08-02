package info.esblurock.background.services.firestore;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.google.api.core.ApiFuture;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiIssuer;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import info.esblurock.background.services.ontology.Message;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;

@Api(
	    name = "firestorewrite",
	    version = "v1",
	    namespace =
	    @ApiNamespace(
	        ownerDomain = "firestore.esblurock.info",
	        ownerName = "firestore.esblurock.info",
	        packagePath = ""
	    ),
	    // [START_EXCLUDE]
	    issuers = {
	        @ApiIssuer(
	            name = "firebase",
	            issuer = "https://securetoken.google.com/blurock-firebase",
	            jwksUri =
	                "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system"
	                    + ".gserviceaccount.com"
	        )
	    }
	    )
public class WriteFirestoreData {
	
	 @ApiMethod(httpMethod = ApiMethod.HttpMethod.GET, name = "writeempty")
	  public Message writeempty(@Named("catalogname") String catalogname) {
		 Message message = new Message();
		 
			//Date today = new Date();
			//DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  
			//String strDate = dateFormat.format(today);  
			
			try {
				Firestore db = FirestoreBaseClass.getFirebaseDatabase();
				DocumentReference docRef = db.collection("empty").document("catalog");
				JsonObject catalog = CreateDocumentTemplate.createSubTemplate(catalogname);
				
				Map<String, Object> mapObj = new Gson().fromJson(
						  catalog, new TypeToken<HashMap<String, Object>>() {}.getType()
						);
				//JsonElement gson = JsonParser.parseString(basS);
				ApiFuture<WriteResult> result = docRef.set(mapObj);
				System.out.println("Update time : " + result.get().getUpdateTime());
			} catch (IOException e) {
				e.printStackTrace();
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (ExecutionException e) {
				e.printStackTrace();
			}
		 
		 return message;
	 }

}
