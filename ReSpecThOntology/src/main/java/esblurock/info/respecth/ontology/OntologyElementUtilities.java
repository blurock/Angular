package esblurock.info.respecth.ontology;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.jena.rdf.model.RDFNode;

import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import esblurock.info.respecth.constants.OntologyIdentifierConstants;

public class OntologyElementUtilities {
	
	/** Find children of element (divided into whether mandatory, optional, etc)
	 * 
	 * @param elementS: the name of the element class
	 * @return the respecth:ChildrenOfElement data
	 */
	public static JsonObject findElementChildren(String elementS) {
		
		String query = "SELECT ?p ?ans\n"
				+ "WHERE { " + elementS + " rdfs:subClassOf* ?restriction  .\n"
				+ "?restriction rdf:type owl:Restriction .\n"
				+ "?restriction owl:onProperty ?p .\n"
				+ "OPTIONAL{?restriction owl:onClass ?ans} .\n"
				+ "OPTIONAL{?restriction owl:someValuesFrom ?ans} .\n"
				+ "FILTER(?p = respecth:hasMandatoryMember || ?p = respecth:hasOptionalMember || ?p = respecth:hasNonHandledMember) .\n"
				+ "}\n"
				+ "";
		
		JsonObject ans = new JsonObject();
		ans.addProperty(OntologyIdentifierConstants.elementclassname, elementS);
		JsonArray mandatory = new JsonArray();
		JsonArray optional = new JsonArray();
		JsonArray nonhandled = new JsonArray();
		ans.add(OntologyIdentifierConstants.mandatory, mandatory);
		ans.add(OntologyIdentifierConstants.optional, optional);
		ans.add(OntologyIdentifierConstants.nonhandled, nonhandled);
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		Set<String> keyset = ans.keySet();
		for(Map<String, String> pair : stringlst) {
			String predicateS = pair.get("p");
			String childS = pair.get("ans");
			if(keyset.contains(predicateS)) {
				JsonArray ptypelst = ans.get(predicateS).getAsJsonArray();
				ptypelst.add(childS);
			}
		}
		return ans;
	}
	
	public static JsonObject translateChildrenClassesToIdentifiers(JsonObject children) {
		JsonObject ans = new JsonObject();
		
		Set<String> keys = children.keySet();
		for(String key : keys) {
			JsonArray set = new JsonArray();
			JsonElement element = children.get(key);
			if(element.isJsonArray()) {
			ans.add(key, set);
			JsonArray childset = element.getAsJsonArray();
			for(int i=0; i<childset.size();i++) {
				String elementclass = childset.get(i).getAsString();
				String identifier = OntologyAnnotationUtilities.findIdentifierFromClass(elementclass);
				set.add(identifier);
			}
			}
		}
		return ans;
	}

}
