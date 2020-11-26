package info.esblurock.background.services.catalog;

import static org.junit.Assert.*;

import org.junit.Test;

import info.esblurock.background.core.objects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.background.core.objects.catalogobjects.AnnotationSet;
import info.esblurock.background.core.ontology.dataset.GenerateCatalogObject;

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
