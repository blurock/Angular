package esblurock.info.respecth.validate;

import java.util.Set;

import org.w3c.dom.Document;
import org.w3c.dom.Node;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import esblurock.info.respecth.constants.OntologyIdentifierConstants;
import esblurock.info.respecth.json.JsonObjectUtilities;
import esblurock.info.respecth.ontology.OntologyAnnotationUtilities;
import esblurock.info.respecth.ontology.OntologyElementUtilities;
import esblurock.info.respecth.xml.XMLUtilities;

public class ValidateReSpecThElement {
	
	
	
	/**
	 * @param identifier The element identifier
	 * @param xmlelements The xmlelement of the current node (of the given identifier)
	 * @return (RespecthChildrenOfElementWithNotFound)
	 */
	public static JsonObject setWithtMatchingMandatoryElements(String identifier, JsonArray xmlelements) {
		JsonObject ans = new JsonObject();
		JsonArray leaves = OntologyAnnotationUtilities.findLeafNodesGivenIdentifier(identifier);
		
		JsonArray exact = new JsonArray();
		JsonArray withnotfound = new JsonArray();
		JsonArray sizenotmatching = new JsonArray();
		
		ans.add("exactmatch",exact);
		ans.add("withnotfound", withnotfound);
		ans.add("sizenotmatching", sizenotmatching);
		
		
		for(int i=0; i<leaves.size();i++) {
			String leaf = leaves.get(i).getAsString();
			JsonObject leafchildren = OntologyElementUtilities.findElementChildren(leaf);
			JsonObject catagorized = ValidateReSpecThElement.catagorizeXMLElements(leafchildren,xmlelements);
			
			//JsonArray mandatory = leafchildren.get(OntologyIdentifierConstants.mandatory).getAsJsonArray();
			//JsonArray xml = catagorized.get(OntologyIdentifierConstants.mandatory).getAsJsonArray();
			JsonArray xmlnotfound = catagorized.get(OntologyIdentifierConstants.NOTFOUND).getAsJsonArray();
			JsonArray missing = ValidateReSpecThElement.missingMandatoryObjects(leafchildren, catagorized);
			
			if(missing.size() == 0) {
				if(xmlnotfound.size() == 0) {
					exact.add(leafchildren);
				} else {
					withnotfound.add(leafchildren);
				}
			} else {
				sizenotmatching.add(leafchildren);
			}
		}
		
		return ans;
	}
	
	public static JsonArray missingMandatoryObjects(JsonObject ontologyclasschildren, JsonObject catagorized) {
		JsonArray ontology = ontologyclasschildren.get(OntologyIdentifierConstants.mandatory).getAsJsonArray();
		JsonArray xml = catagorized.get(OntologyIdentifierConstants.mandatory).getAsJsonArray().deepCopy();
		JsonArray ans = new JsonArray();
		
		if(ontology.size() != xml.size()) {
			for(int i=0;i<ontology.size();i++) {
				String id = ontology.get(i).getAsString();
				String identifier = OntologyAnnotationUtilities.findIdentifierFromClass(id);
				JsonElement jsonElement = JsonParser.parseString(identifier);
				if(!xml.contains(jsonElement)) {
					ans.add(jsonElement);
				};
			}
		}
		
		return ans;
	}
	
	
	/** Catagorize the set of XML file elements
	 * 
	 * @param ontologyclasschildren The set of children from ontology (with M/O/N/F qualification)
	 * @param xmlchildren The set of identifiers from the XML file
	 * @return (RespecthChildrenOfElementWithNotFound) The identifiers of the XML catagorized in M/O/N with the addition of 'notfound' for XML elements not in ontology definition
	 * 
	 */
	public static JsonObject catagorizeXMLElements(JsonObject ontologyclasschildren, JsonArray xmlchildren) {
		JsonObject ans = new JsonObject();
		JsonArray notused = xmlchildren.deepCopy();
		
		JsonObject ontologyidentifiers = OntologyElementUtilities.translateChildrenClassesToIdentifiers(ontologyclasschildren);
		
		Set<String> keys = ontologyidentifiers.keySet();
		
		for(String key : keys) {
			JsonArray idenset = ontologyidentifiers.get(key).getAsJsonArray();			
			JsonArray intersection = JsonObjectUtilities.getJsonArrayIntersection(idenset, xmlchildren);
			ans.add(key, intersection);
			for(int i=0;i<intersection.size();i++) {
				notused.remove(intersection.get(i));
			}
		}
		ans.add(OntologyIdentifierConstants.NOTFOUND, notused);
		
		return ans;
	}
	
	public static boolean verifyClassifications(JsonObject ontologyclasschildren, Node elementnode) {
		boolean passed = true;
		JsonArray classifications = new JsonArray();
		
		JsonArray mandatory = ontologyclasschildren.get(OntologyIdentifierConstants.mandatory).getAsJsonArray();
		JsonArray mclasses = OntologyAnnotationUtilities.findClassficationElementsFromClassList(mandatory);
		classifications.addAll(mclasses);
		
		JsonArray optional = ontologyclasschildren.get(OntologyIdentifierConstants.optional).getAsJsonArray();
		JsonArray oclasses = OntologyAnnotationUtilities.findClassficationElementsFromClassList(optional);
		classifications.addAll(oclasses);
		
		System.out.println(JsonObjectUtilities.toString(classifications));
		
		for(int i=0;i<classifications.size();i++) {
			JsonObject pair = classifications.get(i).getAsJsonObject();
			String classname = pair.get(OntologyIdentifierConstants.elementclassname).getAsString();
			System.out.println("Class: " + classname);
			String classificationname = pair.get(OntologyIdentifierConstants.classificationname).getAsString();
			String classificationidentifier = OntologyAnnotationUtilities.findIdentifierFromClass(classname);
			System.out.println("Identifier: " + classificationidentifier);
			Node classnode = XMLUtilities.getChildWithNameFromDocumentNode(elementnode, classificationidentifier);
			String nodevalue = classnode.getTextContent();
			System.out.println("Node value: " + classnode.getTextContent());
			String match = OntologyAnnotationUtilities.matchesInClassificationHierarchy(classificationname, nodevalue);
			if(match != null) {
				System.out.println("matched with: " + match);
			} else {
				passed = false;
			}
		}
		
		return passed;
		
	}
}
