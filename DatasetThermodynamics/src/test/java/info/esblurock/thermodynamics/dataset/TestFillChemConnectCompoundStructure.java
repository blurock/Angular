package info.esblurock.thermodynamics.dataset;

import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class TestFillChemConnectCompoundStructure {

	@Test
	public void test() {
		String classname = "dataset:ThermodynamicBensonSpecification";
		JsonObject obj = DatasetCompoundObject.fillCompoundObject(classname);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		JsonElement je = JsonParser.parseString(obj.toString()).getAsJsonObject();
		String prettyJsonString = gson.toJson(je);
		System.out.println(classname + ": ----------------------------------------");
		System.out.println(prettyJsonString);
		System.out.println(classname + ": ----------------------------------------");
	}

}
