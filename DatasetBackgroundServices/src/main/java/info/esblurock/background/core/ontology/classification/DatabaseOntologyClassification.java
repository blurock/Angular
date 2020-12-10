package info.esblurock.background.core.ontology.classification;

import java.util.List;

import info.esblurock.background.core.ontology.dataset.DatasetOntologyParseBase;
import info.esblurock.background.core.ontology.utilities.OntologyUtilityRoutines;
import info.esblurock.core.DataBaseObjects.classifications.ClassificationHierarchy;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;


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
