package info.esblurock.background.services.jthermodynamics.symmetry;

import org.dom4j.Element;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.parameters.ParameterUtilities;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import thermo.data.benson.BensonThermodynamicBase;
import thermo.data.benson.SetOfBensonThermodynamicBase;
import thermo.data.structure.structure.symmetry.CalculateExternalSymmetryCorrection;
import thermo.data.structure.structure.symmetry.CalculateInternalSymmetryCorrection;
import thermo.data.structure.structure.symmetry.SetOfSymmetryDefinitions;
import thermo.data.structure.structure.symmetry.SymmetryDefinition;
import thermo.exception.ThermodynamicException;

public class DatabaseCalculateInternalSymmetryCorrection extends CalculateInternalSymmetryCorrection {
	JsonArray symmetryarr;
	
	public DatabaseCalculateInternalSymmetryCorrection(String maintainer, String dataset,
			CalculateExternalSymmetryCorrection external) {
		super();
		symmetryarr = ExtractSetOfSymmetryDefinitionsFromDataset.databaseSymmetryDefinitions(maintainer, dataset, 
				"dataset:StructureInternalSymmetry");
		SetOfSymmetryDefinitions setOfDefinitions = ExtractSetOfSymmetryDefinitionsFromDataset.extract(symmetryarr);
		this.setStructureInternalSymmetry(setOfDefinitions);
		this.setCalculateExternalSymmetryCorrection(external);
		this.initialize();
	}
	
	/**
	 * @param molecule The molecule to analyse
	 * @param body The body of the output response
	 * @param info Used for unit specifications
	 * @return The ThermodynamicContributions due to internal energy
	 * 
	 * 
	 */
	public JsonArray compute(IAtomContainer molecule, Element body, JsonObject info) {
		SetOfBensonThermodynamicBase corrections = new SetOfBensonThermodynamicBase();
		boolean symmetryfactor;
		JsonArray contributions = new JsonArray();
		try {
			symmetryfactor = calculate(molecule, corrections);
			if(symmetryfactor) {
				SymmetryDefinition symdef = getSymmetryDefinition();
				String symname = symdef.getElementName();
				double entropy = calculateCorrection(getInternalSymmetryValue());
				JsonObject contribution = ParameterUtilities.parameterWithEntropy(entropy,symname,info);
				
				body.addElement("div").addText("Internal Symmetry Found   : " + symname);
				body.addElement("div").addText("Internal Symmetry         : " + symdef.getInternalSymmetryFactor());
				body.addElement("div").addText("Entropy Contribution      : " + entropy);
				
				JsonObject symdefjson = ComputeThermodynamicsSymmetryContribution.findSymmetryObjectInSet(symmetryarr,symname);
				contribution.add(ClassLabelConstants.ChemConnectThermodynamicsDatabase,symdefjson);
				contributions.add(contribution);
			}
		} catch (ThermodynamicException e) {
			e.printStackTrace();
		}
		return contributions;
	}
	

}
