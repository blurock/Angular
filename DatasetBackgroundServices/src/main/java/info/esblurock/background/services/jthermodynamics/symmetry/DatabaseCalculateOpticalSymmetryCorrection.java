package info.esblurock.background.services.jthermodynamics.symmetry;

import java.util.Iterator;

import org.dom4j.Element;
import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import thermo.data.benson.SetOfBensonThermodynamicBase;
import thermo.data.structure.structure.symmetry.CalculateOpticalSymmetryCorrection;
import thermo.data.structure.structure.symmetry.DetermineSymmetryFromSingleDefinition;
import thermo.data.structure.structure.symmetry.SetOfSymmetryDefinitions;
import thermo.data.structure.structure.symmetry.SymmetryDefinition;
import thermo.exception.ThermodynamicException;

/**
 * @author edwardblurock
 * 
 *         This class is built upon CalculateOpticalSymmetryCorrection which
 *         does the actual calculating This class is based on using the (Google)
 *         Firestore Dataset for the source of SymmetryDefinitions (both primary
 *         and secondary)
 * 
 *         It is based on the same principle as the
 *         SQLCalculateOpticalSymmetryCorrection, trying to decouple the
 *         database access with the calculation.
 *
 */
public class DatabaseCalculateOpticalSymmetryCorrection extends CalculateOpticalSymmetryCorrection {
	JsonArray symmarr;
	SetOfSymmetryDefinitions setOfDefinitions;

	/**
	 * @param maintainer The maintainer of the dataset
	 * @param dataset    The dataset name
	 * 
	 *                   This primarily sets up the primary and secondary
	 *                   SetOfSymmetryDefinitions
	 * 
	 */
	public DatabaseCalculateOpticalSymmetryCorrection(String maintainer, String dataset) {
		symmarr = ExtractSetOfSymmetryDefinitionsFromDataset.databaseSymmetryDefinitions(maintainer, dataset,
				"dataset:StructureOpticalSymmetry");
		setOfDefinitions = ExtractSetOfSymmetryDefinitionsFromDataset.extract(symmarr);
		this.setStructureOpticalIsomer(setOfDefinitions);
		this.initialize();
	}

	/**
	 * @param molecule The molecule to add
	 * @param body     The body of the total response document
	 * @param info     Input info - used to get the units of the entropy term
	 *                 created.
	 * @return The entropy contribution as a ThermodynamicContributions object
	 * 
	 *         This essentially does a call to
	 *         CalculateExternalSymmetryCorrection.calculate(molecule,corrections).
	 *         The contribution is created with
	 *         ComputeThermodynamicsSymmetryContribution.parameterWithEntropy
	 * 
	 *         Since a reference to the original SymmetryDefinition (from Firestore
	 *         dataset), the name is retrieved from the SymmetryDefinition (from
	 *         Jthermodynamic). Note that this assumes only one symmetry
	 *         contribution.
	 * 
	 */
	public JsonArray compute(IAtomContainer molecule, Element body, JsonObject info) {
		JsonArray contributions = new JsonArray();
		DetermineSymmetryFromSingleDefinition determineSymmetry = new DetermineSymmetryFromSingleDefinition();
		Iterator<SymmetryDefinition> idef = setOfDefinitions.iterator();
		int count = 0;
		while (idef.hasNext()) {
			SymmetryDefinition symdef = idef.next();
			JsonObject symmetryJ = symmarr.get(count).getAsJsonObject();
			//System.out.println("SymmetryDefinition: " + symdef.toString());
			int symmetry;
			try {
				symmetry = determineSymmetry.determineSymmetry(symdef, molecule);
				//System.out.println("Symmetry: " + symmetry);
				if (symmetry > 0) {
					String symname = symdef.getElementName();
					Double symmfactor = symdef.getInternalSymmetryFactor();
					double entropy = calculateCorrection(symmfactor);
					
					JsonObject symdefjson = symmetryJ.get(ClassLabelConstants.JThermodynamicsSymmetryDefinition).getAsJsonObject();
					String name = symdefjson.get(ClassLabelConstants.JThermodynamicSymmetryDefinitionLabel).getAsString();
					
					
					JsonObject contribution = ComputeThermodynamicsSymmetryContribution.parameterWithEntropy(entropy, symname,
							info);

					body.addElement("div").addText("Optical Isomer Found    :" + name);
					body.addElement("div").addText("Optical Isomer Symmetry : " + symdef.getInternalSymmetryFactor());
					body.addElement("div").addText("Entropy Contribution    : " + entropy);

					contribution.add(ClassLabelConstants.ChemConnectThermodynamicsDatabase, symmetryJ);					
					contributions.add(contribution);
				}
			} catch (CDKException e) {
				e.printStackTrace();
			}
		}
		return contributions;
	}

	JsonArray getStructureOpticalSymmetry() {
		return symmarr;
	}

}
