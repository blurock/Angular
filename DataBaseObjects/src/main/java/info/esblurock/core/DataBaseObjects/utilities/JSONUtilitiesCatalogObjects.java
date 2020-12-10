package info.esblurock.core.DataBaseObjects.utilities;

import java.util.Iterator;

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

}
