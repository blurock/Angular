package info.esblurock.core.DataBaseObjects.catalogobjects;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.reaction.core.ontology.base.constants.SupplementaryConstants;


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
	public JsonObject toJsonObject() {
		JsonObject obj = new JsonObject();
		JsonArray jarray = new JsonArray();
		for(BaseRecordObject subobj : array) {
			JsonObject jobj = subobj.toJsonObject();
			jarray.put(jobj);
		}
		obj.put(SupplementaryConstants.type, multiplename);
		obj.put(multiplename,jarray);
		return obj;
	}

	@Override
	public void fillJsonObject(JsonObject obj) {
		this.multiplename = obj.getString(SupplementaryConstants.type);
		JsonArray jarray = obj.getJsonArray(this.multiplename);
		for(int i=0 ; i < jarray.length() ; i++) {
			JsonObject jobj = (JsonObject) jarray.get(i);
			BaseRecordObject rec = new BaseRecordObject();
			rec.fillJsonObject(jobj);
			array.add(rec);
		}
	}

}
