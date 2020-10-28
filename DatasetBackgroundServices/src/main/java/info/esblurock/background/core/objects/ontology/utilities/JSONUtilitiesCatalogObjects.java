package info.esblurock.background.core.objects.ontology.utilities;

import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONObject;

import info.esblurock.background.core.objects.catalogandrecords.SetOfBaseCatalogRecordElementInformation;


public class JSONUtilitiesCatalogObjects {
	
	public static void addJSONObject(JSONObject obj, SetOfBaseCatalogRecordElementInformation info) {
		JSONObject a = info.toJSONObject();
		Iterator<String> keys = a.keys();
		String key = keys.next();
		JSONArray rarray = a.getJSONArray(key);
		obj.put(key, rarray);
	}

}
