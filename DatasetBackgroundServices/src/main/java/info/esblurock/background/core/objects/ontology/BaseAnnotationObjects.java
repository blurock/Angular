package info.esblurock.background.core.objects.ontology;

import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;
import info.esblurock.background.core.objects.constants.AnnotationObjectsLabels;

public class BaseAnnotationObjects extends BaseObjectJSONInterface {
	String label;
	String comment;
	String altlabel;
	String type;
	String identifier;
	
	
	public BaseAnnotationObjects() {
	}
	
	public BaseAnnotationObjects(String label, String comment, String altlabel, String type, String identifier) {
		super();
		fill(label,comment,altlabel,type,identifier);
	}
	
	public BaseAnnotationObjects(BaseAnnotationObjects base) {
		super();
		fill(base.label,base.comment,base.altlabel,base.type,base.identifier);
	}
	
	
	public void fill(String label, String comment, String altlabel, String type, String identifier) {
		this.label = label;
		this.comment = comment;
		this.altlabel = altlabel;
		this.type = type;
		this.identifier = identifier;		
	}

	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getAltlabel() {
		return altlabel;
	}
	public void setAltlabel(String altlabel) {
		this.altlabel = altlabel;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getIdentifier() {
		return identifier;
	}
	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}
	
	public JSONObject toJSONObject() {
		JSONObject object = new JSONObject();
		object.put(AnnotationObjectsLabels.label,label);
		object.put(AnnotationObjectsLabels.comment,comment);
		object.put(AnnotationObjectsLabels.altlabel,altlabel);
		object.put(AnnotationObjectsLabels.type,type);
		object.put(AnnotationObjectsLabels.identifier,identifier);
		return object;
	}
	
	public void fillJSONObject(JSONObject obj) {
		label = obj.getString(AnnotationObjectsLabels.label);
		comment = obj.getString(AnnotationObjectsLabels.comment);
		altlabel = obj.getString(AnnotationObjectsLabels.altlabel);
		type = obj.getString(AnnotationObjectsLabels.type);
		identifier = obj.getString(AnnotationObjectsLabels.identifier);
	}
}
