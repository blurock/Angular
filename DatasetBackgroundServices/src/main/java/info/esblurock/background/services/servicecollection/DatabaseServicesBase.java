package info.esblurock.background.services.servicecollection;

import java.io.IOException;

import com.google.gson.JsonObject;

public class DatabaseServicesBase {

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
