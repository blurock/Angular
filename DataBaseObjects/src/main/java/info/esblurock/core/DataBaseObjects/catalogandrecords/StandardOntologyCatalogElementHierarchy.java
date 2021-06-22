package info.esblurock.core.DataBaseObjects.catalogandrecords;

import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;


public class StandardOntologyCatalogElementHierarchy extends BaseObjectJSONInterface {
	String catalogName;
	BaseAnnotationObjects annotations;
	SetOfBaseCatalogRecordElementInformation rdfmappings;
	SetOfStandardOntologyCatalogElementHierarchy subRecordsSinglet;
	SetOfStandardOntologyCatalogElementHierarchy subComponentsSinglet;
	SetOfStandardOntologyCatalogElementHierarchy subRecordsMultiple;
	SetOfStandardOntologyCatalogElementHierarchy subComponentsMultiple;
	
	public StandardOntologyCatalogElementHierarchy() {
		super();
		this.catalogName = "";
		this.annotations = new BaseAnnotationObjects();
		this.rdfmappings = new SetOfBaseCatalogRecordElementInformation();
			this.subRecordsSinglet = new SetOfStandardOntologyCatalogElementHierarchy(OntologyObjectLabels.recordsSinglet);
			this.subComponentsSinglet = new SetOfStandardOntologyCatalogElementHierarchy(OntologyObjectLabels.hasPartSinglet);
			this.subRecordsMultiple = new SetOfStandardOntologyCatalogElementHierarchy(OntologyObjectLabels.recordsMultiple);
			this.subComponentsMultiple = new SetOfStandardOntologyCatalogElementHierarchy(OntologyObjectLabels.hasPartMultiple);
	}

	public StandardOntologyCatalogElementHierarchy(String catalogName, 
			BaseAnnotationObjects annotations,
			SetOfBaseCatalogRecordElementInformation rdfmappings) {
		super();
		this.catalogName = catalogName;
		this.annotations = annotations;
		this.rdfmappings = rdfmappings;
		this.subRecordsSinglet = new SetOfStandardOntologyCatalogElementHierarchy(OntologyObjectLabels.recordsSinglet);
		this.subComponentsSinglet = new SetOfStandardOntologyCatalogElementHierarchy(OntologyObjectLabels.hasPartSinglet);
		this.subRecordsMultiple = new SetOfStandardOntologyCatalogElementHierarchy(OntologyObjectLabels.recordsMultiple);
		this.subComponentsMultiple = new SetOfStandardOntologyCatalogElementHierarchy(OntologyObjectLabels.hasPartMultiple);
	}

	public StandardOntologyCatalogElementHierarchy(StandardOntologyCatalogElementHierarchy catalogElement) {
		super();
		this.catalogName = catalogElement.catalogName;
		this.annotations = catalogElement.getAnnotations();
		this.rdfmappings = catalogElement.getRdfmappings();
		this.subRecordsSinglet = catalogElement.getSubRecordsSinglet();
		this.subComponentsSinglet = catalogElement.getSubComponentsSinglet();
		this.subRecordsMultiple = catalogElement.getSubRecordsMultiple();
		this.subComponentsMultiple = catalogElement.getSubComponentsMultiple();
	}	


	
	public StandardOntologyCatalogElementHierarchy(String catalogName, BaseAnnotationObjects annotations,
			SetOfBaseCatalogRecordElementInformation rdfmappings, 
			SetOfStandardOntologyCatalogElementHierarchy subRecordsSinglet,
			SetOfStandardOntologyCatalogElementHierarchy subComponentsSinglet,
			SetOfStandardOntologyCatalogElementHierarchy subRecordsMultiple,
			SetOfStandardOntologyCatalogElementHierarchy subComponentsMultiple) {
		super();
		this.catalogName = catalogName;
		this.annotations = annotations;
		this.rdfmappings = rdfmappings;
		this.subRecordsSinglet = subRecordsSinglet;
		this.subComponentsSinglet = subComponentsSinglet;
		this.subRecordsMultiple = subRecordsMultiple;
		this.subComponentsMultiple = subComponentsMultiple;
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
	public SetOfBaseCatalogRecordElementInformation getRdfmappings() {
		return rdfmappings;
	}
	public void setRdfmappings(SetOfBaseCatalogRecordElementInformation rdfmappings) {
		this.rdfmappings = rdfmappings;
	}
	
	public SetOfStandardOntologyCatalogElementHierarchy getSubRecordsSinglet() {
		return subRecordsSinglet;
	}
	public void setSubRecordsSinglet(SetOfStandardOntologyCatalogElementHierarchy subRecordsSinglet) {
		this.subRecordsSinglet = subRecordsSinglet;
	}
	public SetOfStandardOntologyCatalogElementHierarchy getSubComponentsSinglet() {
		return subComponentsSinglet;
	}
	public void setSubComponentsSinglet(SetOfStandardOntologyCatalogElementHierarchy subComponentsSinglet) {
		this.subComponentsSinglet = subComponentsSinglet;
	}
	public SetOfStandardOntologyCatalogElementHierarchy getSubRecordsMultiple() {
		return subRecordsMultiple;
	}
	public void setSubRecordsMultiple(SetOfStandardOntologyCatalogElementHierarchy   subRecordsMultiple) {
		this.subRecordsMultiple = subRecordsMultiple;
	}
	public SetOfStandardOntologyCatalogElementHierarchy getSubComponentsMultiple() {
		return subComponentsMultiple;
	}
	public void setSubComponentsMultiple(SetOfStandardOntologyCatalogElementHierarchy subComponentsMultiple) {
		this.subComponentsMultiple = subComponentsMultiple;
	}
	public void addRecordSinglet(StandardOntologyCatalogElementHierarchy record) {
		subRecordsSinglet.add(record);
	}
	public void addComponentsSinglet(StandardOntologyCatalogElementHierarchy component) {
		subComponentsSinglet.add(component);
	}
	public void addRecordMultiple(StandardOntologyCatalogElementHierarchy record) {
		subRecordsMultiple.add(record);
	}
	public void addComponentsMultiple(StandardOntologyCatalogElementHierarchy component) {
		subComponentsMultiple.add(component);
	}

	@Override
	public JsonObject toJsonObject() {
		JsonObject obj = new JsonObject();
		obj.put(OntologyObjectLabels.catalogName, catalogName);
		JsonObject aJSON = annotations.toJsonObject();
		obj.put(OntologyObjectLabels.annotations, aJSON);
		JsonObject rdfJSON = rdfmappings.toJsonObject();
		obj.put(OntologyObjectLabels.mappingRDFs, rdfJSON);
		JsonObject recsJSON = subRecordsSinglet.toJsonObject();
		obj.put(OntologyObjectLabels.recordsSinglet, recsJSON);
		JsonObject recmJSON = subRecordsMultiple.toJsonObject();
		obj.put(OntologyObjectLabels.recordsMultiple, recmJSON);
		JsonObject haspartsJSON = subComponentsSinglet.toJsonObject();
		obj.put(OntologyObjectLabels.hasPartSinglet, haspartsJSON);
		JsonObject haspartmJSON = subComponentsMultiple.toJsonObject();
		obj.put(OntologyObjectLabels.hasPartMultiple, haspartmJSON);
		
		return obj;
	}

	@Override
	public void fillJsonObject(JsonObject obj) {
		catalogName = obj.get(OntologyObjectLabels.catalogName).getAsString();
		
		SetOfBaseCatalogRecordElementInformation ann = new SetOfBaseCatalogRecordElementInformation();
		ann.fillJsonObject(obj.get(OntologyObjectLabels.annotations).getAsJsonObject());
		
		SetOfBaseCatalogRecordElementInformation info = new SetOfBaseCatalogRecordElementInformation();
		info.fillJsonObject(obj.get(OntologyObjectLabels.mappingRDFs).getAsJsonObject());
		
		SetOfStandardOntologyCatalogElementHierarchy singrec = new SetOfStandardOntologyCatalogElementHierarchy();
		singrec.fillJsonObject(obj.get(OntologyObjectLabels.recordsSinglet).getAsJsonObject());
		
		SetOfStandardOntologyCatalogElementHierarchy singcomp = new SetOfStandardOntologyCatalogElementHierarchy();
		singcomp.fillJsonObject(obj.get(OntologyObjectLabels.hasPartSinglet).getAsJsonObject());
		
		SetOfStandardOntologyCatalogElementHierarchy multrec = new SetOfStandardOntologyCatalogElementHierarchy();
		multrec.fillJsonObject(obj.get(OntologyObjectLabels.recordsMultiple).getAsJsonObject());
		
		SetOfStandardOntologyCatalogElementHierarchy multcomp = new SetOfStandardOntologyCatalogElementHierarchy();
		multcomp.fillJsonObject(obj.getJsonObject(OntologyObjectLabels.hasPartMultiple));
		
	}
	
	
	
}
