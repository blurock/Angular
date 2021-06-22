package info.esblurock.core.DataBaseObjects.base;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public abstract class BaseObjectJSONInterface extends BaseObjectInterface {
	
	public int indent = 5;
	
	public String toString(String prefix) {
		JsonObject obj = toJsonObject();
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		JsonElement je = JsonParser.parseString(obj.toString()).getAsJsonObject();
		String prettyJsonString = gson.toJson(je);

		return prettyJsonString;
	}
}
