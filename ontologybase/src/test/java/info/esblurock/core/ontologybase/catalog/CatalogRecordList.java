package info.esblurock.core.ontologybase.catalog;

import static org.junit.Assert.*;

import org.junit.Test;

import info.esblurock.core.DataBaseObjects.catalogandrecords.SetOfBaseCatalogRecordElementInformation;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElement;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.ontologybase.dataset.DatasetOntologyParseBase;
import info.esblurock.core.ontologybase.dataset.GenerateCatalogObject;

public class CatalogRecordList {

	@Test
	public void test() {
		
		//StandardOntologyCatalogElement catalog = GenerateCatalogObject.generateSingleCatalogObject("dataset:RepositoryFileStaging");
		//System.out.println(catalog.toString(""));
		
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement("dataset:RepositoryFileStaging");
		System.out.println(hierarchy.toString(""));
	}

}
