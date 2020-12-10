package info.esblurock.core.DataBaseObjects.catalogobjects;

import java.util.HashSet;

import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;

public class ExtendedAnnotationSet extends AnnotationSet {
	public ExtendedAnnotationSet() {
		this.annotations = new HashSet<BaseAnnotationObjects>();
	}

	public BaseAnnotationObjects getAnnotations(StandardOntologyCatalogElementHierarchy hierarchy) {
		BaseAnnotationObjects ann = super.getAnnotations(hierarchy);
		
		return ann;
	}

}
