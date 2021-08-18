package info.esblurock.reaction.core.ontology.base.classification;

import java.util.Iterator;
import java.util.Set;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;

public class GenerateSimpleClassification {
	
	/**
	 * @param datatype This is the classification data type
	 * @return JsonArray with {type, label and comment} from Annotations
	 * 
	 * This uses the rdfs:isDefinedBy annotation to find the choices.
	 * 
	 * This routine assumes a flat set of classifications (returning just a list).
	 */
	public static JsonObject generateSimpleListFromDataType(String datatype) {
		String choices = DatasetOntologyParseBase.getAnnotationObject(datatype, AnnotationObjectsLabels.isDefinedBy);
		return generateSimpleListFromChoices(choices);
	}
	
	/**
	 * @param classname The class name of the classification
	 * @return JsonArray with {type, label and comment} from Annotations
	 * 
	 * This routine assumes a flat set of classifications (returning just a list).
	 * 
	 */
	public static JsonObject generateSimpleListFromChoices(String classname) {
		String classificationinfo = "dataset:ClassificationInfo";
		JsonObject obj = CreateDocumentTemplate.createTemplate(classificationinfo);
		JsonArray lst = new JsonArray();
		ClassificationHierarchy hier = DatabaseOntologyClassification.getClassificationHierarchy(classname);
		Set<ClassificationHierarchy> set = hier.getSubclassificatons();
		Iterator<ClassificationHierarchy> iter = set.iterator();
		while(iter.hasNext()) {
			ClassificationHierarchy classification = iter.next();
			JsonObject clsobj = new JsonObject();
			clsobj.addProperty(AnnotationObjectsLabels.label, classification.getAnnotations().getLabel());
			clsobj.addProperty(AnnotationObjectsLabels.comment, classification.getAnnotations().getComment());
			clsobj.addProperty(AnnotationObjectsLabels.type, classification.getClassification());
			lst.add(clsobj);
		}
		obj.add(ClassLabelConstants.ClassificationInfoElement, lst);
		return obj;
	}
	
}
