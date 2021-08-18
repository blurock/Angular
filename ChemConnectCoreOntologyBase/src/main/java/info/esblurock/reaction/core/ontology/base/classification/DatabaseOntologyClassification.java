package info.esblurock.reaction.core.ontology.base.classification;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.dataset.annotations.BaseAnnotationObjects;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;


public class DatabaseOntologyClassification {
	static String classificationinfotree = "dataset:ClassificationInfoTree";
	static String classificationinfoelement = "dataset:ClassificationInfoElement";
	
	public static ClassificationHierarchy getClassificationHierarchy(String classification) {
		BaseAnnotationObjects annotations = DatasetOntologyParseBase.getAnnotationStructureFromIDObject(classification);
		ClassificationHierarchy top = new ClassificationHierarchy(classification, annotations);
		
		List<String> subclassifications = OntologyUtilityRoutines.listOfSubClasses(classification, true);
		for(String sub : subclassifications) {
			ClassificationHierarchy subclass = getClassificationHierarchy(sub);
			top.addClassificationHierarchy(subclass);
		}
		return top;
	}

	public static JsonObject classificationTreeFromDataType(String datatype) {
		String choices = DatasetOntologyParseBase.getAnnotationObject(datatype, AnnotationObjectsLabels.isDefinedBy);
		return classificationTreeFromChoices(choices);
	}
	public static JsonObject classificationTreeFromChoices(String choices) {
		ClassificationHierarchy hier = DatabaseOntologyClassification.getClassificationHierarchy(choices);
		return classificationTreeFromHierarchy(hier);
	}
	public static JsonObject classificationTreeFromHierarchy(ClassificationHierarchy hier) {
		JsonObject obj = new JsonObject();
		obj.addProperty(AnnotationObjectsLabels.identifier, hier.getAnnotations().getIdentifier());
		JsonArray lst = new JsonArray();
		JsonObject nodeobj = CreateDocumentTemplate.createTemplate(classificationinfoelement);
		nodeobj.addProperty(AnnotationObjectsLabels.label, hier.getAnnotations().getLabel());
		nodeobj.addProperty(AnnotationObjectsLabels.comment, hier.getAnnotations().getComment());
		nodeobj.addProperty(ClassLabelConstants.CatalogElementType, hier.getClassification());
		obj.add(ClassLabelConstants.ClassificationInfoElement, nodeobj);
		Set<ClassificationHierarchy> set = hier.getSubclassificatons();
		Iterator<ClassificationHierarchy> iter = set.iterator();
		while(iter.hasNext()) {
			JsonObject subnode = classificationTreeFromHierarchy(iter.next());
			lst.add(subnode);
		}
		obj.add(ClassLabelConstants.ClassificationInfoTree, lst);
		return obj;
	}
}
