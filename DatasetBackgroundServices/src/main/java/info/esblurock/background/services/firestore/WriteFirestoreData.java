package info.esblurock.background.services.firestore;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
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
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

@WebServlet(
	    name = "WriteFirestoreData",
	    urlPatterns = {"/writeempty"}
	)
public class WriteFirestoreData extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) 
		      throws IOException {		 
			Message message = new Message();
			message.setMessage("WriteFirestoreData empty object\n\n");
			String catalogname = request.getParameter("catalogname");
			try {
				message.addMessage("Catalog name: " + catalogname);
				Firestore db = FirestoreBaseClass.getFirebaseDatabase();
				DocumentReference docRef = db.collection("empty").document("catalog");
				JsonObject catalog = CreateDocumentTemplate.createTemplate(catalogname);
				message.addMessage(JsonObjectUtilities.toString(catalog));
				Map<String, Object> mapObj = new Gson().fromJson(
						  catalog, new TypeToken<HashMap<String, Object>>() {}.getType()
						);
				ApiFuture<WriteResult> result = docRef.set(mapObj);
				message.addMessage("\nSuccessful write to empty/catalog: " + result.get().getUpdateTime());
			} catch (IOException e) {
				message.addMessage(e.toString());
			} catch (InterruptedException e) {
				message.addMessage(e.toString());
			} catch (ExecutionException e) {
				message.addMessage(e.toString());
			} catch(Exception e) {
				message.addMessage(e.toString());
			}
		 
			response.setContentType("text");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.println(message.getMessage());
	 }

}
