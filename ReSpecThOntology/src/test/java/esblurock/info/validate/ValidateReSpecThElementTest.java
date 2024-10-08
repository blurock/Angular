package esblurock.info.validate;

import static org.junit.Assert.*;

import org.junit.Test;
import org.w3c.dom.Document;
import org.w3c.dom.Node;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import esblurock.info.respecth.json.JsonObjectUtilities;
import esblurock.info.respecth.ontology.OntologyElementUtilities;
import esblurock.info.respecth.validate.ValidateReSpecThElement;
import esblurock.info.respecth.xml.XMLUtilities;
import esblurock.info.xml.XMLUtilitiesTest;

public class ValidateReSpecThElementTest {

	//@Test
	public void testCatagorizeXMLElements() {
		System.out.println("----------------------------------------------------------------------------------");
		System.out.println("ValidateReSpecThElementTest:   respecth:ExperimentSpeciesProfileMeasurementFile");
		System.out.println("ValidateReSpecThElementTest:   catagorizeXMLElements(classes, xmlidentifiers);\n");
		
		String elementS = "respecth:ExperimentSpeciesProfileMeasurementFile";
		
		JsonObject classes = OntologyElementUtilities.findElementChildren(elementS);
		
		Document testdoc = XMLUtilitiesTest.getDocumentFromTestFile();
		Node root = testdoc.getDocumentElement();
		JsonArray xmlidentifiers = XMLUtilities.listNodesFromDocumentNode(root);
		
		JsonObject xmlcatagories = ValidateReSpecThElement.catagorizeXMLElements(classes, xmlidentifiers);
		
		System.out.println(JsonObjectUtilities.toString(xmlcatagories));
		
	}
	
	//@Test
	public void testMissingMandatoryObjects() {
		System.out.println("----------------------------------------------------------------------------------");
		System.out.println("ValidateReSpecThElementTest:   missingMandatoryObjects(classes,xmlcatagories);\n");
		
		String elementS = "respecth:ExperimentSpeciesProfileMeasurementFile";
		
		JsonObject classes = OntologyElementUtilities.findElementChildren(elementS);
		System.out.println(JsonObjectUtilities.toString(classes));
		
		//Document testdoc = XMLUtilitiesTest.getDocumentFromTestFile("/experimentmissingmandatoryelement.xml");
		Document testdoc = XMLUtilitiesTest.getDocumentFromTestFile();
		Node root = testdoc.getDocumentElement();
		JsonArray xmlidentifiers = XMLUtilities.listNodesFromDocumentNode(root);
		System.out.println(JsonObjectUtilities.toString(xmlidentifiers));
		
		JsonObject xmlcatagories = ValidateReSpecThElement.catagorizeXMLElements(classes, xmlidentifiers);
		
		JsonArray missing = ValidateReSpecThElement.missingMandatoryObjects(classes,xmlcatagories);
		
		System.out.println(JsonObjectUtilities.toString(missing));
	}	
	
	@Test
	public void testSetWithtMatchingMandatoryElements() {
		System.out.println("----------------------------------------------------------------------------------");
		System.out.println("ValidateReSpecThElementTest:   setWithtMatchingMandatoryElements(name, xmlidentifiers)\n");

		Document testdoc = XMLUtilitiesTest.getDocumentFromTestFile();
		Node root = testdoc.getDocumentElement();
		JsonArray xmlidentifiers = XMLUtilities.listNodesFromDocumentNode(root);
		String name = root.getNodeName();
		
		JsonObject matching = ValidateReSpecThElement.setWithtMatchingMandatoryElements(name, xmlidentifiers);
		
		System.out.println(JsonObjectUtilities.toString(matching));
	}
	
	//@Test
	public void testVerifyClassifications() {
		System.out.println("----------------------------------------------------------------------------------");
		System.out.println("ValidateReSpecThElementTest:   testVerifyClassifications()  respecth:ExperimentIgnitionDelayMeasurementFile\n");

		Document testdoc = XMLUtilitiesTest.getDocumentFromTestFile();
		Node root = testdoc.getDocumentElement();
		String elementS = "respecth:ExperimentIgnitionDelayMeasurementFile";
		JsonObject classes = OntologyElementUtilities.findElementChildren(elementS);
		
		System.out.println("Validated: " + ValidateReSpecThElement.verifyClassifications(classes, root));
		
		
		System.out.println("----------------------------------------------------------------------------------");
		System.out.println("ValidateReSpecThElementTest:   testVerifyClassifications()  respecth:ExperimentSpeciesProfileMeasurementFile\n");
		elementS = "respecth:ExperimentSpeciesProfileMeasurementFile";
		classes = OntologyElementUtilities.findElementChildren(elementS);
		
		System.out.println("Validated: " + ValidateReSpecThElement.verifyClassifications(classes, root));
		
		
	}

}
