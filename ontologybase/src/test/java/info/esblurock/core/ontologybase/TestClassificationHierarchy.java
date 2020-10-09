package info.esblurock.core.ontologybase;

import static org.junit.Assert.*;

import org.junit.Test;

import info.esblurock.core.DataBaseObjects.classifications.ClassificationHierarchy;
import info.esblurock.core.ontologybase.classification.DatabaseOntologyClassification;

public class TestClassificationHierarchy {

	@Test
	public void test() {
		ClassificationHierarchy hier1 = DatabaseOntologyClassification.getClassificationHierarchy("dataset:FileSourceTypes");
		System.out.println(hier1.toString(""));
	}

}
