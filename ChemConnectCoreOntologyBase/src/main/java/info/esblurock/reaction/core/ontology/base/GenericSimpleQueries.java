package info.esblurock.reaction.core.ontology.base;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.vocabulary.ReasonerVocabulary;

public class GenericSimpleQueries {

	public static List<String> listOfSubClasses(String concept, boolean inclusive) {
		List<String> subobjs = new ArrayList<String>();
		String query = null;
		if(inclusive) {
			query = "SELECT ?obj {\n"
					+ "?obj <" + ReasonerVocabulary.directSubClassOf + "> " + concept
					+"}";
		} else {
			query = "SELECT ?obj {\n"
				+ "?obj rdfs:subClassOf* " + concept
				+"}";
		}
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		subobjs = OntologyBase.isolateProperty("obj", stringlst);
		subobjs.remove(concept);
		return subobjs;
	}
	public static boolean isSubClassOf(String concept, String generalclass, boolean direct) {
		String query = null;
		if(direct) {
			query = "ASK {\n"
					+ concept + " <" + ReasonerVocabulary.directSubClassOf + "> " + generalclass
					+"}";
		} else {
			query = "ASK {\n"
				+ concept + " rdfs:subClassOf* " + generalclass
				+"}";
		}
		return OntologyBase.datasetASK(query);
	}
	public static boolean isSameClass(String concept1, String concept2) {
		return concept1.compareTo(concept2) == 0;
	}
	public static boolean isAArrayListDataObject(String unit) {
		String query = "ASK {" + "	" + unit + " rdfs:subClassOf dataset:ArrayListDataObject }";
		boolean result = OntologyBase.datasetASK(query);
		return result;
	}
	public static ArrayList<String> typesFromFileType(String filetype) {
		ArrayList<String> typelst = new ArrayList<String>();
		String query = "SELECT ?type\n" + 
				"			WHERE {?type <http://purl.org/dc/terms/identifier> \"" +  filetype +"\"^^xsd:string }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		for(Map<String, String> maptype : stringlst) {
			String exttype = maptype.get("type");
			if(exttype != null) {
				typelst.add(exttype);
			}
		}
		return typelst;
	}


}
