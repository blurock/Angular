package info.esblurock.core.DataBaseObjects.catalogandrecords;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;


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
	public JsonObject toJsonObject() {
		JsonObject obj = new JsonObject();
		obj.addProperty(AnnotationObjectsLabels.identifier, setName);
		JsonArray arr = new JsonArray();
		obj.add(setName, arr);
		for(StandardOntologyCatalogElementHierarchy element : setOfCatalogElements) {
			JsonObject elmobj = element.toJsonObject();
			arr.add(elmobj);
		}
		return obj;
	}
	@Override
	public void fillJsonObject(JsonObject obj) {
		String setName = obj.get(AnnotationObjectsLabels.identifier).getAsString();
		JsonArray arr = obj.get(setName).getAsJsonArray();
		Iterator<JsonElement> iter = arr.iterator();
		while(iter.hasNext()) {
			JsonObject element = (JsonObject) iter.next();
			StandardOntologyCatalogElementHierarchy hierarchy = new StandardOntologyCatalogElementHierarchy();
			hierarchy.fillJsonObject(element);
			setOfCatalogElements.add(hierarchy);
		}

	}
	
}
