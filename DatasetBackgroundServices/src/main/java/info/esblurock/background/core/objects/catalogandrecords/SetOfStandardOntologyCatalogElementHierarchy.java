package info.esblurock.background.core.objects.catalogandrecords;

import java.util.HashSet;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;


public class SetOfStandardOntologyCatalogElementHierarchy extends BaseObjectJSONInterface {
	String setName;
	Set<StandardOntologyCatalogElementHierarchy> setOfCatalogElements;

	public SetOfStandardOntologyCatalogElementHierarchy(String setName, Set<StandardOntologyCatalogElementHierarchy> setOfCatalogElements) {
		super();
		this.setName = setName;
		this.setOfCatalogElements = setOfCatalogElements;
	}
	public SetOfStandardOntologyCatalogElementHierarchy(String setName) {
		super();
		this.setName = setName;
		this.setOfCatalogElements = new HashSet<StandardOntologyCatalogElementHierarchy>();
	}
	public SetOfStandardOntologyCatalogElementHierarchy() {
		super();
		this.setOfCatalogElements = new HashSet<StandardOntologyCatalogElementHierarchy>();
	}
	public void add(StandardOntologyCatalogElementHierarchy element) {
		setOfCatalogElements.add(element);
	}
	public String getSetName() {
		return setName;
	}
	public void setSetName(String setName) {
		this.setName = setName;
	}
	public void addStandardOntologyCatalogElementHierarchy(StandardOntologyCatalogElementHierarchy element) {
		this.setOfCatalogElements.add(element);
	}
	public Set<StandardOntologyCatalogElementHierarchy> getSetOfCatalogElements() {
		return setOfCatalogElements;
	}
	public void setSetOfCatalogElements(Set<StandardOntologyCatalogElementHierarchy> setOfCatalogElements) {
		this.setOfCatalogElements = setOfCatalogElements;
	}
	@Override
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		JSONArray arr = new JSONArray();
		obj.put(setName, arr);
		for(StandardOntologyCatalogElementHierarchy element : setOfCatalogElements) {
			JSONObject elmobj = element.toJSONObject();
			arr.put(elmobj);
		}
		return obj;
	}
	@Override
	public void fillJSONObject(JSONObject obj) {
		String[] names = JSONObject.getNames(obj);
		setName = names[0];
		JSONArray arr = obj.getJSONArray(setName);
		for(int i = 0 ; i < arr.length() ; i++) {
			JSONObject element = (JSONObject) arr.get(i);
			StandardOntologyCatalogElementHierarchy hierarchy = new StandardOntologyCatalogElementHierarchy();
			hierarchy.fillJSONObject(element);
			setOfCatalogElements.add(hierarchy);
		}

	}
	
}
