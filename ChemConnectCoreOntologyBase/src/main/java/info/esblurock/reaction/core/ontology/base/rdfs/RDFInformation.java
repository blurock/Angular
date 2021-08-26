package info.esblurock.reaction.core.ontology.base.rdfs;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseObjectJSONInterface;

public class RDFInformation extends BaseObjectJSONInterface {
	String classname;
	String subjectClass;
	String predicateClass;
	String objectClass;
	String rdftriple;
	JsonElement subjectValue;
	JsonElement objectValue;
	
	
	public RDFInformation(String classname, String subjectClass, String predicateClass, String objectClass) {
		super();
		this.classname = classname;
		this.subjectClass = subjectClass;
		this.predicateClass = predicateClass;
		this.objectClass = objectClass;
	}
	public RDFInformation(RDFInformation rdf) {
		this.classname = rdf.classname;
		this.subjectClass = rdf.subjectClass;
		this.predicateClass = rdf.predicateClass;
		this.objectClass = rdf.objectClass;
		this.subjectValue = rdf.subjectValue;
		this.objectValue = rdf.objectValue;
		
	}
	public RDFInformation(RDFInformation rdf, JsonElement subject, JsonElement object) {
		this.classname = rdf.classname;
		this.subjectClass = rdf.subjectClass;
		this.predicateClass = rdf.predicateClass;
		this.objectClass = rdf.objectClass;
		this.subjectValue = subject;
		this.objectValue = object;
		
	}
	
	public String getRdftriple() {
		return rdftriple;
	}
	public void setRdftriple(String rdftriple) {
		this.rdftriple = rdftriple;
	}
	public String getClassname() {
		return classname;
	}
	public void setClassname(String classname) {
		this.classname = classname;
	}
	public String getSubjectClass() {
		return subjectClass;
	}
	public void setSubjectClass(String subjectClass) {
		this.subjectClass = subjectClass;
	}
	public String getPredicateClass() {
		return predicateClass;
	}
	public void setPredicateClass(String predicateClass) {
		this.predicateClass = predicateClass;
	}
	public String getObjectClass() {
		return objectClass;
	}
	public void setObjectClass(String objectClass) {
		this.objectClass = objectClass;
	}
	public JsonElement getSubjectValue() {
		return subjectValue;
	}
	public void setSubjectValue(JsonObject subjectValue) {
		this.subjectValue = subjectValue;
	}
	public JsonElement getObjectValue() {
		return objectValue;
	}
	public void setObjectValue(JsonObject objectValue) {
		this.objectValue = objectValue;
	}
	
	@Override
	public JsonObject toJsonObject() {
		JsonObject json = new JsonObject();
		json.addProperty(ClassLabelConstants.CatalogObjectType, classname);
		json.addProperty(OntologyObjectLabels.rdfmappingclass, predicateClass);
		json.addProperty(OntologyObjectLabels.member, subjectClass);
		json.addProperty(OntologyObjectLabels.entity, objectClass);
		json.addProperty(OntologyObjectLabels.tripleclass, rdftriple);
		json.add(OntologyObjectLabels.membervalue, subjectValue);
		json.add(OntologyObjectLabels.entityvalue, objectValue);
		return json;
	}
	
	
}
