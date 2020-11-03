package info.esblurock.background.services.catalog;

import static org.junit.Assert.*;

import org.junit.Test;

import info.esblurock.background.core.objects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.background.core.objects.catalogobjects.AnnotationSet;
import info.esblurock.background.core.objects.catalogobjects.BaseCatalogObject;
import info.esblurock.background.core.ontology.dataset.GenerateCatalogObject;


public class CatalogRecordList {

	@Test
	public void test() {
		
		//StandardOntologyCatalogElement catalog = GenerateCatalogObject.generateSingleCatalogObject("dataset:RepositoryFileStaging");
		//System.out.println(catalog.toString(""));
		
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement("dataset:RepositoryFileStaging");
		System.out.println(hierarchy.toString(""));
		
		BaseCatalogObject bascat = new BaseCatalogObject();
		bascat.fillBaseInfo("1", "2020", "Public", "blurock", "dataset:RepositoryFileStaging");
		bascat.fill(hierarchy);
		
		System.out.println(bascat.toString(""));
		
		AnnotationSet set = new AnnotationSet();
		set.fill(hierarchy);
		System.out.println(set.toString(""));
	}

}
