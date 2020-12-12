package info.esblurock.reaction.core.ontology.base.classification;

import java.util.List;

import info.esblurock.core.DataBaseObjects.classifications.ClassificationHierarchy;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;


public class DatabaseOntologyClassification {
	
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

}
