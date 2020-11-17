package info.esblurock.background.core.objects.ontology;

import org.json.JSONObject;

import info.esblurock.background.core.objects.classifications.ClassificationHierarchy;
import info.esblurock.background.core.objects.constants.AnnotationObjectsLabels;

public class ExtendedAnnotationObjects extends BaseAnnotationObjects {
	
	ClassificationHierarchy conceptObjects;
	ClassificationHierarchy purposeObjects;
	
	public ExtendedAnnotationObjects() {
		super();
	}
	
	public ExtendedAnnotationObjects(BaseAnnotationObjects base) {
		super(base);
	}

	public ClassificationHierarchy getConceptObjects() {
		return conceptObjects;
	}

	public void setConceptObjects(ClassificationHierarchy conceptObjects) {
		this.conceptObjects = conceptObjects;
	}

	public ClassificationHierarchy getPurposeObjects() {
		return purposeObjects;
	}

	public void setPurposeObjects(ClassificationHierarchy purposeObjects) {
		this.purposeObjects = purposeObjects;
	}
	
	public JSONObject toJSONObject() {
		JSONObject object = super.toJSONObject();
		if(conceptObjects != null) {
			object.put(AnnotationObjectsLabels.conceptlabel,conceptObjects.toJSONObject());
		}
		if(purposeObjects != null) {
			object.put(AnnotationObjectsLabels.purposelabel,purposeObjects.toJSONObject());
		}
		return object;
	}
	
	public void fillJSONObject(JSONObject obj) {
		super.fillJSONObject(obj);
		purposeObjects = new ClassificationHierarchy();
		conceptObjects = new ClassificationHierarchy();
		JSONObject conceptjson = (JSONObject) obj.get(AnnotationObjectsLabels.conceptlabel);
		JSONObject purposejson = (JSONObject) obj.get(AnnotationObjectsLabels.purposelabel);
		purposeObjects.fillJSONObject(purposejson);
		conceptObjects.fillJSONObject(conceptjson);
	}
	

}
