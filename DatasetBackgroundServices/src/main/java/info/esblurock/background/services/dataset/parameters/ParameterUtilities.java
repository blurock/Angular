package info.esblurock.background.services.dataset.parameters;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
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
	/** Thermo Contribution with just entropy filled in.
	 * 
	 * @param entropy The entropy value
	 * @param name The name of the contribution
	 * @param info The input with the units of entropy
	 * @return The ThermodynamicContributions with the entropy value (the enthalpy and Cps are zero)
	 */
	public static JsonObject parameterWithEntropy(double entropy, String name, JsonObject info) {
		String defaultentropyUnits = "unit:J-PER-MOL-K";

		JsonObject entropyP = DatabaseUnitUtilities.createEmptyParameter("dataset:ThermodynamicStandardEntropy", 
				defaultentropyUnits, "dataset:ImpliedDigitsUncertainty");
		entropyP.addProperty(ClassLabelConstants.ValueAsString,Double.toHexString(entropy));
		entropyP.addProperty(ClassLabelConstants.ValueUncertainty,"0.0");
		ParameterUtilities.changeParameterToNewSpecification(entropyP, info, ClassLabelConstants.ParameterSpecificationEntropy);

		JsonObject enthalpyP = DatabaseUnitUtilities.createEmptyParameter("dataset:ThermodynamicStandardEnthalpy", 
				"unit:KiloCAL-PER-MOL", "dataset:ImpliedDigitsUncertainty");
		enthalpyP.addProperty(ClassLabelConstants.ValueAsString,"0.0");
		enthalpyP.addProperty(ClassLabelConstants.ValueUncertainty,"0.0");

		JsonObject contribution = CreateDocumentTemplate.createTemplate("dataset:ThermodynamicContributions");

		contribution.add(ClassLabelConstants.ThermodynamicStandardEnthalpy, enthalpyP);
		contribution.add(ClassLabelConstants.ThermodynamicStandardEntropy, entropyP);
		contribution.addProperty(ClassLabelConstants.DescriptionTitle, name);
		JsonArray arr = new JsonArray();
		contribution.add(ClassLabelConstants.HeatCapacityTemperatureValuePair, arr);
		
		return contribution;
	}
	/** Thermo Contribution with just entropy filled in.
	 * 
	 * @param entropy The entropy value
	 * @param name The name of the contribution
	 * @param info The input with the units of entropy
	 * @return The ThermodynamicContributions with the entropy value (the enthalpy and Cps are zero)
	 */
	public static JsonObject parameterWithEnthalpy(double enthalpy, String name, JsonObject info) {
		String defaultentropyUnits = "unit:J-PER-MOL-K";

		JsonObject entropyP = DatabaseUnitUtilities.createEmptyParameter("dataset:ThermodynamicStandardEntropy", 
				defaultentropyUnits, "dataset:ImpliedDigitsUncertainty");
		entropyP.addProperty(ClassLabelConstants.ValueAsString,Double.toString(0.0));
		entropyP.addProperty(ClassLabelConstants.ValueUncertainty,"0.0");

		JsonObject enthalpyP = DatabaseUnitUtilities.createEmptyParameter("dataset:ThermodynamicStandardEnthalpy", 
				"unit:KiloCAL-PER-MOL", "dataset:ImpliedDigitsUncertainty");
		enthalpyP.addProperty(ClassLabelConstants.ValueAsString,Double.toString(enthalpy));
		enthalpyP.addProperty(ClassLabelConstants.ValueUncertainty,"0.0");
		ParameterUtilities.changeParameterToNewSpecification(enthalpyP, info, ClassLabelConstants.ParameterSpecificationEnthaply);

		JsonObject contribution = CreateDocumentTemplate.createTemplate("dataset:ThermodynamicContributions");

		contribution.add(ClassLabelConstants.ThermodynamicStandardEnthalpy, enthalpyP);
		contribution.add(ClassLabelConstants.ThermodynamicStandardEntropy, entropyP);
		contribution.addProperty(ClassLabelConstants.DescriptionTitle, name);
		JsonObject cpparam = info.get(ClassLabelConstants.ParameterSpecificationHeatCapacity).getAsJsonObject();
		contribution.add(ClassLabelConstants.ParameterSpecificationHeatCapacity, cpparam);
		JsonArray arr = new JsonArray();
		contribution.add(ClassLabelConstants.HeatCapacityTemperatureValuePair, arr);
		
		return contribution;
	}

}
