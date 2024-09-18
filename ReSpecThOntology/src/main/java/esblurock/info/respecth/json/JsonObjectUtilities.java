package esblurock.info.respecth.json;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Map;

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

	/** Combine 2 JsonArray objects
	 * 
	 * @param arr1 first JsonArray
	 * @param arr2 second JsonArray
	 * @return combined array (order is preserved)
	 */
	public static JsonArray combineJsonArray(JsonArray arr1, JsonArray arr2) {
		JsonArray answer = new JsonArray();
		for(int i=0;i < arr1.size();i++) {
			answer.add(arr1.get(i));
		}
		for(int i=0;i < arr2.size();i++) {
			answer.add(arr2.get(i));
		}
		return answer;
	}

	/** Print as String
	 * @param obj The JsonObject to pring as string
	 * @return The string
	 */
	public static String toString(JsonObject obj) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String prettyJsonString = gson.toJson(obj);
		return prettyJsonString;
		
	}
	/** Print as String
	 * @param arr The JsonArray to print as string
	 * @return The string version
	 */
	public static String toString(JsonArray arr) {
		StringBuilder build = new StringBuilder();
		build.append(" [");
		for(int i=0; i<arr.size(); i++) {
			JsonElement element = arr.get(i);
			if(element.isJsonPrimitive()) {
				build.append(" ");
				build.append(element.getAsString());
				build.append(" ");
			} else {
			    build.append("\n\n");
				JsonObject obj = element.getAsJsonObject();
				build.append(toString(obj));
			}

		}
		build.append("] ");
		return build.toString();
	}
    static JsonObject objectToJson(Object obj) {
        GsonBuilder gsonMapBuilder = new GsonBuilder();          
        Gson gsonObject = gsonMapBuilder.create();  
        Type type = new TypeToken<Map<String, Object>>(){}.getType();
        String json = gsonObject.toJson(obj, type);
        JsonObject jsonobj = JsonObjectUtilities.jsonObjectFromString(json);
        return jsonobj;
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
   
  
    /** find the integer index in a list of integers
     * 
     * @param index The index to find
     * @param indicies The array of indicies
     * @return The position in the array (-1 if not found)
     * 
     */
    public static int findindex(int index, ArrayList<Integer> indicies) {
        int i=0;
        boolean notdone = true;
        int found = -1;
        while(notdone && i < indicies.size()) {
            if(index == indicies.get(i)) {
                notdone = false;
                found = i;
            }
            i++;
        }
        return found;
    }
    
    
    /**
     * @param index
     * @param indicies
     * @param maparray
     */
    public static void remove(int index, ArrayList<Integer> indicies, ArrayList<Map<String, Object>> maparray) {
        int i = 0;
        boolean notdone = true;
        while(notdone && i < maparray.size()) {
            if(indicies.get(i) == index) {
                indicies.remove(i);
                maparray.remove(i);
                notdone = false;
            } else {
                i++;
            }
        }
    }
    
	
}
