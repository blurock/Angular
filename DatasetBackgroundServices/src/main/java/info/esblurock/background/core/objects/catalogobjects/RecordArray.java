package info.esblurock.background.core.objects.catalogobjects;

import java.util.HashSet;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;
import info.esblurock.background.core.objects.constants.SupplementaryConstants;


public class RecordArray extends BaseObjectJSONInterface  {
	String multiplename;
	Set<BaseRecordObject> array;
	
	public RecordArray() {
		this.array = new HashSet<BaseRecordObject>();
	}
	public String getMultiplename() {
		return multiplename;
	}

	public void setMultiplename(String multiplename) {
		this.multiplename = multiplename;
	}

	public void addRecordObject(BaseRecordObject obj) {
		array.add(obj);
	}

	@Override
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		JSONArray jarray = new JSONArray();
		for(BaseRecordObject subobj : array) {
			JSONObject jobj = subobj.toJSONObject();
			jarray.put(jobj);
		}
		obj.put(SupplementaryConstants.type, multiplename);
		obj.put(multiplename,jarray);
		return obj;
	}

	@Override
	public void fillJSONObject(JSONObject obj) {
		this.multiplename = obj.getString(SupplementaryConstants.type);
		JSONArray jarray = obj.getJSONArray(this.multiplename);
		for(int i=0 ; i < jarray.length() ; i++) {
			JSONObject jobj = (JSONObject) jarray.get(i);
			BaseRecordObject rec = new BaseRecordObject();
			rec.fillJSONObject(jobj);
			array.add(rec);
		}
	}

}
