package info.esblurock.reaction.core.ontology.base.hierarchy;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

/** Generate string label from the classname and the JsonObject
 * 
 * @author edwardblurock
 *
 */
public enum GenerateStringLabel {
	
	DerivedFromObjectClassName {

		@Override
		String deriveName(String classname, JsonObject object) {
			return classname;
		}
		
	}, LabelDerivedFromDatabasePerson {

		@Override
		String deriveName(String classname, JsonObject object) {
			String name = JsonObjectUtilities.getValueUsingIdentifier(object, ClassLabelConstants.DescriptionTitlePerson);
			return name;
		}
		
	}, DerivedFromCurrentClassAnnotationAltLabel {

		@Override
		String deriveName(String classname, JsonObject object) {
			String name = DatasetOntologyParseBase.getAltLabelFromAnnotation(classname);
			return name;
		}
		
	}
	;
	
	/** 
	 * 
	 * @param classname The name of the class of the object
	 * @param object The object in JsonObject format
	 * @return The derived string label
	 * 
	 */
	abstract String deriveName(String classname, JsonObject object);

}
