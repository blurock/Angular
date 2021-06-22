package info.esblurock.core.DataBaseObjects.catalogandrecords;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;


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
	public JsonObject toJsonObject() {
		JsonObject obj = new JsonObject();
		obj.addProperty(AnnotationObjectsLabels.identifier, elementType);
		JsonArray arr = new JsonArray();
		obj.add(elementType, arr);
		for(BaseCatalogRecordElementInformation info : set) {
			JsonObject jinfo = info.toJsonObject();
			arr.add(jinfo);
		}
		return obj;
	}
	
	public void fillJsonObject(JsonObject obj) {
		elementType = obj.get(AnnotationObjectsLabels.identifier).getAsString();
		JsonArray arr = obj.get(elementType).getAsJsonArray();
		Iterator<JsonElement> iter = arr.iterator();
		while(iter.hasNext()) {
			JsonObject element = (JsonObject) iter.next();
			BaseCatalogRecordElementInformation hierarchy = new BaseCatalogRecordElementInformation();
			hierarchy.fillJsonObject(element);
			set.add(hierarchy);
		}
	}

}
