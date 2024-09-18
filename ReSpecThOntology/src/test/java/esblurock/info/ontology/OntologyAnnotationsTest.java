package esblurock.info.ontology;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonArray;

import esblurock.info.respecth.json.JsonObjectUtilities;
import esblurock.info.respecth.ontology.OntologyAnnotationUtilities;

public class OntologyAnnotationsTest {

	@Test
	public void identifier() {
		System.out.println("OntologyAnnotationsTest : OntologyAnnotationUtilities.findClassesFromIdentifier(\"experiment\");");
		String name = "property";
		JsonArray classnames = OntologyAnnotationUtilities.findClassesFromIdentifier(name);
		
		System.out.println(JsonObjectUtilities.toString(classnames));
	}
	
	@Test
	public void findLeafNodesGivenIdentifierTest() {
		System.out.println("OntologyAnnotationsTest : OntologyAnnotationUtilities.findLeafNodesGivenIdentifier(\"experiment\"");
		String name = "property";
		JsonArray leaves = OntologyAnnotationUtilities.findLeafNodesGivenIdentifier(name);
		
		System.out.println(JsonObjectUtilities.toString(leaves));
		
	}
}
