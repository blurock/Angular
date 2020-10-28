package info.esblurock.background.core.objects.catalogandrecords;

import java.util.HashSet;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;


public class SetOfBaseCatalogRecordElementInformation extends BaseObjectJSONInterface {
	String elementType;
	Set<BaseCatalogRecordElementInformation> set;
	
	
	public SetOfBaseCatalogRecordElementInformation() {
		this.set = new HashSet<BaseCatalogRecordElementInformation>();
	}
	public SetOfBaseCatalogRecordElementInformation(String elementType) {
		super();
		this.elementType = elementType;
		this.set = new HashSet<BaseCatalogRecordElementInformation>();
	}

	public SetOfBaseCatalogRecordElementInformation(String elementType, Set<BaseCatalogRecordElementInformation> set) {
		super();
		this.elementType = elementType;
		this.set = set;
	}

	

	public String getElementType() {
		return elementType;
	}
	public void setElementType(String elementType) {
		this.elementType = elementType;
	}
	public Set<BaseCatalogRecordElementInformation> getSet() {
		return set;
	}
	public void setSet(Set<BaseCatalogRecordElementInformation> set) {
		this.set = set;
	}
	public void addBaseCatalogRecordElementInformation(String elementInformation, boolean singlet) {
		BaseCatalogRecordElementInformation info = new BaseCatalogRecordElementInformation(elementInformation, singlet);
		set.add(info);
	}
	
	@Override
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		JSONArray arr = new JSONArray();
		obj.put(elementType, arr);
		for(BaseCatalogRecordElementInformation info : set) {
			JSONObject jinfo = info.toJSONObject();
			arr.put(jinfo);
		}
		return obj;
	}
	
	public void fillJSONObject(JSONObject obj) {
		String[] names = JSONObject.getNames(obj);
		elementType = names[0];
		JSONArray arr = obj.getJSONArray(elementType);
		for(int i = 0 ; i < arr.length() ; i++) {
			JSONObject element = (JSONObject) arr.get(i);
			BaseCatalogRecordElementInformation hierarchy = new BaseCatalogRecordElementInformation();
			hierarchy.fillJSONObject(element);
			set.add(hierarchy);
		}
	}

}
