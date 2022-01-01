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

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;

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
		JsonArray arr = getValueUsingIdentifierMultiple(json,identifier);
		String ans = null;
		if(arr.size() > 0) {
			if(arr.get(0).isJsonPrimitive()) {
				ans = arr.get(0).getAsString();
			}
		}
		return ans;
	}

	/**
	 * @param json The catalog/record to search for the identifier
	 * @param identifier The identifier to get the set of values
	 * @return an array of the values
	 * 
	 * This assumes that the identifiers are unique within the catalog/record object (not repeated with object)
	 * If a single value, then one value is returned.
	 * If the identifier points to a JsonArray, then all the elements of the array are found
	 * If the identifier is within an JsonObject within the array, then all the values from the array are given
	 * 
	 */
	public static JsonArray getValueUsingIdentifierMultiple(JsonObject json, String identifier) {
		JsonArray totalarr = new JsonArray();
		for (Map.Entry<String, JsonElement> prop : json.entrySet()) {
			String id = prop.getKey();
			if (id.equals(identifier)) {
				if (prop.getValue().isJsonPrimitive()) {
					if (prop.getValue().getAsJsonPrimitive().isString()) {
						String ans = prop.getValue().getAsJsonPrimitive().getAsString();
						totalarr.add(ans);
					}
				} else if (prop.getValue().isJsonObject()) {
						JsonObject obj = prop.getValue().getAsJsonObject();
						totalarr.add(obj);
				} else if (prop.getValue().isJsonArray()) {
						JsonArray obj = prop.getValue().getAsJsonArray();
						totalarr.addAll(obj);
				}						
			} else {
				if (prop.getValue().isJsonObject()) {
					JsonArray ans = getValueUsingIdentifierMultiple(prop.getValue().getAsJsonObject(), identifier);
					totalarr.addAll(ans);
				} else if (prop.getValue().isJsonArray()) {
					JsonArray ans = getValueUsingIdentifierMultiple(prop.getValue().getAsJsonArray(), identifier);
					totalarr.addAll(ans);
				}
			}
		}
		return totalarr;
	}

	/**
	 * @param arr An array of JsonObjects or JsonArrays
	 * @param identifier The identifier to search for
	 * @return The list of values of the identifier.
	 * 
	 * This routine allows that a JsonArray can be an array of JsonArray objects.
	 */
	public static JsonArray getValueUsingIdentifierMultiple(JsonArray arr, String identifier) {
		JsonArray totalarr = new JsonArray();
		for (int i = 0; i < arr.size(); i++) {
			JsonElement element = arr.get(i);
			if (element.isJsonObject()) {
				JsonArray ans = getValueUsingIdentifierMultiple(element.getAsJsonObject(), identifier);
				totalarr.addAll(ans);
			} else if(element.isJsonArray()) {
				JsonArray ans = getValueUsingIdentifierMultiple(element.getAsJsonArray(), identifier);
				totalarr.addAll(ans);				
			}
		}
		return totalarr;
	}


	public static String toString(JsonObject obj) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String prettyJsonString = gson.toJson(obj);
		return prettyJsonString;
		
	}
	public static String toString(JsonArray arr) {
		StringBuilder build = new StringBuilder();
		for(int i=0; i<arr.size(); i++) {
			JsonElement element = arr.get(i);
			if(element.isJsonPrimitive()) {
				build.append(element.getAsString());
			} else {
				JsonObject obj = element.getAsJsonObject();
				build.append(toString(obj));
			}
			
		}
		return build.toString();
	}
	
	public static void printResponse(JsonObject response) {
		boolean success = response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean();
		if(success) {
			System.out.println("The process was a success");
			String message = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
			System.out.println(message);
			if(response.get(ClassLabelConstants.SimpleCatalogObject).isJsonObject()) {
				JsonObject object = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				System.out.println(JsonObjectUtilities.toString(object));
			} else {
				JsonArray object = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				System.out.println(JsonObjectUtilities.toString(object));
			}
			
		} else {
			System.out.println("The process was not a success");
			String message = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
			System.out.println(message);
		}
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
