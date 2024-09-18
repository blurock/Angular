package esblurock.info.ontology;

import static org.junit.Assert.*;

import java.util.List;
import java.util.Map;

import org.apache.jena.ontology.OntModel;
import org.apache.jena.rdf.model.RDFNode;
import org.junit.Test;

import esblurock.info.respecth.ontology.OntologyBase;

public class OntologyReadTest {

	@Test
	public void test() {
		OntModel model = OntologyBase.getDatabaseOntology();
		
		String structure = "respecth:RespecthExperiment";
		String query = "SELECT ?predicate ?prop (STR(?id) AS ?idS)\n"
				+ "	WHERE { respecth:ExperimentTimeSpeciesProfile rdfs:subClassOf* ?subject .\n"
				+ "                                ?subject rdf:type ?classtype .\n"
				+ "                                 ?subject owl:onProperty ?predicate .\n"
				+ "                                 OPTIONAL {?subject owl:onClass ?prop .  ?prop  dcterms:identifier ?id }  .\n"
				+ "                                 OPTIONAL{?subject  owl:someValuesFrom ?prop .  ?prop  dcterms:identifier ?id}\n"
				+ "}\n";
/*		
		String query = "SELECT ?structure ?sub\n" 
				+ "	WHERE {\n" 
				+ "?structure rdfs:subClassOf ?sub\n" + "	" 
				+ "  }";
				*/
		System.out.println("Query:\n" + query);
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		for(Map<String, String> pair : stringlst) {
			System.out.println(pair.toString());
		}
        
		
	}

}
