package info.esblurock.core.DataBaseObjects.catalogandrecords;

import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.core.DataBaseObjects.utilities.JSONUtilitiesCatalogObjects;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;


public class StandardOntologyCatalogElement extends BaseObjectJSONInterface {
	String catalogName;
	BaseAnnotationObjects annotations;
	SetOfBaseCatalogRecordElementInformation records;
	SetOfBaseCatalogRecordElementInformation components;
	SetOfBaseCatalogRecordElementInformation rdfmappings;

	public StandardOntologyCatalogElement() {
		super();
	}

	public StandardOntologyCatalogElement(String catalogName, BaseAnnotationObjects annotations,
			SetOfBaseCatalogRecordElementInformation records, SetOfBaseCatalogRecordElementInformation components,
			SetOfBaseCatalogRecordElementInformation rdfmappings) {
		super();
		this.catalogName = catalogName;
		this.annotations = annotations;
		this.records = records;
		this.components = components;
		this.rdfmappings = rdfmappings;
	}
	
	

	public String getCatalogName() {
		return catalogName;
	}

	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

	public BaseAnnotationObjects getAnnotations() {
		return annotations;
	}

	public void setAnnotations(BaseAnnotationObjects annotations) {
		this.annotations = annotations;
	}

	public SetOfBaseCatalogRecordElementInformation getRecords() {
		return records;
	}

	public void setRecords(SetOfBaseCatalogRecordElementInformation records) {
		this.records = records;
	}

	public SetOfBaseCatalogRecordElementInformation getComponents() {
		return components;
	}

	public void setComponents(SetOfBaseCatalogRecordElementInformation components) {
		this.components = components;
	}

	public SetOfBaseCatalogRecordElementInformation getRdfmappings() {
		return rdfmappings;
	}

	public void setRdfmappings(SetOfBaseCatalogRecordElementInformation rdfmappings) {
		this.rdfmappings = rdfmappings;
	}

	@Override
	public JsonObject toJsonObject() {
		JsonObject obj = new JsonObject();
		obj.addProperty(OntologyObjectLabels.catalogName, catalogName);
		JsonObject a = annotations.toJsonObject();
		obj.addPropertyt(OntologyObjectLabels.annotations, a);
		JSONUtilitiesCatalogObjects.addJsonObject(obj,records);
		JSONUtilitiesCatalogObjects.addJsonObject(obj,components);
		JSONUtilitiesCatalogObjects.addJsonObject(obj,rdfmappings);
		return obj;
	}
	public void fillJsonObject(JsonObject obj) {
		catalogName = obj.get(OntologyObjectLabels.catalogName).getAsString();
		annotations = new BaseAnnotationObjects();
		annotations.fillJsonObject(obj.get(OntologyObjectLabels.annotations).getAsJsonObject();
		
	}
}
