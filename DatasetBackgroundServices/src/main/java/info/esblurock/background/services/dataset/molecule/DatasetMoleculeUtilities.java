package info.esblurock.background.services.dataset.molecule;

import java.util.HashSet;

import org.openscience.cdk.AtomContainer;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import thermo.compute.utilities.StringToAtomContainer;
import thermo.data.structure.structure.MetaAtomInfo;
import thermo.exception.ThermodynamicComputeException;

public class DatasetMoleculeUtilities {
	
	public static IAtomContainer convertLinearFormToMolecule(JsonObject info) {
		String moldescription = info.get(ClassLabelConstants.JThermodynamicsStructureSpecification).getAsString();
		String molformid = info.get(ClassLabelConstants.JThermodynamicsSpeciesSpecificationType).getAsString();
		String molform = molformid.substring(8);
		HashSet<MetaAtomInfo> metaatoms = new HashSet<MetaAtomInfo>();
		StringToAtomContainer convertMoleculeString = new StringToAtomContainer(metaatoms);
		AtomContainer molecule = null;
		try {
			molecule = convertMoleculeString.stringToAtomContainer(molform, moldescription);
		} catch (ThermodynamicComputeException e) {
			e.printStackTrace();
		}
		return molecule;
	}

}
