package info.esblurock.background.core.objects.base;

import org.json.JSONObject;

public abstract class BaseObjectInterface {
	public abstract JSONObject toJSONObject();
	public abstract void fillJSONObject(JSONObject obj);
	
	@Override
	public String toString() {
		return toString("");
	}
	public abstract String toString(String prefix); 
}
