package info.esblurock.background.core.objects.catalogobjects;

import java.util.HashSet;

import info.esblurock.background.core.objects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.background.core.objects.ontology.BaseAnnotationObjects;

public class ExtendedAnnotationSet extends AnnotationSet {
	public ExtendedAnnotationSet() {
		this.annotations = new HashSet<BaseAnnotationObjects>();
	}

	public BaseAnnotationObjects getAnnotations(StandardOntologyCatalogElementHierarchy hierarchy) {
		BaseAnnotationObjects ann = super.getAnnotations(hierarchy);
		
		return ann;
	}

}
