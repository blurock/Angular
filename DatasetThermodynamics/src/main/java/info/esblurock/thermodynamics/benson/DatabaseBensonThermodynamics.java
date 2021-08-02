package info.esblurock.thermodynamics.benson;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Vector;

import org.openscience.cdk.AtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.thermodynamics.dataset.DatasetCompoundObject;
import jThergas.data.group.JThergasThermoStructureGroupPoint;
import thermo.data.benson.BensonConnectAtomStructure;
import thermo.data.benson.BensonGroupStructure;
import thermo.data.benson.BensonGroupStructuresFromMolecule;
import thermo.data.benson.BensonThermodynamicBase;
import thermo.data.benson.HeatCapacityTemperaturePair;
import thermo.data.benson.SetOfBensonGroupStructures;
import thermo.data.benson.thergas.BuildBensonThermodynamicFromThergas;

public class DatabaseBensonThermodynamics {
	BuildBensonThermodynamicFromThergas buildBenson;
	String bensonspecclass = "dataset:ThermodynamicBensonSpecification";
	
	public DatabaseBensonThermodynamics() {
		buildBenson = new BuildBensonThermodynamicFromThergas();
	}
	
	public JsonObject convertToJSON(JThergasThermoStructureGroupPoint point, String reference) {
		JsonObject topbenson = DatasetCompoundObject.fillCompoundObject(bensonspecclass);
		
        BensonGroupStructure grp = buildBenson.buildBensonGroupStructure(point);
        BensonThermodynamicBase benson = buildBenson.buildBensonThermodynamicBase(point, reference);
		double enthalpyD = benson.getStandardEnthalpy().doubleValue();
		String enthalpyS = String.format("%10.3f", enthalpyD).toString();
		double entropyD = benson.getStandardEntropy().doubleValue();
		String entropyS = String.format("%10.3f", entropyD).toString();
		
		topbenson.addProperty(ClassLabelConstants.ThermodynamicStandardEnthalpy, enthalpyS);
		topbenson.addProperty(ClassLabelConstants.ThermodynamicStandardEntropy, entropyS);
		
		JsonObject structjson = addJSONBensonGroupStructure(grp);
		topbenson.add(ClassLabelConstants.JThermodynamicsBensonRuleStructure, structjson);
		JsonArray jsoncpvalues = (JsonArray) topbenson.get(ClassLabelConstants.ThermodynamicCpAtTemperature);
		ArrayList<HeatCapacityTemperaturePair> cpset = benson.getSetOfHeatCapacities();
		Iterator<HeatCapacityTemperaturePair> iter = cpset.iterator();
		while(iter.hasNext()) {
			addHeatCapacityTemperaturePair(iter.next(), jsoncpvalues);
		}
		return topbenson;
		
	}
	
	
	public JsonObject addJSONBensonGroupStructure(BensonGroupStructure benson) {
		JsonObject grpstruct = new JsonObject();

		String center = benson.getCenterAtomS();
		grpstruct.addProperty(ClassLabelConstants.JThermodynamicsBensonCenterAtom, center);
		Iterator<BensonConnectAtomStructure> connections = benson.getBondedAtoms().iterator();
		while(connections.hasNext()) {
			BensonConnectAtomStructure connect = connections.next();
			String connectedatom = connect.getConnectedAtomS();
			int mult = connect.getMultiplicity();
			String multS = Integer.toString(mult);
		}
		return grpstruct;
	}
	
	public void addHeatCapacityTemperaturePair(HeatCapacityTemperaturePair cppair,JsonArray jsoncpvalues) {
		JsonObject jsoncpatT = new JsonObject();
		double cpD = cppair.getHeatCapacityValue();
		String cpS = String.format("%10.3f", cpD).toString();
		double TD  = cppair.getTemperatureValue();
		String TS = String.format("%10.3f", TD).toString();
		jsoncpatT.addProperty(ClassLabelConstants.ThermodynamicHeatCapacity, cpS);
		jsoncpatT.addProperty("dataset:thermotemperature", TS);
		jsoncpvalues.add(jsoncpatT);
	}
	
	public void addJsonObjectToArray(String label, String value, JsonArray arr) {
		JsonObject obj = new JsonObject();
		obj.addProperty(label,value);
		arr.add(obj);
	}

}
