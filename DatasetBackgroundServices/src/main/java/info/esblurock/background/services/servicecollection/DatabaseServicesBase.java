package info.esblurock.background.services.servicecollection;

import java.io.IOException;

import com.google.gson.JsonObject;

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

		JsonObject answer = new JsonObject();
		String service = body.get("service").getAsString();
		ServiceCollectionObjectManipulation agent = ServiceCollectionObjectManipulation.valueOf(service);
		if (agent != null) {
			answer = agent.process(body);
		} else {
			throw new IOException("Service not available: '" + service + "'");
		}
		return answer;
	}
}
