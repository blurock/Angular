package info.esblurock.core.DataBaseObjects.utilities;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.catalogandrecords.SetOfBaseCatalogRecordElementInformation;


public class JSONUtilitiesCatalogObjects {
	
	public static void addJsonObject(JsonObject obj, SetOfBaseCatalogRecordElementInformation info) {
		JsonObject a = info.toJsonObject();
		Iterator<String> keys = a.keys();
		String key = keys.next();
		JsonArray rarray = a.getJsonArray(key);
		obj.put(key, rarray);
	}
	
	private JsonObject mapToJSON(Map<String, Object> map) {
        JsonObject obj = new JsonObject();

        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (value instanceof Map) {
                Map<String, Object> subMap = (Map<String, Object>) value;
                obj.put(key, mapToJSON(subMap));
            } else if (value instanceof List) {
                obj.put(key, listToJsonArray((List) value));
            }
            else {
                obj.put(key, value);
            }
        }
        return obj;
    }

    private JsonArray listToJsonArray(List<Object> list) {
        JsonArray arr = new JsonArray();
        for(Object obj: list) {
            if (obj instanceof Map) {
                arr.put(mapToJSON((Map) obj));
            }
            else if(obj instanceof List) {
                arr.put(listToJsonArray((List) obj));
            }
        }
        return arr;
    }
}
