package info.esblurock.core.DataBaseObjects.ontology;

import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.classifications.ClassificationHierarchy;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;

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
	
	public JsonObject toJsonObject() {
		JsonObject object = super.toJsonObject();
		if(conceptObjects != null) {
			object.put(AnnotationObjectsLabels.conceptlabel,conceptObjects.toJsonObject());
		}
		if(purposeObjects != null) {
			object.put(AnnotationObjectsLabels.purposelabel,purposeObjects.toJsonObject());
		}
		return object;
	}
	
	public void fillJsonObject(JsonObject obj) {
		super.fillJsonObject(obj);
		purposeObjects = new ClassificationHierarchy();
		conceptObjects = new ClassificationHierarchy();
		JsonObject conceptjson = (JsonObject) obj.get(AnnotationObjectsLabels.conceptlabel);
		JsonObject purposejson = (JsonObject) obj.get(AnnotationObjectsLabels.purposelabel);
		purposeObjects.fillJsonObject(purposejson);
		conceptObjects.fillJsonObject(conceptjson);
	}
	

}
