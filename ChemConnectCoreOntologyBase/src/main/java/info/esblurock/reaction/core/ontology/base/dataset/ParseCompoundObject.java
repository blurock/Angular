package info.esblurock.reaction.core.ontology.base.dataset;

import java.util.List;
import java.util.Map;

import org.apache.jena.rdf.model.RDFNode;

import info.esblurock.reaction.core.ontology.base.OntologyBase;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

public class ParseCompoundObject {
	static String dimensiontype = "<http://purl.org/linked-data/cube#dimension>";
	static String compoundclass = "dataset:ChemConnectElementCompound";

	/**
	 * @param classname The name of the ontology ChemConnectElementCompound class
	 * @return The set of dimension parameters
	 */
	public static CompoundObjectDimensionSet compoundObjectDimensionObjects(String classname) {
		String query = "SELECT ?subject ?record ?cardinality\n" + 
				"	WHERE { " + classname  + " rdfs:subClassOf ?object ."
						+ "?object owl:onProperty " + dimensiontype + " ."
						+ "{?object owl:someValuesFrom ?record   }"
						+ "UNION"
						+ "{?object owl:onClass ?record . ?object owl:qualifiedCardinality ?cardinality}"
						+ "}";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		CompoundObjectDimensionSet set = new CompoundObjectDimensionSet();
		
		for(Map<String, String> map : stringlst) {
			String elementType = map.get("record");
			boolean compoundobject = OntologyUtilityRoutines.isSubClassOf(elementType, compoundclass, false);
			String cardinalityS = map.get("cardinality");
			boolean singlet = true;
			int cardinality = 0;
			if (cardinalityS != null) {
				cardinality = Integer.parseInt(cardinalityS);
				if (cardinality > 1) {
					singlet = false;
				}
			} else {
				singlet = false;
			}
			CompoundObjectDimensionInformation info = new CompoundObjectDimensionInformation(elementType, 
					cardinalityS, singlet,compoundobject);
			set.add(info);
		}
		return set;
	}
}
