package esblurock.info.respecth.ontology;

import java.util.List;
import java.util.Map;

import org.apache.jena.rdf.model.RDFNode;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import esblurock.info.respecth.constants.OntologyIdentifierConstants;

public class OntologyAnnotationUtilities {

	/** Find all classes having the identifier
	 * 
	 * @param id The element identifier 
	 * @return A list of element classes that have the identifier
	 * 
	 */
	public static JsonArray findClassesFromIdentifier(String id) {
		JsonArray ans = new JsonArray();
		String query = "SELECT ?subject\n"
				+ "	WHERE { ?subject dcterms:identifier ?id .\n" 
				+ "         FILTER(STR(?id) = \"" + id +"\")" 
				+ "}";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		for(Map<String, String> pair : stringlst) {
			ans.add(pair.get("subject"));
		}
		
		return ans;
	}
	
	/** find the identifier for the class
	 * 
	 * @param classname The classname
	 * @return The identifier associated with the class
	 */
	public static String findIdentifierFromClass(String classname) {
		String identifier = null;
		
		String query = "SELECT ?idstring\n"
				+ "	WHERE { " + classname + " dcterms:identifier ?id \n"
				+ "	BIND(STR(?id) AS ?idstring)\n"
				+ "}\n"
				+ "";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		if(stringlst.size() > 0) {
			Map<String, String> pair = stringlst.get(0);
			identifier = pair.get("idstring");
		}
		
		return identifier;
	}
	
	
	
	/**
	 * @param identifier the element identifier
	 * @return The set of leaf nodes of the classes with that identifier
	 */
	public static JsonArray findLeafNodesGivenIdentifier(String identifier) {
		JsonArray ans = new JsonArray();
		
		String idfull = "\"" + identifier + "\"" + "^^xsd:string";
		
		String query = "select distinct ?cls {\n"
				+ "?cls dcterms:identifier ?id .\n"
				+ "         FILTER(STR(?id) = \"" + identifier +"\")"
				+ "?cls rdfs:subClassOf+ ?sup . \n"
				+ "FILTER NOT EXISTS{?sub rdfs:subClassOf+ ?cls "
				+ "FILTER(?sub != ?cls && ?sub != owl:Nothing ) }"
				+ "}";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		for(Map<String, String> pair : stringlst) {
			ans.add(pair.get("cls"));
		}
		
		return ans;
	}
	
	/** If the classname is a classification, find the classification class
	 * 
	 * @param classname The classname
	 * @return If the class is a classification, return the class name of the classification, null otherwise
	 */
	public static String classificationValue(String classname) {
		String classificationvalue = null;
		
		String query = "SELECT ?object\n"
				+ "	WHERE { " + classname + " rdfs:isDefinedBy ?object .\n"
				+ "                                 ?object rdfs:subClassOf*  respecth:RespecthClassification}";
		
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		if(lst.size() > 0) {
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		Map<String, String> pair = stringlst.get(0);
		classificationvalue = pair.get("object");
		}
		return classificationvalue;
	}
	
     /** find the classfications and give the class name and the classifications
      * 
     * @param classlist A list of class names
     * @return A list of pairs, the class and its classification (RespecthElementClassClassificationPair)
     */
    public static JsonArray findClassficationElementsFromClassList(JsonArray classlist) {
    	 JsonArray ans = new JsonArray();
    	 for(int i=0;i<classlist.size();i++) {
    		 String classname = classlist.get(i).getAsString();
    		 String classification = OntologyAnnotationUtilities.classificationValue(classname);
    		 if(classification != null) {
    			 JsonObject pair = new JsonObject();
    			 pair.addProperty(OntologyIdentifierConstants.elementclassname, classname);
    			 pair.addProperty(OntologyIdentifierConstants.classificationname, classification);
    			 ans.add(pair);
    		 }
    	 }
    	 
    	 return ans;
     }
	
	/** Find classification class for a specific value in a classification hierarchy
	 * 
	 * @param classification The classification class (top of hierarchy)
	 * @param identifier The specific classification value to search for
	 * @return The class which has the identifier (null if non found)
	 */
	public static String matchesInClassificationHierarchy(String classification, String identifier) {
		String classificationclass = null;
		
		String query = "SELECT ?object\n"
				+ "	WHERE { ?object rdfs:subClassOf* " + classification + " .\n"
				+ "                                ?object rdfs:label ?id .\n"
				+ "                                BIND(STR(?id) AS ?idstring) .\n"
				+ "                                FILTER(?idstring = \"" + identifier+ "\")}";
		
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		if(lst.size() > 0) {
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		Map<String, String> pair = stringlst.get(0);
		classificationclass = pair.get("object");
		}
		return classificationclass;
	}
}
