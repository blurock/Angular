package esblurock.info.respecth.ontology;

import java.util.List;
import java.util.Map;

import org.apache.jena.rdf.model.RDFNode;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class OntologyAnnotationUtilities {

	public static JsonArray findClassesFromIdentifier(String id) {
		JsonArray ans = new JsonArray();
		//String idfull = "\"" + id + "\"" + "^^rdfs:Literal";
		//String idfull = "\"" + id + "\"";
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
		/*
		String query = "SELECT ?subject ?subclass\n"
				+ "WHERE { ?subject dcterms:identifier " + idfull + " .\n"
				+ "OPTIONAL {?subclass rdfs:subClassOf+ ?subject} .\n"
				//+ "FILTER(?subclass = ?subject)\n"
				+ "FILTER (!Bound(?subclass))\n"
				+ "}";
		*/
		//String fullquery = OntologyBase.getStandardPrefixDatabase() + query;
		//System.out.println(fullquery);
		
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		System.out.println("Size: " + stringlst.size());
		for(Map<String, String> pair : stringlst) {
			System.out.println(pair.toString());
			ans.add(pair.get("cls"));
		}
		
		return ans;
	}
}
