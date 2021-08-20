package info.esblurock.background.services.servicecollection;

import java.io.IOException;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

/** Process data from the server
 * 
 * 
 * @author edwardblurock
 *
 */
public class DatabaseServicesBase {

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
	public static JsonObject process(JsonObject body) throws IOException {
		System.out.println("Process: " + body);
		System.out.println("Process: " + JsonObjectUtilities.toString(body));
		JsonObject answer = new JsonObject();
		String service = body.get("service").getAsString();
		System.out.println("Service: " + service );
		try {
		    ServiceCollectionQueryOntology agentqo = ServiceCollectionQueryOntology.valueOf(service);
		    answer = agentqo.process(body);
		} catch(IllegalArgumentException ex) {
			try {
				ServiceCollectionFirestoreCatalogAccess agentfire = ServiceCollectionFirestoreCatalogAccess.valueOf(service);
				agentfire.process(body);
			} catch(IllegalArgumentException excep) {
				throw new IOException("Service not available: '" + service + "'");
			}
		}
		return answer;
	}
	/** Standard successful service response
	 * 
	 * @param service The name of the service
	 * @param result the JsonObject result of the service
	 * @return a full service response with ServiceProcessSuccessful and ServiceResponseMessage added
	 * 
	 */
	public static JsonObject standardServiceResponse(String service, JsonObject result) {
		JsonObject response = new JsonObject();
		response.addProperty(ClassLabelConstants.ServiceProcessSuccessful, "true");
		String responseS = service + ": Successful";
		response.addProperty(ClassLabelConstants.ServiceResponseMessage, responseS);
		response.add(ClassLabelConstants.SimpleCatalogObject, result);
		return response;
	}
	
}
