package info.esblurock.background.services.catalog;

import static org.junit.Assert.*;

import org.junit.Test;

import info.esblurock.background.core.ontology.dataset.GenerateCatalogObject;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.catalogobjects.AnnotationSet;

public class AnnotationTest {

	@Test
	public void test() {
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement("dataset:RepositoryDataFile");
		System.out.println(hierarchy);
		AnnotationSet set = new AnnotationSet();
		set.fill(hierarchy);
		System.out.println("-------------AnnotationSet----------------");
		System.out.println("------------------------------------------");
		System.out.println(set.toString(""));
		
	}

}
