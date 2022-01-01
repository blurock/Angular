package info.esblurock.background.services.jthermodynamics.bensonrules;


import java.io.IOException;
import java.util.Iterator;
import java.util.Vector;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.parameters.ParameterUtilities;
import info.esblurock.background.services.jthermodynamics.InterpretThermodynamicBlock;
import info.esblurock.background.services.jthermodynamics.dataset.FindMetaAtomDefinitionsInDatasetCollection;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.units.DatabaseUnitUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import thermo.data.benson.BensonConnectAtomStructure;
import thermo.data.benson.BensonGroupStructure;
import thermo.data.benson.BensonGroupStructuresFromMolecule;
import thermo.data.benson.SetOfBensonGroupStructures;
import thermo.data.structure.structure.SetOfMetaAtomsForSubstitution;
import thermo.data.structure.structure.StructureAsCML;

public class ComputeBensonRulesForMolecule {
	
	public static JsonObject compute(String maintainer, String dataset, IAtomContainer molecule, JsonObject info) {
		JsonObject response = null;
		JsonObject total = CreateDocumentTemplate.createTemplate("dataset:SetOfThermodynamicContributions");
		Document document = MessageConstructor.startDocument("ComputeBensonRulesForMolecule");
		Element body = MessageConstructor.isolateBody(document);
		molecule = substituteBensonMolecule(maintainer, dataset,molecule,body);
		if(molecule != null) {
			BensonGroupStructuresFromMolecule benson = new BensonGroupStructuresFromMolecule();
			SetOfBensonGroupStructures structures = benson.deriveBensonGroupStructures(molecule);
			JsonArray bensonarr = convertSetOfBensonGroupStructures(structures);
			Element table = body.addElement("table");
			Element hrow = table.addElement("tr");
			hrow.addElement("th").addText("Benson Rule");
			hrow.addElement("th").addText("Enthalpy");
			hrow.addElement("th").addText("Entropy");
			JsonArray contributions = new JsonArray();
			int count = 0;
			for(int i=0; i<bensonarr.size();i++) {
				JsonObject bensonobj = bensonarr.get(i).getAsJsonObject();
				String bensonname = bensonobj.get(ClassLabelConstants.BensonRuleDatabaseReference).getAsString();
				JsonObject rule = readInBensonRuleFromLabel(bensonname, body, maintainer, dataset);
				if(rule != null) {
					count++;
					JsonObject thermo = rule.get(ClassLabelConstants.JThermodynamicStandardThermodynamics).getAsJsonObject();				
					JsonObject contribution = convertStandardThermodynamicsToContribution(thermo,bensonname,info,table);
					contribution.add(ClassLabelConstants.ChemConnectThermodynamicsDatabase,rule);
					contributions.add(contribution);
				} else {
					
				}
			}
			String message = "Success: ";
			if(count != bensonarr.size()) {
				message = "Error: ";
			}
			message += "  Calculated " + count + " Benson rules out of " + bensonarr.size();
			response = DatabaseServicesBase.standardServiceResponse(document, message, contributions);
		} else {
			
		}
		return response;
	}
	
	/** Fill in from JThermodynamicStandardThermodynamics to ThermodynamicContributions
	 * 
	 * @param thermo The standard thermodynamics (JThermodynamicStandardThermodynamics)
	 * @param info Information with the new unit specifications
	 * @return The thermodynamic contribution (ThermodynamicContributions)
	 * 
	 * This creates the ThermodynamicContributions and fills in the thermo 
	 * information from JThermodynamicStandardThermodynamics
	 * 
	 */
	private static JsonObject convertStandardThermodynamicsToContribution(JsonObject thermo, String bensonname, JsonObject info, Element table) {
		JsonObject contribution = CreateDocumentTemplate.createTemplate("dataset:ThermodynamicContributions");
		Element row = table.addElement("tr");

		String title = "Benson Rule Contribution:" + bensonname;
		contribution.addProperty(ClassLabelConstants.DescriptionTitle, title);
		row.addElement("td").addText(bensonname);

		JsonObject enthalpy = thermo.get(ClassLabelConstants.ThermodynamicStandardEnthalpy).getAsJsonObject();
		ParameterUtilities.changeParameterToNewSpecification(enthalpy, 
				info, ClassLabelConstants.ParameterSpecificationEnthaply);
		contribution.add(ClassLabelConstants.ThermodynamicStandardEnthalpy, enthalpy);
		row.addElement("td").addText(enthalpy.get(ClassLabelConstants.ValueAsString).getAsString());
		
		JsonObject entropy = thermo.get(ClassLabelConstants.ThermodynamicStandardEntropy).getAsJsonObject();
		ParameterUtilities.changeParameterToNewSpecification(entropy, 
				info, ClassLabelConstants.ParameterSpecificationEntropy);
		contribution.add(ClassLabelConstants.ThermodynamicStandardEntropy, entropy);
		row.addElement("td").addText(entropy.get(ClassLabelConstants.ValueAsString).getAsString());
		
		JsonObject cpspec = info.get(ClassLabelConstants.ParameterSpecificationHeatCapacity).getAsJsonObject();
		contribution.add(ClassLabelConstants.ParameterSpecificationHeatCapacity, cpspec);
		JsonArray heatcapacities = thermo.get(ClassLabelConstants.ThermodynamicCpAtTemperature).getAsJsonArray();
		JsonArray cpTcontributions = new JsonArray();
		contribution.add(ClassLabelConstants.HeatCapacityTemperatureValuePair, cpTcontributions);
		for(int i=0;i<heatcapacities.size();i++) {
			JsonObject cpT = heatcapacities.get(i).getAsJsonObject();
			JsonObject cp = cpT.get(ClassLabelConstants.ThermodynamicHeatCapacity).getAsJsonObject();
			String T = cpT.get(ClassLabelConstants.ThermodynamicTemperature).getAsString();
			JsonObject cpTvalues = CreateDocumentTemplate.createTemplate("dataset:HeatCapacityTemperatureValuePair");
			cpTvalues.addProperty(ClassLabelConstants.ThermodynamicTemperature, T);
			ParameterUtilities.changeParameterToNewSpecification(cp,info,
					ClassLabelConstants.ParameterSpecificationHeatCapacity);
			String cpvalue = cp.get(ClassLabelConstants.ValueAsString).getAsString();
			cpTvalues.addProperty(ClassLabelConstants.ThermodynamicHeatCapacityValue,cpvalue);
			String cperror = cp.get(ClassLabelConstants.ValueUncertainty).getAsString();
			cpTvalues.addProperty(ClassLabelConstants.ValueUncertainty, cperror);
			cpTcontributions.add(cpTvalues);
		}		
		return contribution;
	}
	
	
	/**
	 * @param maintainer The dataset maintainer
	 * @param dataset The dataset
	 * @param molecule The molecule to substitute
	 * @param body The response body
	 * @return The substituted molecule (the input rewritten). Null is returned if unsuccessful.
	 * 
	 * The maintainer and the dataset are used to find the 'BensonAtom' meta-atom database.
	 * The meta-atoms are read in from the database and then substituted into the molecule
	 * The bulk of the work is done by the FindMetaAtomDefinitionsInDatasetCollection class.
	 */
	public static IAtomContainer substituteBensonMolecule(String maintainer, String dataset, 
			IAtomContainer molecule, Element body) {
		String metaatomtype = "BensonAtom";
		JsonObject setofprops = CreateDocumentTemplate.createTemplate("dataset:SetOfPropertyValueQueryPairs");
		JsonArray arr = new JsonArray();
		setofprops.add(ClassLabelConstants.PropertyValueQueryPair,arr);
		JsonObject prop = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
		prop.addProperty(ClassLabelConstants.DatabaseObjectType, "dataset:jthermometaatominfo.dataset:metaatomlabel");
		prop.addProperty(ClassLabelConstants.ShortStringKey, metaatomtype);
		arr.add(prop);
		SetOfMetaAtomsForSubstitution substitute = 
				FindMetaAtomDefinitionsInDatasetCollection.setUpSubstituteMetaAtoms(maintainer, dataset, setofprops);
		try {
			substitute.substitute(molecule);
		} catch (ClassNotFoundException | CDKException | IOException e1) {
			body.addElement("div").addText("Unsuccesful attempt to substitute BensonAtom meta atoms in molecule");
			molecule = null;
		}
		return molecule;
	}
	
	/** Convert SetOfBensonGroupStructures to an array of JThermodynamicsBensonRuleStructure
	 * 
	 * @param structures The SetOfBensonGroupStructures derived from the molecule (from JThermodynamics)
	 * @return A JsonArray of JThermodynamicsBensonRuleStructure objects
	 * 
	 * 
	 */
	private static JsonArray convertSetOfBensonGroupStructures(SetOfBensonGroupStructures structures) {
		JsonArray bensonlst = new JsonArray();
		Iterator<BensonGroupStructure> iter = structures.iterator();
		while(iter.hasNext()) {
			BensonGroupStructure group = iter.next();
			JsonObject jgroup = convertBensonGroupStructure(group);
			bensonlst.add(jgroup);
		}
		
		return bensonlst;
	}

	/** Convert BensonGroupStructure to the JsonObject JThermodynamicsBensonRuleStructure (without contribution information)
	 * 
	 * @param group The BensonGroupStructure (from the JThermodynamics system)
	 * @return the JsonObject JThermodynamicsBensonRuleStructure
	 * 
	 * This routine extracts from the BensonGroupStructure class the information needed for
	 * the JsonObject JThermodynamicsBensonRuleStructure
	 * 
	 * The JThermodynamicsBensonRuleStructure has just the struc
	 * 
	 */
	public static JsonObject convertBensonGroupStructure(BensonGroupStructure group) {
		JsonObject jgroup = CreateDocumentTemplate.createTemplate("dataset:JThermodynamicsBensonRuleStructure");
		jgroup.addProperty(ClassLabelConstants.JThermodynamicsBensonCenterAtom, group.getCenterAtomS());
		Vector<BensonConnectAtomStructure> connected = group.getBondedAtoms();
		Iterator<BensonConnectAtomStructure> iter = connected.iterator();
		JsonArray connectarr = new JsonArray();
		jgroup.add(ClassLabelConstants.JThermodynamicsBensonConnectionWithMultiplicity, connectarr);
		while(iter.hasNext()) {
			BensonConnectAtomStructure struct = iter.next();
			JsonObject jconnect = CreateDocumentTemplate.createTemplate("dataset:JThermodynamicsBensonConnectionWithMultiplicity");
			jconnect.addProperty(ClassLabelConstants.JThermodynamicsBensonConnectingAtom, struct.getConnectedAtomS());
			jconnect.addProperty(ClassLabelConstants.ThermodynamicBensonMultiplicity, struct.getMultiplicity());
			connectarr.add(jconnect);
		}
		String bensonrulename = InterpretThermodynamicBlock.bensonRuleCanonicalName(jgroup);
		jgroup.addProperty(ClassLabelConstants.BensonRuleDatabaseReference, bensonrulename);
		
		return jgroup;
	}
	
	/**
	 * @param bensonname The standardized BensonRule name (used to find the Benson Rule in the database)
	 * @param table The document table for the benson rules
	 * @param maintainer The maintainer of the dataset
	 * @param dataset The dataset name
	 * @return The corresponding Benson Rule from the Benson Rule database
	 * 
	 * 
	 */
	private static JsonObject readInBensonRuleFromLabel(String bensonname, Element body, String maintainer, String dataset) {
		JsonObject rule = null;
		JsonObject response = readBensonObject(bensonname, maintainer, dataset);
		if(response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			JsonArray responsearr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
			if(responsearr.size() >= 1) {
				rule = responsearr.get(0).getAsJsonObject();
				
			} else {
				body.addElement("div").addText("Element not found in database(" + maintainer + ", " + dataset + ")");
			}
			
		} else {
			body.addElement("div").addText("Element not found in database(" + maintainer + ", " + dataset + ")");
		}
		return rule;
	}
	
	/** Read a Benson Rule with the standardized benson rule name.
	 * 
	 * @param bensonname Name of the Benson Rule
	 * @param maintainer The dataset maintainer
	 * @param dataset The dataset name
	 * @return The response of the reading the database of Benson Rules.
	 * 
	 * The maintainer and the dataset are used to find the Benson Rule database.
	 * The benson name is used to find the specific rule
	 */
	public static JsonObject readBensonObject(String bensonname, String maintainer, String dataset) {
		JsonObject setofprops1 = CreateDocumentTemplate.createTemplate("dataset:SetOfPropertyValueQueryPairs");
		JsonArray arr1 = new JsonArray();
		setofprops1.add(ClassLabelConstants.PropertyValueQueryPair,arr1);
		JsonObject prop1 = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
		prop1.addProperty(ClassLabelConstants.DatabaseObjectType, "dataset:bensonrulestructure.dataset:bensonruleref");
		prop1.addProperty(ClassLabelConstants.ShortStringKey, bensonname);
		arr1.add(prop1);

		String classname = "dataset:ThermodynamicBensonRuleDefinition";
		String service = "ReadInDatasetWithDatasetCollectionLabel";
		JsonObject json = new JsonObject();
		JsonObject recordid = CreateDocumentTemplate.createSubTemplate("dataset:DatasetCollectionSetRecordIDInfo", false);
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		recordid.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, dataset);
		json.add(ClassLabelConstants.DatasetCollectionSetRecordIDInfo, recordid);
		json.addProperty(ClassLabelConstants.DatasetCollectionObjectType, classname);
		json.addProperty(DatabaseServicesBase.service, service);
		json.add(ClassLabelConstants.SetOfPropertyValueQueryPairs, setofprops1);
		JsonObject response = DatabaseServicesBase.process(json);
		return response;
	}
}
