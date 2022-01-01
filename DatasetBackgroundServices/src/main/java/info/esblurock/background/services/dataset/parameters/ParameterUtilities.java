package info.esblurock.background.services.dataset.parameters;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;
import info.esblurock.reaction.core.ontology.base.dataset.units.DatabaseUnitUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class ParameterUtilities {
	
	
	/** Modify parameter value and uncertainty to new units
	 * 
	 * @param parameter The ParameterValue object
	 * @param info The object holding the final specification
	 * @param infospecidentifier
	 */
	public static void changeParameterToNewSpecification(JsonObject parameter,
			JsonObject info, String infospecidentifier) {
		JsonObject origspec = parameter.get(ClassLabelConstants.ParameterSpecification).getAsJsonObject();
		JsonObject finalspec = info.get(infospecidentifier).getAsJsonObject();
		changeParameterToNewSpecification(parameter, origspec, finalspec);
	}
	/** Convert parameter value and uncertainty to new units
	 * 
	 * @param parameter The ParameterValue object
	 * @param origspec The ParameterSpecification of the original value
	 * @param finalspec The ParameterSpecification of the final value
	 */
	public static void changeParameterToNewSpecification(JsonObject parameter, JsonObject origspec, JsonObject finalspec) {
		String value = parameter.get(ClassLabelConstants.ValueAsString).getAsString();
		Double valueD = Double.valueOf(value);
		String error = parameter.get(ClassLabelConstants.ValueUncertainty).getAsString();
		Double errorD = Double.valueOf(error);
		JsonObject origunit = origspec.get(ClassLabelConstants.ValueUnits).getAsJsonObject();
		String origunits = origunit.get(OntologyObjectLabels.quantitykind).getAsString();
		JsonObject finalunit = finalspec.get(ClassLabelConstants.ValueUnits).getAsJsonObject();
		String finalunits = finalunit.get(OntologyObjectLabels.quantitykind).getAsString();
		Double newvalue = DatabaseUnitUtilities.conversion(valueD, origunits, finalunits);
		if(newvalue != null) {
			value = newvalue.toString();
		}
		parameter.addProperty(ClassLabelConstants.ValueAsString, value);
		Double newerror = DatabaseUnitUtilities.conversion(errorD, origunits, finalunits);
		if(newerror != null) {
			error = newerror.toString();
		}
		parameter.addProperty(ClassLabelConstants.ValueUncertainty, error);
	}

}
