package info.esblurock.reaction.core.ontology.base.utilities;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.vocabulary.ReasonerVocabulary;

import info.esblurock.reaction.core.ontology.base.OntologyBase;



public class OntologyUtilityRoutines {
	
	/** The subclasses of a class
	 * 
	 * @param concept The top concept
	 * @param direct: true only direct subclasses, false the entire tree of subclasses
	 * @return The list of subclasses
	 */
	public static List<String> listOfSubClasses(String concept, boolean direct) {
		List<String> subobjs = new ArrayList<String>();
		String query = null;
		if(direct) {
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
	/** Is the class a class of the super class
	 * 
	 * @param testclass A class
	 * @param generalclass A class that could be a super class of testclass
	 * @param direct true: it is a direct subclass, false: it could be in the hierarchy
	 * @return True if a subclass
	 */
	public static boolean isSubClassOf(String testclass, String generalclass, boolean direct) {
		String query = null;
		if(direct) {
			query = "ASK {\n"
					+ testclass + " <" + ReasonerVocabulary.directSubClassOf + "> " + generalclass
					+"}";
		} else {
			query = "ASK {\n"
				+ testclass + " rdfs:subClassOf* " + generalclass
				+"}";
		}
		return OntologyBase.datasetASK(query);
	}
	/** Is it the same class
	 * 
	 * @param concept1 first class
	 * @param concept2 second class
	 * @return the first and second classes are the same
	 */
	public static boolean isSameClass(String concept1, String concept2) {
		return concept1.compareTo(concept2) == 0;
	}
	/** From the identifier, retrieve the class name
	 * @param identifier An identifier of some class
	 * @return the classname, if the identifier does not exist, then null is returned
	 * 
	 * If there is an error in the ontology and the identifier is not unique, then the first (randomly) is taken as the result
	 */
	public static String typesFromIdentifier(String identifier) {
		ArrayList<String> typelst = new ArrayList<String>();
		String query = "SELECT ?type\n" + 
				"			WHERE {?type <http://purl.org/dc/terms/identifier> \"" +  identifier +"\"^^xsd:string }";
		List<String> lst = OntologyBase.isolateProperty(query, "type");
		String classname = null;
		if(lst.size() > 0) {
			classname = lst.get(0);
		}
		return classname;
	}


}
