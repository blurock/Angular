package info.esblurock.core.DataBaseObjects.catalogandrecords;

import org.json.JSONObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.core.DataBaseObjects.constants.OntologyObjectLabels;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;


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
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put(OntologyObjectLabels.catalogName, catalogName);
		JSONObject aJSON = annotations.toJSONObject();
		obj.put(OntologyObjectLabels.annotations, aJSON);
		JSONObject rdfJSON = rdfmappings.toJSONObject();
		obj.put(OntologyObjectLabels.mappingRDFs, rdfJSON);
		JSONObject recsJSON = subRecordsSinglet.toJSONObject();
		obj.put(OntologyObjectLabels.recordsSinglet, recsJSON);
		JSONObject recmJSON = subRecordsMultiple.toJSONObject();
		obj.put(OntologyObjectLabels.recordsMultiple, recmJSON);
		JSONObject haspartsJSON = subComponentsSinglet.toJSONObject();
		obj.put(OntologyObjectLabels.hasPartSinglet, haspartsJSON);
		JSONObject haspartmJSON = subComponentsMultiple.toJSONObject();
		obj.put(OntologyObjectLabels.hasPartMultiple, haspartmJSON);
		
		return obj;
	}

	@Override
	public void fillJSONObject(JSONObject obj) {
		catalogName = obj.getString(OntologyObjectLabels.catalogName);
		
		SetOfBaseCatalogRecordElementInformation ann = new SetOfBaseCatalogRecordElementInformation();
		ann.fillJSONObject(obj.getJSONObject(OntologyObjectLabels.annotations));
		
		SetOfBaseCatalogRecordElementInformation info = new SetOfBaseCatalogRecordElementInformation();
		info.fillJSONObject(obj.getJSONObject(OntologyObjectLabels.mappingRDFs));
		
		SetOfStandardOntologyCatalogElementHierarchy singrec = new SetOfStandardOntologyCatalogElementHierarchy();
		singrec.fillJSONObject(obj.getJSONObject(OntologyObjectLabels.recordsSinglet));
		
		SetOfStandardOntologyCatalogElementHierarchy singcomp = new SetOfStandardOntologyCatalogElementHierarchy();
		singcomp.fillJSONObject(obj.getJSONObject(OntologyObjectLabels.hasPartSinglet));
		
		SetOfStandardOntologyCatalogElementHierarchy multrec = new SetOfStandardOntologyCatalogElementHierarchy();
		multrec.fillJSONObject(obj.getJSONObject(OntologyObjectLabels.recordsMultiple));
		
		SetOfStandardOntologyCatalogElementHierarchy multcomp = new SetOfStandardOntologyCatalogElementHierarchy();
		multcomp.fillJSONObject(obj.getJSONObject(OntologyObjectLabels.hasPartMultiple));
		
	}
	
	
	
}
