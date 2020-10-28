package info.esblurock.background.core.objects.catalogandrecords;

import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;
import info.esblurock.background.core.objects.constants.OntologyObjectLabels;


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
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put(OntologyObjectLabels.elementInformation, elementInformation);
		obj.put(OntologyObjectLabels.singlet, singlet);
		return obj;
	}

	@Override
	public void fillJSONObject(JSONObject obj) {
		elementInformation = obj.getString(OntologyObjectLabels.elementInformation);
		singlet = obj.getBoolean(OntologyObjectLabels.singlet);
	}
	
}
