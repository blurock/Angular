package info.esblurock.background.services.jthermodynamics.symmetry;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.parameters.ParameterUtilities;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.units.DatabaseUnitUtilities;
import thermo.data.benson.BensonThermodynamicBase;
import thermo.data.benson.SetOfBensonThermodynamicBase;
import thermo.data.structure.structure.symmetry.CalculateExternalSymmetryCorrection;
import thermo.data.structure.structure.symmetry.CalculateInternalSymmetryCorrection;
import thermo.data.structure.structure.symmetry.DetermineExternalSymmetryFromSingleDefinition;
import thermo.data.structure.structure.symmetry.SymmetryDefinition;
import thermo.exception.ThermodynamicException;
import thermo.properties.SProperties;

public class ComputeThermodynamicsSymmetryContribution {
	
	/**
	 * @param maintainer The maintainer of the dataset (used to find the external symmetry elements)
	 * @param dataset The dataset (used to find the external symmetry elements)
	 * @param molecule The molecule to analyze
	 * @param info information from input (used for units of entropy)
	 * @return The response with an array of ThermodynamicContributions
	 */
	public static JsonObject computeExternalSymmetry(String maintainer, String dataset, IAtomContainer molecule, JsonObject info) {
		Document document = MessageConstructor.startDocument("ComputeBensonRulesForMolecule");
		Element body = MessageConstructor.isolateBody(document);
		body.addElement("div").addText("Maintainer    : " + maintainer);
		body.addElement("div").addText("dataset       : " + dataset);
		body.addElement("div").addText("Symmetry type : " + "dataset:StructureExternalSymmetry");
		JsonObject response = null;
		
		DatabaseCalculateExternalSymmetryCorrection determineTotal = new DatabaseCalculateExternalSymmetryCorrection(maintainer,dataset);
		JsonArray contributions = determineTotal.compute(molecule, body, info);
		response = DatabaseServicesBase.standardServiceResponse(document, "Found External Symmetry Element", contributions);
		return response;
	}
	
	/**
	 * @param maintainer The maintainer of the dataset (used to find the external symmetry elements)
	 * @param dataset The dataset (used to find the external symmetry elements)
	 * @param molecule The molecule to analyze
	 * @param info information from input (used for units of entropy)
	 * @return response with Thermo Contribution
	 */
	public static JsonObject computeFromSymmetryObject(String maintainer, String dataset, 
			IAtomContainer molecule, JsonObject info) {
		JsonObject response = null;
		Document document = MessageConstructor.startDocument("ComputeBensonRulesForMolecule");
		Element body = MessageConstructor.isolateBody(document);
		body.addElement("div").addText("Maintainer      : " + maintainer);
		body.addElement("div").addText("dataset         : " + dataset);
		body.addElement("div").addText("Symmetry type   : " + "dataset:StructureExternalSymmetry");
		String symmname = info.get(ClassLabelConstants.JThermodynamicSymmetryDefinitionLabel).getAsString();
		String symmetrytype = "dataset:StructureExternalSymmetry";
		body.addElement("div").addText("Symmetry Element : " + symmname);
		DetermineExternalSymmetryFromSingleDefinition single = new DetermineExternalSymmetryFromSingleDefinition();
		JsonObject symjson = ExtractSetOfSymmetryDefinitionsFromDataset.databaseSingleSymmetryDefinition(maintainer, dataset,symmetrytype,symmname);
		SymmetryDefinition symmetry = ExtractSetOfSymmetryDefinitionsFromDataset.convertToSymmetryDefinition(symjson);
       int result;
	try {
		result = single.determineSymmetry(symmetry, molecule);
        double symmD = (double) result;
        String gasconstantS = SProperties.getProperty("thermo.data.gasconstant.clasmolsk");
        double gasConstant = Double.valueOf(gasconstantS).doubleValue();
        double correction = -gasConstant * Math.log(symmD);
		body.addElement("div").addText("Symmetry      : " + symmD);
		body.addElement("div").addText("Entropy       : " + correction);
        JsonObject contribution = parameterWithEntropy(correction,symmetry.getElementName(),info);
        contribution.add(ClassLabelConstants.ChemConnectThermodynamicsDatabase, symjson);
        String message = "External Symmetry contribution of " + symmetry.getElementName() + " = " + correction;
        response = DatabaseServicesBase.standardServiceResponse(document, message, contribution);
	} catch (CDKException e) {
		response = DatabaseServicesBase.standardErrorResponse(document, "Error External Symmetry", null);
	}
		return response;
	}
	
	/**
	 * @param maintainer The maintainer of the dataset (used to find the external symmetry elements)
	 * @param dataset The dataset (used to find the external symmetry elements)
	 * @param molecule The molecule to analyze
	 * @param info information from input (used for units of entropy)
	 * @return The response with an array of ThermodynamicContributions
	 */
	public static JsonObject computeInternalSymmetry(String maintainer, String dataset, IAtomContainer molecule, JsonObject info) {
		JsonObject response = null;
		Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromInternalSymmetry");
		Element body = MessageConstructor.isolateBody(document);
		body.addElement("div").addText("Maintainer      : " + maintainer);
		body.addElement("div").addText("dataset         : " + dataset);
		body.addElement("div").addText("Symmetry type   : " + "dataset:StructureInternalSymmetry");
			DatabaseCalculateExternalSymmetryCorrection external = new DatabaseCalculateExternalSymmetryCorrection(maintainer,dataset);
			DatabaseCalculateInternalSymmetryCorrection internal = new DatabaseCalculateInternalSymmetryCorrection(maintainer,dataset,external);
			
			JsonArray contributions = internal.compute(molecule, body, info);
				response = DatabaseServicesBase.standardServiceResponse(document, "Found External Symmetry Element", contributions);
			
		return response;
	}

	/**
	 * @param maintainer The maintainer of the dataset (used to find the optical symmetry elements)
	 * @param dataset The dataset (used to find the optical symmetry elements)
	 * @param molecule The molecule to analyze
	 * @param info information from input (used for units of entropy)
	 * @return The response with an array of ThermodynamicContributions
	 */
	public static JsonObject computeOpticalSymmetry(String maintainer, String dataset, IAtomContainer molecule, JsonObject info) {
		JsonObject response = null;
		Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromOpticalSymmetry");
		Element body = MessageConstructor.isolateBody(document);
		body.addElement("div").addText("Maintainer      : " + maintainer);
		body.addElement("div").addText("dataset         : " + dataset);
		body.addElement("div").addText("Symmetry type   : " + "dataset:StructureOpticalSymmetry");
		JsonArray contributions = new JsonArray();
		DatabaseCalculateOpticalSymmetryCorrection optical = new DatabaseCalculateOpticalSymmetryCorrection(maintainer,dataset);
		contributions = optical.compute(molecule, body, info);
		response = DatabaseServicesBase.standardServiceResponse(document, "Found Optical Isomer Element", contributions);
			
		return response;
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
	
	/** Find JThermodynamicsSymmetryStructureDefinition by name
	 * 
	 * @param arr The array of JThermodynamicsSymmetryStructureDefinition
	 * @param symname The element name to look for
	 * @return The JThermodynamicsSymmetryStructureDefinition element
	 */
	public static JsonObject findSymmetryObjectInSet(JsonArray arr, String symname) {
		boolean notdone = true;
		JsonObject symmetry = null;
		for(int i=0;i<arr.size() && notdone ;i++) {
			symmetry = arr.get(i).getAsJsonObject();
			JsonObject symdef = symmetry.get(ClassLabelConstants.JThermodynamicsSymmetryDefinition).getAsJsonObject();
			String name = symdef.get(ClassLabelConstants.JThermodynamicSymmetryDefinitionLabel).getAsString();
			System.out.println("'" + name + "'  :  '" + symname);
			if(name.equals(symname)) {
				notdone = false;
			}
		}
		if(notdone) {
			symmetry = null;
		}
		return symmetry;
	}
}
