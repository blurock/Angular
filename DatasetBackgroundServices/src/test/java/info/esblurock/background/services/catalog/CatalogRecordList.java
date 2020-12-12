package info.esblurock.background.services.catalog;

import static org.junit.Assert.*;

import org.junit.Test;

import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.catalogobjects.AnnotationSet;
import info.esblurock.core.DataBaseObjects.catalogobjects.BaseCatalogObject;
import info.esblurock.reaction.core.ontology.base.dataset.GenerateCatalogObject;


public class CatalogRecordList {

	@Test
	public void test() {
		
		//StandardOntologyCatalogElement catalog = GenerateCatalogObject.generateSingleCatalogObject("dataset:RepositoryFileStaging");
		//System.out.println(catalog.toString(""));
		
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement("dataset:RepositoryFileStaging");
		System.out.println("------------------------------------------");
		System.out.println("------------------Hierarchy---------------");
		System.out.println("------------------------------------------");
		System.out.println(hierarchy.toString(""));
		
		System.out.println("------------------------------------------");
		BaseCatalogObject bascat = new BaseCatalogObject();
		bascat.fillBaseInfo("1", "2020", "Public", "blurock", "dataset:RepositoryFileStaging");
		bascat.fill(hierarchy);
		
		System.out.println("---------------BaseCatalogObject----------");
		System.out.println("------------------------------------------");
		System.out.println(bascat.toString(""));
		System.out.println("------------------------------------------");
		AnnotationSet set = new AnnotationSet();
		set.fill(hierarchy);
		System.out.println("-------------AnnotationSet----------------");
		System.out.println("------------------------------------------");
		System.out.println(set.toString(""));
	}

}
