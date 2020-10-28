package info.esblurock.background.core.objects.catalogandrecords;

import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;
import info.esblurock.background.core.objects.constants.OntologyObjectLabels;
import info.esblurock.background.core.objects.ontology.BaseAnnotationObjects;
import info.esblurock.background.core.objects.ontology.utilities.JSONUtilitiesCatalogObjects;


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
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put(OntologyObjectLabels.catalogName, catalogName);
		JSONObject a = annotations.toJSONObject();
		obj.put(OntologyObjectLabels.annotations, a);
		JSONUtilitiesCatalogObjects.addJSONObject(obj,records);
		JSONUtilitiesCatalogObjects.addJSONObject(obj,components);
		JSONUtilitiesCatalogObjects.addJSONObject(obj,rdfmappings);
		return obj;
	}
	public void fillJSONObject(JSONObject obj) {
		catalogName = obj.getString(OntologyObjectLabels.catalogName);
		annotations = new BaseAnnotationObjects();
		annotations.fillJSONObject(obj.getJSONObject(OntologyObjectLabels.annotations));
		
	}
}
