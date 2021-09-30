package info.esblurock.background.services.servicecollection;

import java.io.IOException;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

/** Process data from the server
 * 
 * 
 * @author edwardblurock
 *
 */
public class DatabaseServicesBase {
	
	public static String service = "service";

	/** Process the POST
	 * 
	 * The required object within the JSON object is:
	 * service: This is the service to be performed. It should be 
	 * a subclass (within the 'dataset:' of the DatabaseServicesBase in the ontology)
	 * 
	 * Using this, the service is found and processed. The required objects for the process
	 * should be found in the JSON object (as specified by the specific DatabaseServicesBase 
	 * withinn the ontology.
	 * 
	 * @param body The body of the message
	 * @return The JSON object as return
	 * @throws IOException
	 */
	public static JsonObject process(JsonObject body) {
		String service = body.get(DatabaseServicesBase.service).getAsString();
		JsonObject response = new JsonObject();
		try {
		    ServiceCollectionQueryOntology agentqo = ServiceCollectionQueryOntology.valueOf(service);
		    response = agentqo.process(body);
		} catch(IllegalArgumentException ex) {
			try {
				ServiceCollectionFirestoreCatalogAccess agentfire = ServiceCollectionFirestoreCatalogAccess.valueOf(service);
				response = agentfire.process(body);
			} catch(IllegalArgumentException excep) {
				response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, false);
				response.addProperty(ClassLabelConstants.ServiceResponseMessage, 
						"Service not available: '" + service + "'\n" + excep.toString());
				response.add(ClassLabelConstants.SimpleCatalogObject, null);
			}
		}
		return response;
	}
	/** Standard successful service response
	 * 
	 * @param service The name of the service
	 * @param result the JsonObject result of the service
	 * @return a full service response with ServiceProcessSuccessful and ServiceResponseMessage added
	 * 
	 
	public static JsonObject standardServiceResponse(Document document, String message, JsonArray result) {
		Element body = MessageConstructor.isolateBody(document);
		body.addElement("h3").addText(message);
		JsonObject response = new JsonObject();
		response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, "true");
		response.addProperty(ClassLabelConstants.ServiceResponseMessage, MessageConstructor.DocumentToString(document));
		response.add(ClassLabelConstants.SimpleCatalogObject, result);
		return response;
	}
	*/
	/** Standard successful service response
	 * 
	 * @param service The name of the service
	 * @param result the JsonObject result of the service
	 * @return a full service response with ServiceProcessSuccessful and ServiceResponseMessage added
	 * 
	 */
	public static JsonObject standardServiceResponse(Document document, String message, JsonElement result) {
		Element body = MessageConstructor.isolateBody(document);
		body.addElement("h3").addText(message);
		JsonObject response = new JsonObject();
		response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, "true");
		response.addProperty(ClassLabelConstants.ServiceResponseMessage, MessageConstructor.DocumentToString(document));
		response.add(ClassLabelConstants.SimpleCatalogObject, result);
		return response;
	}
	public static JsonObject standardErrorResponse(Document document, JsonObject errresponse,JsonObject result) {
		JsonObject response = new JsonObject();
		response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, "false");
		String rdfmessage = errresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
		MessageConstructor.combineBodyIntoDocument(document, rdfmessage);
		
		response.addProperty(ClassLabelConstants.ServiceResponseMessage, MessageConstructor.DocumentToString(document));
		response.add(ClassLabelConstants.SimpleCatalogObject, result);
		return response;
	}
	public static JsonObject standardErrorResponse(Document document, String errresponse,JsonObject result) {
		JsonObject response = new JsonObject();
		response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, "false");
		MessageConstructor.combineBodyIntoDocument(document, errresponse);
		
		response.addProperty(ClassLabelConstants.ServiceResponseMessage, MessageConstructor.DocumentToString(document));
		response.add(ClassLabelConstants.SimpleCatalogObject, result);
		return response;
	}
	
}
