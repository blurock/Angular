package esblurock.info.json;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import esblurock.info.respecth.json.JsonObjectUtilities;
import esblurock.info.respecth.ontology.OntologyElementUtilities;

public class OntologyElementUtilitiesTest {

	@Test
	public void testFindElementChildren() {
		System.out.println("OntologyElementUtilitiesTest:   findElementChildren(elementS);");
		
		String elementS = "respecth:ExperimentIgnitionDelayMeasurementFile";
		
		JsonObject ans = OntologyElementUtilities.findElementChildren(elementS);
		
		System.out.println("Answer:\n" + JsonObjectUtilities.toString(ans));
	}

	@Test
	public void testtTranslateChildrenClassesToIdentifiers() {
		
		System.out.println("OntologyElementUtilitiesTest:   translateChildrenClassesToIdentifiers(JsonObject children)");
		
		String elementS = "respecth:ExperimentIgnitionDelayMeasurementFile";
		
		JsonObject classes = OntologyElementUtilities.findElementChildren(elementS);
		JsonObject identifiers = OntologyElementUtilities.translateChildrenClassesToIdentifiers(classes);
		System.out.println("Answer:\n" + JsonObjectUtilities.toString(identifiers));
		
	}
}
