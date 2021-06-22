package info.esblurock.core.ontologybase.annotations;

import static org.junit.Assert.*;

import org.apache.jena.ontology.OntModel;
import org.junit.Test;

import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.core.ontologybase.OntologyBase;
import info.esblurock.core.ontologybase.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;

public class AnnotationTest {

	@Test
	public void test() {
    	OntModel model = OntologyBase.Util.getDatabaseOntology();
    	BaseAnnotationObjects labels = DatasetOntologyParseBase.getSubElementStructureFromIDObject("dataset:RepositoryFileStaging");
    	System.out.println(labels.toString(""));
	}

}
