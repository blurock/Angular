package info.esblurock.core.ontologybase.catalog;

import static org.junit.Assert.*;

import org.junit.Test;

import info.esblurock.core.DataBaseObjects.catalogandrecords.SetOfBaseCatalogRecordElementInformation;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElement;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.catalogobjects.AnnotationSet;
import info.esblurock.core.DataBaseObjects.catalogobjects.BaseCatalogObject;
import info.esblurock.core.ontologybase.dataset.DatasetOntologyParseBase;
import info.esblurock.core.ontologybase.dataset.GenerateCatalogObject;

public class CatalogRecordList {

	@Test
	public void test() {
		
		//StandardOntologyCatalogElement catalog = GenerateCatalogObject.generateSingleCatalogObject("dataset:RepositoryFileStaging");
		//System.out.println(catalog.toString(""));
		
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement("dataset:RepositoryDataFile");
		System.out.println(hierarchy.toString(""));
		
		BaseCatalogObject bascat = new BaseCatalogObject();
		bascat.fillBaseInfo("1", "2020", "Public", "blurock", "dataset:RepositoryDataFile");
		bascat.fill(hierarchy);
		
		System.out.println(bascat.toString(""));
		
		AnnotationSet set = new AnnotationSet();
		set.fill(hierarchy);
		System.out.println(set.toString(""));
	}

}
