package info.esblurock.background.services.jthermodynamics.symmetry;

import org.dom4j.Element;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import thermo.data.benson.BensonThermodynamicBase;
import thermo.data.benson.SetOfBensonThermodynamicBase;
import thermo.data.structure.structure.symmetry.CalculateExternalSymmetryCorrection;
import thermo.data.structure.structure.symmetry.SetOfSymmetryDefinitions;
import thermo.data.structure.structure.symmetry.SymmetryDefinition;
import thermo.exception.ThermodynamicException;

/**
 * @author edwardblurock
 * 
 * This class is built upon CalculateExternalSymmetryCorrection which does the actual calculating
 * This class is based on using the (Google) Firestore Dataset for the source of 
 * SymmetryDefinitions (both primary and secondary)
 * 
 * It is based on the same principle as the SQLCalculateExternalSymmetryCorrection,
 * trying to decouple the database access with the calculation.
 * 
 *
 */
public class DatabaseCalculateExternalSymmetryCorrection extends CalculateExternalSymmetryCorrection {
	JsonArray symmarr;
	JsonArray symmarr2nd;
	
	/**
	 * @param maintainer The maintainer of the dataset
	 * @param dataset The dataset name
	 * 
	 * This primarily sets up the primary and secondary SetOfSymmetryDefinitions
	 * 
	 */
	public DatabaseCalculateExternalSymmetryCorrection(String maintainer, String dataset) {
		symmarr = ExtractSetOfSymmetryDefinitionsFromDataset.databaseSymmetryDefinitions(maintainer, dataset, 
				"dataset:StructureExternalSymmetry");
		symmarr2nd = ExtractSetOfSymmetryDefinitionsFromDataset.databaseSymmetryDefinitions(maintainer, dataset, 
				"dataset:StructureSecondarySymmetry");
		SetOfSymmetryDefinitions setOfDefinitions = ExtractSetOfSymmetryDefinitionsFromDataset.extract(symmarr);
		SetOfSymmetryDefinitions secondaryDefinitions = ExtractSetOfSymmetryDefinitionsFromDataset.extract(symmarr2nd);
		this.setSetOfDefinitions(setOfDefinitions);
		this.setSecondaryDefinitions(secondaryDefinitions);
		this.initialize();
	}
	
	/**
	 * @param molecule The molecule to add
	 * @param body The body of the total response document
	 * @param info Input info - used to get the units of the entropy term created.
	 * @return The entropy contribution as a ThermodynamicContributions object
	 * 
	 * This essentially does a call to CalculateExternalSymmetryCorrection.calculate(molecule,corrections).
	 * The contribution is created with ComputeThermodynamicsSymmetryContribution.parameterWithEntropy
	 * 
	 * Since a reference to the original SymmetryDefinition (from Firestore dataset), the name is 
	 * retrieved from the SymmetryDefinition (from Jthermodynamic). Note that this assumes only one
	 * symmetry contribution.
	 * 
	 */
	public JsonArray compute(IAtomContainer molecule, Element body, JsonObject info) {
		SetOfBensonThermodynamicBase corrections = new SetOfBensonThermodynamicBase();
		boolean symmetryfactor;
		JsonArray contributions = new JsonArray();
		try {
			symmetryfactor = calculate(molecule, corrections);
			if(symmetryfactor) {
				BensonThermodynamicBase thermo = corrections.get(0);
				Double entropy = this.getExternalSymmetryValue();
				JsonObject contribution = ComputeThermodynamicsSymmetryContribution.parameterWithEntropy(entropy,thermo.getName(),info);
				SymmetryDefinition symdef = getSymmetryDefinition();
				String symname = symdef.getElementName();
				
				body.addElement("div").addText("External Symmetry Found  :" + symname);
				body.addElement("div").addText("External Symmetry        : " + symdef.getInternalSymmetryFactor());
				body.addElement("div").addText("Entropy Contribution     : " + entropy);
				
				JsonObject symdefjson = ComputeThermodynamicsSymmetryContribution.findSymmetryObjectInSet(getStructureExternalSymmetry(),symname);
				contribution.add(ClassLabelConstants.ChemConnectThermodynamicsDatabase,symdefjson);
				contributions.add(contribution);
			}
		} catch (ThermodynamicException e) {
			e.printStackTrace();
		}
		return contributions;
	}
	
	
	JsonArray getStructureExternalSymmetry() {
		return symmarr;
	}
	
	JsonArray getStructureSecondarySymmetry() {
		return symmarr2nd;
	}

}
