package info.esblurock.background.services.jthermodynamics.dataset;

import java.util.ArrayList;

import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import thermo.data.structure.structure.StructureAsCML;

public class FindDisassociationEnergyCollection {

	public static ArrayList<DisassociationEnergyWithAtomCounts> findDisassociationEnergy(String maintainer,
			String dataset) {
		ArrayList<DisassociationEnergyWithAtomCounts> energylist = new ArrayList<DisassociationEnergyWithAtomCounts>();
		String service = "ReadInDatasetWithDatasetCollectionLabel";
		String classname = "dataset:JThermodynamicsDisassociationEnergyOfStructure";
		JsonObject json = new JsonObject();
		json.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		json.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, dataset);
		json.addProperty(ClassLabelConstants.DatasetCollectionObjectType, classname);
		json.addProperty(DatabaseServicesBase.service, service);
		JsonObject response = DatabaseServicesBase.process(json);
		if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			JsonObject catalog = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			JsonArray arr = catalog.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
			energylist = findDisassociationEnergy(arr);
		}
		return energylist;
	}

	public static ArrayList<DisassociationEnergyWithAtomCounts> findDisassociationEnergy(JsonArray arr) {
		ArrayList<DisassociationEnergyWithAtomCounts> energylist = new ArrayList<DisassociationEnergyWithAtomCounts>();
		if (arr != null) {
			for (int i = 0; i < arr.size(); i++) {
				JsonObject energy = arr.get(i).getAsJsonObject();
				if (energy.get(ClassLabelConstants.JThermodynamics2DSpeciesStructure) != null) {
					JsonObject structure = energy.get(ClassLabelConstants.JThermodynamics2DSpeciesStructure)
							.getAsJsonObject();
					String cml = structure.get(ClassLabelConstants.JThermodynamicsStructureAsCMLString).getAsString();
					String name = structure.get(ClassLabelConstants.JThermodynamicsStructureName).getAsString();
					StructureAsCML structascml = new StructureAsCML(name, cml);
					try {
						IAtomContainer molecule = structascml.getMolecule();
						JsonObject parameter = energy.get(ClassLabelConstants.JThermodynamicDisassociationEnergy)
								.getAsJsonObject();
						String valueS = parameter.get(ClassLabelConstants.ValueAsString).getAsString();
						String uncertaintyS = parameter.get(ClassLabelConstants.ValueUncertainty).getAsString();
						Double value = Double.valueOf(valueS);
						Double uncertainty = Double.valueOf(uncertaintyS);
						JsonObject recordid = energy.get(ClassLabelConstants.DatabaseCollectionOfCurrentClass)
								.getAsJsonObject();
						String source = JsonObjectUtilities.toString(recordid);
						DisassociationEnergyWithAtomCounts disassociation = new DisassociationEnergyWithAtomCounts(
								molecule, source, value, uncertainty);
						energylist.add(disassociation);
					} catch (CDKException e) {

					}
				} else {

				}

			}
		}
		return energylist;
	}

}
