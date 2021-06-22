package info.esblurock.core.DataBaseObjects.catalogandrecords;

import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;


public class BaseCatalogRecordElementInformation extends BaseObjectJSONInterface {
	String elementInformation;
	boolean singlet;
	
	public BaseCatalogRecordElementInformation() {
		super();
	}
	
	public BaseCatalogRecordElementInformation(String elementInformation, boolean singlet) {
		super();
		this.elementInformation = elementInformation;
		this.singlet = singlet;
	}

	public String getElementInformation() {
		return elementInformation;
	}

	public void setElementInformation(String elementInformation) {
		this.elementInformation = elementInformation;
	}

	public boolean isSinglet() {
		return singlet;
	}

	public void setSinglet(boolean singlet) {
		this.singlet = singlet;
	}
	@Override
	public JsonObject toJsonObject() {
		JsonObject obj = new JsonObject();
		obj.addProperty(OntologyObjectLabels.elementInformation, elementInformation);
		obj.addProperty(OntologyObjectLabels.singlet, singlet);
		return obj;
	}

	@Override
	public void fillJsonObject(JsonObject obj) {
		elementInformation = obj.get(OntologyObjectLabels.elementInformation).getAsString();
		singlet = obj.get(OntologyObjectLabels.singlet).getAsBoolean();
	}
	
}
