package info.esblurock.reaction.core.ontology.base.hierarchy;

import java.util.UUID;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

/** Generate string label from the classname and the JsonObject
 * 
 * @author edwardblurock
 * 
 * given the classname and the object in JsonObject form, generate a label.
 * The label is determined by the subclass of dataset:SimpleCatalogName
 *
 */

public enum GenerateStringLabel {
	
	DerivedFromObjectClassName {

		@Override
		String deriveName(String hierclass,String classname, JsonObject object) {
			return classname;
		}
		
	}, DerivedFromHierarchyClassAnnotationAltLabel {

		@Override
		String deriveName(String hierclass,String classname, JsonObject object) {
			String name = DatasetOntologyParseBase.getAltLabelFromAnnotation(hierclass);
			return name;
		}
		
	}, DerivedFromCurrentClassAnnotationAltLabel {

		@Override
		String deriveName(String hierclass,String classname, JsonObject object) {
			String name = DatasetOntologyParseBase.getAltLabelFromAnnotation(classname);
			return name;
		}
		
	}, LabelDerivedFromRDFTriplet {

		@Override
		String deriveName(String hierclass,String classname, JsonObject object) {
			return null;
		}
		
	}, LabelDerivedFromCatalogObjectKey {

		@Override
		String deriveName(String hierclass,String classname, JsonObject object) {
			String name = JsonObjectUtilities.getValueUsingIdentifier(object, ClassLabelConstants.CatalogObjectKey);
			return name;
		}
		
	}, LabelDerivedFromCatalogOwner {

		@Override
		String deriveName(String hierclass,String classname, JsonObject object) {
			String name = JsonObjectUtilities.getValueUsingIdentifier(object, ClassLabelConstants.CatalogObjectOwner);
			return name;
		}
		
	}
	;
	
	/** Derive the label from classname and object in JsonObject form
	 * 
	 * @param classname The name of the class of the object
	 * @param object The object in JsonObject format
	 * @return The derived string label
	 * 
	 */
	abstract String deriveName(String hierclass, String classname, JsonObject object);

}
