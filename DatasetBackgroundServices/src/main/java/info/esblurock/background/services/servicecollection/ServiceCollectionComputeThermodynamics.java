package info.esblurock.background.services.servicecollection;

import java.util.HashSet;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.AtomContainer;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.molecule.DatasetMoleculeUtilities;
import info.esblurock.background.services.jthermodynamics.CalculateThermodynamicsFromVibration;
import info.esblurock.background.services.jthermodynamics.bensonrules.ComputeBensonRulesForMolecule;
import info.esblurock.background.services.jthermodynamics.dataset.FindMetaAtomDefinitionsInDatasetCollection;
import info.esblurock.background.services.jthermodynamics.disassociation.CalculateThermodynamicsForDisassociationEnergy;
import info.esblurock.background.services.jthermodynamics.symmetry.ComputeThermodynamicsSymmetryContribution;
import info.esblurock.background.services.jthermodynamics.symmetry.DatabaseCalculateSymmetryCorrection;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import thermo.compute.utilities.StringToAtomContainer;
import thermo.data.structure.structure.MetaAtomInfo;
import thermo.data.structure.utilities.MoleculeUtilities;
import thermo.exception.ThermodynamicComputeException;

public enum ServiceCollectionComputeThermodynamics {

	ComputeThermodynamicsFromBensonRules {

		@Override
		public JsonObject process(JsonObject activity) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromBensonRules");
			JsonObject response = null;
			JsonObject info = activity.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			IAtomContainer molecule = DatasetMoleculeUtilities.convertLinearFormToMolecule(info);
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
		public JsonObject process(JsonObject activity) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromExternalSymmetry");
			JsonObject response = null;
            JsonObject info = activity.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			IAtomContainer molecule = DatasetMoleculeUtilities.convertLinearFormToMolecule(info);
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
		public JsonObject process(JsonObject activity) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromBensonRules");
			JsonObject response = null;
            JsonObject info = activity.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			IAtomContainer molecule = DatasetMoleculeUtilities.convertLinearFormToMolecule(info);
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
		public JsonObject process(JsonObject activity) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromInternalSymmetry");
			JsonObject response = null;
            JsonObject info = activity.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			IAtomContainer molecule = DatasetMoleculeUtilities.convertLinearFormToMolecule(info);
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
		public JsonObject process(JsonObject activity) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromOpticalIsomers");
			JsonObject response = null;
            JsonObject info = activity.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			IAtomContainer molecule = DatasetMoleculeUtilities.convertLinearFormToMolecule(info);
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
		
	}, ComputeThermodynamicsFromAllSymmetries {

		@Override
		public JsonObject process(JsonObject activity) {
			Document document = MessageConstructor.startDocument("ComputeThermodynamicsFromAllSymmetries");
			Element body = MessageConstructor.isolateBody(document);
			JsonObject response = null;
            JsonObject info = activity.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			IAtomContainer molecule = DatasetMoleculeUtilities.convertLinearFormToMolecule(info);
			if(molecule != null) {
				String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
				String dataset = info.get(ClassLabelConstants.DatasetName).getAsString();
				body.addElement("div").addText("Maintainer      : " + maintainer);
				body.addElement("div").addText("dataset         : " + dataset);
				DatabaseCalculateSymmetryCorrection symmcorrection = new DatabaseCalculateSymmetryCorrection(maintainer,dataset);
				JsonArray total = symmcorrection.compute(molecule, body, info);
				response = DatabaseServicesBase.standardServiceResponse(document, "ComputeThermodynamicsFromAllSymmetries computed: " + total.size(), total);
			} else {
				String errorS = "Error in interpreting molecule";
				response = DatabaseServicesBase.standardErrorResponse(document, errorS, null);
			}
			return response;
		}
		
	}, ComputeThermodynamicsFromVibrationalModes {

		@Override
		public JsonObject process(JsonObject activity) {
            JsonObject info = activity.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			return CalculateThermodynamicsFromVibration.computeVibrationalCorrectionsForRadical(info);
		}
		
	}, ComputeThermodynamicsForDisassociationEnergy {

		@Override
		public JsonObject process(JsonObject activity) {
            JsonObject info = activity.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			return CalculateThermodynamicsForDisassociationEnergy.calculate(info);
		}
		
	}, SubstituteMetaAtomsInMolecule {

		@Override
		public JsonObject process(JsonObject info) {
			return FindMetaAtomDefinitionsInDatasetCollection.substituteMolecule(info);
		}
		
	}, SubstituteAndCondenseLinearMolecule {

		@Override
		public JsonObject process(JsonObject info) {
			return FindMetaAtomDefinitionsInDatasetCollection.substituteAndCondenseLinearMolecule(info);
		}
		
	};
	
	public abstract JsonObject process(JsonObject json);
	
	
}
