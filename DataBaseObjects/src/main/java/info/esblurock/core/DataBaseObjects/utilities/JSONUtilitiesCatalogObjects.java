package info.esblurock.core.DataBaseObjects.utilities;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import info.esblurock.core.DataBaseObjects.catalogandrecords.SetOfBaseCatalogRecordElementInformation;


public class JSONUtilitiesCatalogObjects {
	
	public static void addJSONObject(JSONObject obj, SetOfBaseCatalogRecordElementInformation info) {
		JSONObject a = info.toJSONObject();
		Iterator<String> keys = a.keys();
		String key = keys.next();
		JSONArray rarray = a.getJSONArray(key);
		obj.put(key, rarray);
	}
	
	private JSONObject mapToJSON(Map<String, Object> map) {
        JSONObject obj = new JSONObject();

        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (value instanceof Map) {
                Map<String, Object> subMap = (Map<String, Object>) value;
                obj.put(key, mapToJSON(subMap));
            } else if (value instanceof List) {
                obj.put(key, listToJSONArray((List) value));
            }
            else {
                obj.put(key, value);
            }
        }
        return obj;
    }

    private JSONArray listToJSONArray(List<Object> list) {
        JSONArray arr = new JSONArray();
        for(Object obj: list) {
            if (obj instanceof Map) {
                arr.put(mapToJSON((Map) obj));
            }
            else if(obj instanceof List) {
                arr.put(listToJSONArray((List) obj));
            }
        }
        return arr;
    }
}
