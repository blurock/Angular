package info.esblurock.background.services.catalog;

import org.junit.Test;

import info.esblurock.reaction.core.ontology.base.classification.ClassificationHierarchy;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.dataset.annotations.BaseAnnotationObjects;

public class ObjectPurposeAnnotationTest {

	@Test
	public void test() {
		
		System.out.println("ObjectPurposeAnnotationTest");
		String purposelabel1 = "dataset:PurposeFileRepository";
		String purpose1 = DatasetOntologyParseBase.getPurposeFromAnnotation(purposelabel1);
		System.out.println(purposelabel1 + ": " + purpose1);
		
		ClassificationHierarchy hierarchy1 = DatabaseOntologyClassification.getClassificationHierarchy(purpose1);
		System.out.println(hierarchy1.toString());
		
		System.out.println("--------------------------------------------------------------");
		String conceptlabel1 = "dataset:ConceptRepositoryFile";
		String concept1 = DatasetOntologyParseBase.getConceptFromAnnotation(conceptlabel1);
		System.out.println(conceptlabel1 + ": '" + concept1 + "'");
		
		ClassificationHierarchy hierarchyC1 = DatabaseOntologyClassification.getClassificationHierarchy(concept1);
		System.out.println(hierarchyC1.toString());
		
		String empty1 = DatasetOntologyParseBase.getConceptFromAnnotation(purposelabel1);
		System.out.println("Should be empty: '" + empty1 + "'");
		System.out.println("--------------------------------------------------------------");
		
		BaseAnnotationObjects purposeanno = DatasetOntologyParseBase.getSubElementStructureFromIDObject(purposelabel1);
		System.out.println(purposeanno);
		
	}

}
