package info.esblurock.core.DataBaseObjects.classifications;

import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.core.DataBaseObjects.constants.OntologyObjectLabels;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;

public class ClassificationTree extends BaseObjectJSONInterface {
	Set<ClassificationTree> subtrees;
	BaseAnnotationObjects annotations;
	
	
	
	public BaseAnnotationObjects getAnnotations() {
		return annotations;
	}

	public void setAnnotations(BaseAnnotationObjects annotations) {
		this.annotations = annotations;
	}

	public void addToSubTree(ClassificationTree subelement) {
		subtrees.add(subelement);
	}

	@Override
	public JSONObject toJSONObject() {
		JSONObject json = new JSONObject();
		JSONObject annjson = annotations.toJSONObject();
		json.put(OntologyObjectLabels.classification, annjson);
		JSONArray array = new JSONArray();
		for(ClassificationTree element : subtrees) {
			JSONObject elementjson = element.toJSONObject();
			array.put(elementjson);
		}
		json.put(OntologyObjectLabels.subclassifications, array);
		return json;
	}

	@Override
	public void fillJSONObject(JSONObject obj) {
		JSONObject annotationsjson = (JSONObject) obj.get(OntologyObjectLabels.classification);
		annotations.fillJSONObject(annotationsjson);
		JSONArray array = obj.getJSONArray(OntologyObjectLabels.subclassifications);
		for(int i=0; i < array.length(); i++) {
			JSONObject json = (JSONObject) array.get(i);
			ClassificationTree ann = new ClassificationTree();
			ann.fillJSONObject(json);
			subtrees.add(ann);
		}
	}
}
