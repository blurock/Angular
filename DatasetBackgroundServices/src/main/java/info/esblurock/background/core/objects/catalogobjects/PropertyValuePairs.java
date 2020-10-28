package info.esblurock.background.core.objects.catalogobjects;

import java.util.Iterator;

import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;

public class PropertyValuePairs extends BaseObjectJSONInterface {
	String property;
	String value;
	
	
	public PropertyValuePairs() {
		super();
		this.property = "";
		this.value = "";
    }
	public PropertyValuePairs(String property) {
		super();
		this.property = property;
		this.value = "";
}
	public PropertyValuePairs(String property, String value) {
		super();
		this.property = property;
		this.value = value;
	}
	public String getProperty() {
		return property;
	}
	public void setProperty(String property) {
		this.property = property;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	@Override
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put(property, value);
		return null;
	}
	@Override
	public void fillJSONObject(JSONObject obj) {
		Iterator<String> iter = obj.keys();
		if(iter.hasNext()) {
			this.property = iter.next();
			this.value = obj.getString(this.property);
		} else {
			this.property = "";
			this.value = "";			
		}
	}
	
	
	

}
