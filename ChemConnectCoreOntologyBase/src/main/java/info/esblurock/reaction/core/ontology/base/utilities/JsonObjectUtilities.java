package info.esblurock.reaction.core.ontology.base.utilities;

import com.google.gson.Gson;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JsonObjectUtilities {
	
	/** Value from identifier
	 * 
	 * @param json The JsonObject to search
	 * @param identifier The identifier to search for
	 * @return The value from the identifier
	 * 
	 * If the identifier does not point to a String, then null is returned
	 * If inside or nested within a JsonArray, then one of the values is given. No guarentee which one.
	 */
	public static String getValueUsingIdentifier(JsonObject json, String identifier) {
		String ans = null;
		for (Map.Entry<String, JsonElement> prop : json.entrySet()) {
			String id = prop.getKey();
			if (id.equals(identifier)) {
				if (prop.getValue().isJsonPrimitive()) {
					if (prop.getValue().getAsJsonPrimitive().isString()) {
						ans = prop.getValue().getAsJsonPrimitive().getAsString();
					}
				}
			}
		}
		if (ans == null) {
			for (Map.Entry<String, JsonElement> prop : json.entrySet()) {
				if (prop.getValue().isJsonObject()) {
					ans = getValueUsingIdentifier(prop.getValue().getAsJsonObject(), identifier);
				}
				if (prop.getValue().isJsonArray()) {
					JsonArray arr = prop.getValue().getAsJsonArray();
					for (int i = 0; i < arr.size(); i++) {
						JsonElement element = arr.get(i);
						if (element.isJsonObject()) {
							ans = getValueUsingIdentifier(element.getAsJsonObject(), identifier);
						}
					}
				}
			}
		}
		return ans;
	}

	

	public static String toString(JsonObject obj) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String prettyJsonString = gson.toJson(obj);

		return prettyJsonString;
		
	}
	
	public static JsonObject jsonObjectFromString(String jsonS) {
		JsonObject jsonObject = new JsonParser().parse(jsonS).getAsJsonObject();
		return jsonObject;
	}
	
	public static JsonObject jsonObjectFromFile(String path) throws IOException {
		Path fileName = Path.of(path);
		JsonObject obj = null;
		String actual = "";
		try {
			actual = Files.readString(fileName);
			obj = jsonObjectFromString(actual);
		} catch (IOException e) {
			throw new IOException("File could not be read: " + path);
		}
		return obj;
	}
	
}
