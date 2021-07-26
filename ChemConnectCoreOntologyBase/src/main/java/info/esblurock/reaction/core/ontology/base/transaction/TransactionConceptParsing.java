package info.esblurock.reaction.core.ontology.base.transaction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.jena.rdf.model.RDFNode;

import info.esblurock.reaction.core.ontology.base.OntologyBase;



public class TransactionConceptParsing {
	
		public static String activityOfTransaction(String transaction) {
			
			String query = "SELECT ?activity\n" + 
					"	WHERE {" + transaction + " rdfs:subClassOf ?object .\n" + 
					"                                 ?object owl:onProperty prov:activity .\n" + 
					"                                  ?object  owl:onClass ?activity}";
			
			System.out.println(query);
			List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
			List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
			String activity = null;
			if(stringlst.size() > 0) {
				Map<String, String> map = stringlst.get(0);
				activity = map.get("activity");
			}
			System.out.println("--------------------   activityOfTransaction");
			return activity;
		}

		
		public static ArrayList<String> requirementsOfTransaction(String transaction) {
			String query = "SELECT  ?requires\n" + 
					"	WHERE { " + transaction + " rdfs:subClassOf ?object .\n" + 
					"                                 ?object  owl:onProperty <http://purl.org/dc/terms/requires>  .\n" + 
					"                                  ?object  owl:onClass ?requires .\n" + 
					"}";
			System.out.println(query);
			List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
			System.out.println("Size: = " + lst.size());
			List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
			
			ArrayList<String> sublist = new ArrayList<String>();
			for(Map<String, String> requirement : stringlst) {
				System.out.println("Require:\n" + requirement);
				String requires = requirement.get("requires");
				sublist.add(requires);
			}
			return sublist;
			
		}
}
