package info.esblurock.background.services.servicecollection;

import java.util.HashSet;

import org.dom4j.Document;
import org.openscience.cdk.AtomContainer;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonObject;

import info.esblurock.background.services.jthermodynamics.bensonrules.ComputeBensonRulesForMolecule;
import info.esblurock.background.services.jthermodynamics.symmetry.ComputeThermodynamicsSymmetryContribution;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import thermo.compute.utilities.StringToAtomContainer;
import thermo.data.structure.structure.MetaAtomInfo;
import thermo.exception.ThermodynamicComputeException;

public enum ServiceCollectionComputeThermodynamics {

	ComputeThermodynamicsFromBensonRules {

		@Override
		public JsonObject process(JsonObject info) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromBensonRules");
			JsonObject response = null;
			IAtomContainer molecule = convertLinearFormToMolecule(info);
			if(molecule != null) {
				String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
				String dataset = info.get(ClassLabelConstants.DatasetName).getAsString();				
				response = ComputeBensonRulesForMolecule.compute(maintainer, dataset, molecule, info);
			} else {
				String errorS = "Error in interpreting molecule";
				response = DatabaseServicesBase.standardErrorResponse(document, errorS, null);
			}
			return response;
		}
		
	}, ComputeThermodynamicsFromExternalSymmetry {

		@Override
		public JsonObject process(JsonObject info) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromExternalSymmetry");
			JsonObject response = null;
			IAtomContainer molecule = convertLinearFormToMolecule(info);
			if(molecule != null) {
				String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
				String dataset = info.get(ClassLabelConstants.DatasetName).getAsString();				
				response = ComputeThermodynamicsSymmetryContribution.computeExternalSymmetry(maintainer, dataset, molecule, info);
			} else {
				String errorS = "Error in interpreting molecule ";
				response = DatabaseServicesBase.standardErrorResponse(document, errorS, null);
			}
			return response;
		}
		
	}, ComputeThermodynamicsFromSymmetryElement {

		@Override
		public JsonObject process(JsonObject info) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromBensonRules");
			JsonObject response = null;
			IAtomContainer molecule = convertLinearFormToMolecule(info);
			String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			String dataset = info.get(ClassLabelConstants.DatasetName).getAsString();				
			if(molecule != null) {
				response = ComputeThermodynamicsSymmetryContribution.computeFromSymmetryObject(maintainer, dataset, molecule, info);
			} else {
				String errorS = "Error in interpreting molecule ";
				response = DatabaseServicesBase.standardErrorResponse(document, errorS, null);
			}
			return response;
		}
		
	}, ComputeThermodynamicsFromInternalSymmetry {

		@Override
		public JsonObject process(JsonObject info) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromInternalSymmetry");
			JsonObject response = null;
			IAtomContainer molecule = convertLinearFormToMolecule(info);
			if(molecule != null) {
				String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
				String dataset = info.get(ClassLabelConstants.DatasetName).getAsString();				
				response = ComputeThermodynamicsSymmetryContribution.computeInternalSymmetry(maintainer, dataset, molecule, info);
			} else {
				String errorS = "Error in interpreting molecule ";
				response = DatabaseServicesBase.standardErrorResponse(document, errorS, null);
			}
			return response;
		}
		
	}, ComputeThermodynamicsFromOpticalIsomers {

		@Override
		public JsonObject process(JsonObject info) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromOpticalIsomers");
			JsonObject response = null;
			IAtomContainer molecule = convertLinearFormToMolecule(info);
			if(molecule != null) {
				String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
				String dataset = info.get(ClassLabelConstants.DatasetName).getAsString();				
				response = ComputeThermodynamicsSymmetryContribution.computeOpticalSymmetry(maintainer, dataset, molecule, info);
			} else {
				String errorS = "Error in interpreting molecule ";
				response = DatabaseServicesBase.standardErrorResponse(document, errorS, null);
			}
			return response;
		}
		
	};
	
	public abstract JsonObject process(JsonObject json);
	
	
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
