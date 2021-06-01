package info.esblurock.core.DataBaseObjects.classifications;

import java.util.HashSet;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.core.DataBaseObjects.constants.OntologyObjectLabels;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;


public class ClassificationHierarchy extends BaseObjectJSONInterface {
	String classification;
	BaseAnnotationObjects annotations;
	Set<ClassificationHierarchy> subclassificatons;
	
	public ClassificationHierarchy() {
		this.classification = "";
		this.subclassificatons = new HashSet<ClassificationHierarchy>();
	}
	public ClassificationHierarchy(String classification, BaseAnnotationObjects annotations) {
		super();
		this.classification = classification;
		this.subclassificatons = new HashSet<ClassificationHierarchy>();
		this.annotations = annotations;
	}
	public ClassificationHierarchy(String classification, BaseAnnotationObjects annotations, Set<ClassificationHierarchy> subclassificatons) {
		super();
		this.classification = classification;
		this.annotations = annotations;
		this.subclassificatons = subclassificatons;
	}
	public String getClassification() {
		return classification;
	}
	public void setClassification(String classification) {
		this.classification = classification;
	}
	public void addClassificationHierarchy(ClassificationHierarchy hierarchy) {
		subclassificatons.add(hierarchy);
	}
	public BaseAnnotationObjects getAnnotations() {
		return annotations;
	}
	public void setAnnotations(BaseAnnotationObjects annotations) {
		this.annotations = annotations;
	}
	public Set<ClassificationHierarchy> getSubclassificatons() {
		return subclassificatons;
	}
	public void setSubclassificatons(Set<ClassificationHierarchy> subclassificatons) {
		this.subclassificatons = subclassificatons;
	}
	public String toString() {
		JSONObject json = this.toJSONObject();
		return json.toString();
	}
	@Override
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		JSONObject annjson = annotations.toJSONObject();
		obj.put(OntologyObjectLabels.classification, classification);
		obj.put(OntologyObjectLabels.annotations, annjson);		
		JSONArray arr = new JSONArray();
		obj.put(OntologyObjectLabels.subclassifications, arr);
		for(ClassificationHierarchy hierarchy : subclassificatons) {
			JSONObject hierjson = hierarchy.toJSONObject();
			arr.put(hierjson);
		}
		return obj;
	}
	
	public void fillJSONObject(JSONObject obj) {
		classification = obj.getString(OntologyObjectLabels.classification);
		fillJSONObject(obj.getJSONObject(OntologyObjectLabels.annotations));
		JSONArray arr = obj.getJSONArray(OntologyObjectLabels.subclassifications);
		for(int i = 0 ; i < arr.length() ; i++) {
			JSONObject element = (JSONObject) arr.get(i);
			ClassificationHierarchy hierarchy = new ClassificationHierarchy();
			hierarchy.fillJSONObject(element);
			subclassificatons.add(hierarchy);
		}
	}
}
