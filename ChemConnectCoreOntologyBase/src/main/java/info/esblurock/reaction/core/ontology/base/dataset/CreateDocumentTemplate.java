package info.esblurock.reaction.core.ontology.base.dataset;

import java.util.Iterator;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;

public class CreateDocumentTemplate {
	

	public static JsonObject createTemplate(String classname) {
		return createTemplate(classname,false);
	}
	
	public static JsonObject createTemplate(String classname, boolean arrexample) {
		JsonObject obj = createSubTemplate(classname,arrexample);
		String identifier = DatasetOntologyParseBase.getIDFromAnnotation(classname);
		obj.addProperty(AnnotationObjectsLabels.identifier, identifier);
		return obj;
	}
	
	public static JsonObject createSubTemplate(String classname, boolean arrexample) {
		JsonObject obj = new JsonObject();
		CompoundObjectDimensionSet set1 = ParseCompoundObject.getCompoundElements(classname);
		Iterator<CompoundObjectDimensionInformation> iter = set1.iterator();
		while(iter.hasNext()) {
			CompoundObjectDimensionInformation info = iter.next();
			String dimidentifier = DatasetOntologyParseBase.getIDFromAnnotation(info.getClassname());
			if(info.isCompoundobject()) {
				if(info.isSinglet()) {
					JsonObject subelements = createSubTemplate(info.getClassname(),arrexample);
					obj.add(dimidentifier,subelements);
				} else {
					JsonArray arr = new JsonArray();
					obj.add(dimidentifier, arr);
					if(arrexample) {
						JsonObject arrobj = createSubTemplate(info.getClassname(),arrexample);
						arr.add(arrobj);
					}
				}
			} else {
				String singlevalue = "not assigned";
				if(info.isClassification()) {
					singlevalue = "Unassigned classification: " + info.getClassname();
				}
				if(info.isSinglet()) {
					obj.addProperty(dimidentifier, singlevalue);
				} else {
					JsonArray arr = new JsonArray();
					obj.add(dimidentifier, arr);
					if(arrexample) {
						arr.add(singlevalue);
					}
				}
			}
		}
		return obj;
	}

}
