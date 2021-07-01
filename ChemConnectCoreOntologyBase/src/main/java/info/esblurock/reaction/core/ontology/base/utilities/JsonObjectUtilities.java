package info.esblurock.reaction.core.ontology.base.utilities;

import com.google.gson.Gson;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JsonObjectUtilities {

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
