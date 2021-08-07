package info.esblurock.background.services.firestore;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import info.esblurock.background.services.ontology.Message;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;

@WebServlet(
	    name = "WriteFirestoreData",
	    urlPatterns = {"/writeempty"}
	)
public class WriteFirestoreData {
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) 
		      throws IOException {		 
			Message message = new Message();
			String catalogname = request.getParameter("catalogname");
			try {
				Firestore db = FirestoreBaseClass.getFirebaseDatabase();
				DocumentReference docRef = db.collection("empty").document("catalog");
				JsonObject catalog = CreateDocumentTemplate.createSubTemplate(catalogname);
				
				Map<String, Object> mapObj = new Gson().fromJson(
						  catalog, new TypeToken<HashMap<String, Object>>() {}.getType()
						);
				//JsonElement gson = JsonParser.parseString(basS);
				ApiFuture<WriteResult> result = docRef.set(mapObj);
				message.setMessage("Successful write to empty/catalog: " + result.get().getUpdateTime());
			} catch (IOException e) {
				e.printStackTrace();
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (ExecutionException e) {
				e.printStackTrace();
			}
		 
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.println(message.getMessage());
	 }

}
