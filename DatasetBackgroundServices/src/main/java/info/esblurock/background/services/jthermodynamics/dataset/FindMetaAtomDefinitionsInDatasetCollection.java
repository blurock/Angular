package info.esblurock.background.services.jthermodynamics.dataset;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import org.openscience.cdk.exception.CDKException;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.FindDatasetCollections;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import thermo.data.structure.structure.MetaAtomDefinition;
import thermo.data.structure.structure.MetaAtomInfo;
import thermo.data.structure.structure.SetOfMetaAtomsForSubstitution;
import thermo.data.structure.structure.StructureAsCML;
import thermo.data.structure.structure.SubstituteBackMetaAtomsIntoMolecule;

public class FindMetaAtomDefinitionsInDatasetCollection {
	
	
	public static SetOfMetaAtomsForSubstitution setUpSubstituteMetaAtoms(String maintainer, String dataset, JsonObject setofproperties) {
		SetOfMetaAtomsForSubstitution substitute = new SetOfMetaAtomsForSubstitution();
		ArrayList<MetaAtomDefinition> lst = findMetaAtomDefinitions(maintainer, dataset, setofproperties);
		Iterator<MetaAtomDefinition> iter = lst.iterator();
		while(iter.hasNext()) {
			MetaAtomDefinition def = iter.next();
			substitute.addDefinition(def);
		}
		return substitute;
	}

	public static ArrayList<MetaAtomDefinition> findMetaAtomDefinitions(String maintainer, String dataset, JsonObject setofproperties) {
		ArrayList<MetaAtomDefinition> deflist = new ArrayList<MetaAtomDefinition>();
		String classname = "dataset:JThermodynamicsMetaAtomDefinition";
		String service = "ReadInDatasetWithDatasetCollectionLabel";
		JsonObject json = new JsonObject();
		JsonObject recordid = CreateDocumentTemplate.createSubTemplate("dataset:DatasetCollectionSetRecordIDInfo", false);
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		recordid.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, dataset);
		if(setofproperties != null) {
			recordid.add(ClassLabelConstants.SetOfPropertyValueQueryPairs, setofproperties);
		}
		json.add(ClassLabelConstants.DatasetCollectionSetRecordIDInfo, recordid);
		json.addProperty(ClassLabelConstants.DatasetCollectionObjectType, classname);
		json.addProperty(DatabaseServicesBase.service, service);
		JsonObject response = DatabaseServicesBase.process(json);
		if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
			if (arr != null) {
				for (int i = 0; i < arr.size(); i++) {
					JsonObject metaatomcatalog = arr.get(i).getAsJsonObject();
					if (metaatomcatalog.get(ClassLabelConstants.JThermodynamicsMetaAtomInfo) != null) {
						JsonObject metaatom = metaatomcatalog.get(ClassLabelConstants.JThermodynamicsMetaAtomInfo)
								.getAsJsonObject();
						MetaAtomDefinition definition = convertToMetaAtomDefinition(metaatom);
						if(definition != null) {
							deflist.add(definition);
						}
					} else {
						System.out.println("Meta Atom info not defined in Catalog Object");
					}
				}
			}
		} else {
			deflist = null;
		}
		return deflist;

	}
	public static MetaAtomDefinition convertToMetaAtomDefinition(JsonObject metaatom) {
		MetaAtomDefinition definition = null;
		if (metaatom.get(ClassLabelConstants.JThermodynamics2DSpeciesStructure) != null) {
		JsonObject structure = metaatom.get(ClassLabelConstants.JThermodynamics2DSpeciesStructure)
				.getAsJsonObject();
		String cml = structure.get(ClassLabelConstants.JThermodynamicsStructureAsCMLString)
				.getAsString();
		String name = structure.get(ClassLabelConstants.JThermodynamicsStructureName).getAsString();
		StructureAsCML structascml = new StructureAsCML(name, cml);
		String label = metaatom.get(ClassLabelConstants.JThermodynamicsMetaAtomLabel).getAsString();
		String type = metaatom.get(ClassLabelConstants.JThermodynamicsMetaAtomType).getAsString();
		MetaAtomInfo info = new MetaAtomInfo();
		info.setMetaAtomType(type);
		info.setMetaAtomName(label);
		info.setElementName(name);
		try {
			definition = new MetaAtomDefinition(info, structascml);
		} catch (ClassNotFoundException | CDKException | IOException e) {
			e.printStackTrace();
		}
		} else {
			System.out.println("Meta Atom info not defined in Catalog Object");
		}
		return definition;
	}
}
