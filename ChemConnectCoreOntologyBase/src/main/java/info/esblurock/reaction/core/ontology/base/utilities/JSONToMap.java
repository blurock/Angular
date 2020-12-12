package info.esblurock.reaction.core.ontology.base.utilities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

public class JSONToMap {

	public static Map<String,Object> ConvertJSONToMap(JSONObject json) {
		Map<String,Object> result = new HashMap<String,Object>();
		
		Set<String> keys = json.keySet();
		for(String key : keys) {
			Object value = json.get(key);
			if(value instanceof String) {
				result.put(key, value);
			} else if(value instanceof JSONObject) {
				JSONObject jobj = (JSONObject) value;
				Map<String,Object> m = ConvertJSONToMap(jobj);
				result.put(key, m);
			} else if(value instanceof JSONArray) {
				JSONArray arr = (JSONArray) value;
				ArrayList<Map<String,Object>> lst = new ArrayList<Map<String,Object>>();
				for(int i = 0; i < arr.length(); i++) {
					JSONObject jobj = arr.getJSONObject(i);
					Map<String,Object> m = ConvertJSONToMap(jobj);
					lst.add(m);
				}
				result.put(key,lst);
			}
		}
		return result;
	}
	
	public static JSONObject ConvertMapToJSONObject(Map<String,Object> map) {
		JSONObject jobj = new JSONObject();
		
		Set<String> keys = map.keySet();
		for(String key : keys) {
			Object value = map.get(key);
			if(value instanceof String) {
				jobj.put(key, value);
			} if(value instanceof Map) {
				Map<String,Object> mvalue = (Map<String,Object>) value;
				JSONObject mobj = ConvertMapToJSONObject(mvalue);
				jobj.put(key, mobj);
			} if(value instanceof ArrayList) {
				ArrayList<Map<String,Object>> lst = (ArrayList<Map<String,Object>>) value;
				JSONArray jsonarray = new JSONArray();
				for(Map<String,Object> object : lst) {
					JSONObject jo = ConvertMapToJSONObject(object);
					jsonarray.put(jo);
				}
				jobj.put(key, jsonarray);
			}
		}
		return jobj;
	}
	
}
