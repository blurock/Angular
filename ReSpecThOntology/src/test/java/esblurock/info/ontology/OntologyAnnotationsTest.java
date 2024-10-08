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
		String name = "experiment";
		JsonArray leaves = OntologyAnnotationUtilities.findLeafNodesGivenIdentifier(name);
		
		System.out.println(JsonObjectUtilities.toString(leaves));
		
	}
	
	@Test
	public void testClassificationValue() {
		System.out.println("OntologyAnnotationsTest : OntologyAnnotationUtilities.classificationValue(name)");
		String name = "respecth:RespecthExperimentTypeIgnitionDelay";
		String value = OntologyAnnotationUtilities.classificationValue(name);
		System.out.println("Class: " + name + "   classification: " + value);
		
	}
	@Test
	public void testMatchesInClassificationHierarchy() {
		System.out.println("OntologyAnnotationsTest : matchesInClassificationHierarchy");
		String classification = "respecth:RespecthExperimentTypeRestClass";
		String identifier = "jet stirred reactor measurement";
		
		String classname = OntologyAnnotationUtilities.matchesInClassificationHierarchy(classification,identifier);
		
		System.out.println("For classification: " + classification + " the identifier '" +  identifier + "' was found in " + classname);
	}
	@Test
	public void testFindClassficationElementsFromClassList() {
		System.out.println("OntologyAnnotationsTest : FindClassficationElementsFromClassList");
		JsonArray classlst = new JsonArray();
		classlst.add("respecth:RespecthExperimentTypeIgnitionDelay");
		classlst.add("respecth:RespecthComonProperties");
		classlst.add("respecth:RespecthStandardDeviationMethod");
		
		JsonArray classifications = OntologyAnnotationUtilities.findClassficationElementsFromClassList(classlst);
		System.out.println("From list: " + JsonObjectUtilities.toString(classlst));
		System.out.println(JsonObjectUtilities.toString(classifications));
	}
}
