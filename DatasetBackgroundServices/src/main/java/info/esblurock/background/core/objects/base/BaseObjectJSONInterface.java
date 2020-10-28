package info.esblurock.background.core.objects.base;

import org.json.JSONObject;

public abstract class BaseObjectJSONInterface extends BaseObjectInterface {
	
	public int indent = 5;
	
	public String toString(String prefix) {
		JSONObject object = toJSONObject();
		return object.toString(indent);
	}
}
