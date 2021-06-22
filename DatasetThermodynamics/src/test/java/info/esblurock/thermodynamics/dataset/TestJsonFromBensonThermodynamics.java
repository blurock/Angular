package info.esblurock.thermodynamics.dataset;


import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import info.esblurock.thermodynamics.benson.DatabaseBensonThermodynamics;
import thermo.data.benson.BensonThermodynamicBase;
import thermo.data.benson.StandardThergasBensonThermoType;

public class TestJsonFromBensonThermodynamics {

	@Test
	public void test() {
		StandardThergasBensonThermoType standard = new StandardThergasBensonThermoType();
		BensonThermodynamicBase thermo = new BensonThermodynamicBase();
		thermo.initialize("testname", "Test", standard.getTemperaturesAsDoubleValues());
		JsonObject obj = DatabaseBensonThermodynamics.convertToJSON(thermo);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		JsonElement je = JsonParser.parseString(obj.toString()).getAsJsonObject();
		String prettyJsonString = gson.toJson(je);
		System.out.println(": ----------------------------------------");
		System.out.println(prettyJsonString);
		System.out.println(": ----------------------------------------");

		;
	}

}
