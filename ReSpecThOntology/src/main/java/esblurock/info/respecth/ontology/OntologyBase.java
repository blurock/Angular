package esblurock.info.respecth.ontology;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.jena.ontology.OntModel;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.ResultSet;
import org.apache.jena.query.ResultSetFactory;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.sparql.core.ResultBinding;
import org.apache.jena.util.iterator.ExtendedIterator;


public class OntologyBase {
	
	static OntModel unitsmodel = null;
	static OntModel datasetmodel = null;
	static Map<String, String> namespaceMap = null;

	public static OntModel getDatabaseOntology() {
		if (datasetmodel == null) {
			datasetmodel = ModelFactory.createOntologyModel();
			/*
			AlternativeEntryWithAppFiles alt = new AlternativeEntryWithAppFiles();
			
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTQudt(), alt.getQUDTQudtLocal());
			
            datasetmodel.getDocumentManager().addAltEntry(alt.getVaemLocal(), alt.getVaem());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTDatatype(), alt.getQUDTDatatypeLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTUnit(), alt.getQUDTUnitLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTQuantitykind(), alt.getQUDTQuantitykindLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTDimensionvector(), alt.getQUDTDimensionvectorLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTConstant(), alt.getQUDTConstantLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTSou(), alt.getQUDTSouLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTSoqk(), alt.getQUDTSoqkLocal());
            
			
            datasetmodel.getDocumentManager().addAltEntry(alt.getDcTermsURL(), alt.getDcTermsLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTShacloverlay(), alt.getQUDTShacloverlayLocal());

            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTDtype(), alt.getQUDTDtypeLocal());

            
            datasetmodel.getDocumentManager().addAltEntry(alt.getDCatURL(), alt.getDCatLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getVcardURL(), alt.getVcardLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getProvoURL(), alt.getProvoLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getSSNURL(), alt.getSSNLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getSKOSURL(), alt.getSKOSLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getSOSA(), alt.getSOSALocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getPrefixURL(), alt.getPrefixLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTFacadeURL(), alt.getQUDTFacadeLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getShaclURL(), alt.getShaclLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getFunctionsURL(), alt.getFunctionsLocal());
            datasetmodel.getDocumentManager().addAltEntry(alt.getVaemLocal(), alt.getVaem());
            datasetmodel.getDocumentManager().addAltEntry(alt.getSplLocal(), alt.getplURL());
            
            datasetmodel.getDocumentManager().setProcessImports(false);
			*/
			//String filename = "../ChemConnectCoreOntologyBase/src/main/java/resources/Dataset.ttl";
			//String filename = "/respecthUnitsV14.ttl";
			
			String filename = "/respecthUnitsV14.ttl";
			InputStream str;
			try {
			    //System.out.println("BEGIN: read(str, \"http://esblurock.info\", \"TURTLE\");");
			    long startTime = System.currentTimeMillis();
				str = OntologyBase.class.getResourceAsStream(filename);
				datasetmodel.read(str, "http://esblurock.info", "TURTLE");
				long endTime = System.currentTimeMillis();
				long elapsedTime = endTime - startTime;
                //System.out.println("END: time(ms)=" + elapsedTime);
			} catch (Exception ex) {
				System.err.println("Exception: Error in reading Ontology:   " + filename + "\n" + ex.toString());
			} catch (java.lang.NoClassDefFoundError ex) {
				System.err.println("NoClass: Error in reading Ontology:   " + filename + "\n" + ex.toString());
			} catch (java.lang.NoSuchFieldError ex) {
				System.err.println("NoField: Error in reading Ontology:   " + filename + "\n" + ex.toString());
			}
		}
		return datasetmodel;
	}

	public static String getStandardPrefixUnits() {
		String queryPrefix = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" + "\n"
				+ "PREFIX owl: <http://www.w3.org/2002/07/owl#>" + "\n"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" + "\n"
				+ "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" + "\n"
				+ "PREFIX unit: <http://qudt.org/vocab/unit#>" + "\n" + "PREFIX qudt: <http://qudt.org/schema/qudt#>"
				+ "\n" + "PREFIX qudt-vocab: <http://qudt.org/1.1/vocab/quantity#>" + "\n"
				+ "PREFIX prov: <http://www.w3.org/ns/prov#>\n" + "PREFIX qb: <http://purl.org/linked-data/cube#>\n"
				+ "PREFIX dataset: <http://www.esblurock.info/dataset#>\n";
		return queryPrefix;
	}

	public static String getStandardPrefixDatabase() {
		String databasePrefix = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n"
				+ "PREFIX owl: <http://www.w3.org/2002/07/owl#>\n"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
				+ "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" + "PREFIX dcat: <http://www.w3.org/ns/dcat#>\n"
				+ "PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>\n"
				+ "PREFIX dataset: <http://www.esblurock.info/dataset#>\n"
				+ "PREFIX qb: <http://purl.org/linked-data/cube#>\n" + "PREFIX ssn: <http://www.w3.org/ns/ssn#>" + "\n"
				+ "PREFIX prov: <http://www.w3.org/ns/prov#>\n" + "PREFIX qudt: <http://qudt.org/schema/qudt#>" + "\n"
				+ "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>" + "\n"
				+ "PREFIX qudt-vocab: <http://qudt.org/1.1/vocab/quantity#>" + "\n"
				+ "PREFIX qkdv: <http://qudt.org/vocab/dimensionvector/>\n"
				+ "PREFIX quantitykind: <http://qudt.org/vocab/quantitykind/>\n"
				+ "PREFIX qudt: <http://qudt.org/schema/qudt/>\n"
				+ "PREFIX  unit: <http://qudt.org/vocab/unit/>\n"
				+ "PREFIX dcterms: <http://purl.org/dc/terms/>\n"
		        + "PREFIX  respecth: <http://esblurock.info/respecth#>\n";
		return databasePrefix;
	}
	
	/**
	 * This routine generates/returns the namespace mappings
	 * 
	 * @return The namespace to abbreviation mapping
	 */
	public static Map<String, String> namespaceMap() {
		if (namespaceMap == null) {
			namespaceMap = new HashMap<String, String>();

			namespaceMap.put("http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf");
			namespaceMap.put("http://www.w3.org/2002/07/owl#", "owl");
			namespaceMap.put("http://www.w3.org/2000/01/rdf-schema#", "rdfs");
			namespaceMap.put("http://www.w3.org/2001/XMLSchema#", "xsd");
			namespaceMap.put("http://www.w3.org/ns/dcat#", "dcat");
			namespaceMap.put("http://www.esblurock.info/dataset#", "dataset");
			namespaceMap.put("http://purl.org/dc/terms/", "dcterms");
			namespaceMap.put("http://www.w3.org/ns/org#", "org");
			namespaceMap.put("http://www.w3.org/ns/ssn/", "ssn");
			namespaceMap.put("http://purl.org/linked-data/cube#", "qb");

			namespaceMap.put("http://qudt.org/vocab/quantitykind/", "quantitykind");
			namespaceMap.put("http://qudt.org/vocab/unit/", "unit");
			namespaceMap.put("http://qudt.org/1.1/vocab/quantity#", "qudt");
			namespaceMap.put("http://qudt.org/vocab/dimensionvector/", "dimensionvector");
			namespaceMap.put("http://esblurock.info/respecth#", "respecth");
			namespaceMap.put("http://spinrdf.org/spin#", "spin");
			namespaceMap.put("http://spinrdf.org/sp#", "sp");
			namespaceMap.put("http://spinrdf.org/spl#", "spl");
			namespaceMap.put("http://www.w3.org/ns/sosa/", "sosa");
			namespaceMap.put("http://www.linkedmodel.org/schema/vaem#", "vaem");
			namespaceMap.put("http://www.w3.org/ns/prov#", "prov");
			namespaceMap.put("http://purl.org/dc/dcmitype/", "dcmitype");
			
		}
		return namespaceMap;
	}



	/**
	 * The prefix data (standard namespaces) is appended to the SELECT part of the
	 * query
	 * 
	 * @param queryS: The query beginning with SELECT
	 * @return The raw ResultSet to the query
	 */
	public static boolean datasetASK(String queryS) {
		OntModel model = OntologyBase.getDatabaseOntology();
		String fullquery = getStandardPrefixDatabase() + queryS;
		Query query = QueryFactory.create(fullquery);
		QueryExecution qe = null;
		boolean results = false;
		try {
			qe = QueryExecutionFactory.create(query, model);
			results = qe.execAsk();
		} finally {
			qe.close();
		}
		return results;
	}

	/**
	 * The prefix data (standard namespaces) is appended to the SELECT part of the
	 * query
	 * 
	 * @param queryS: The query beginning with SELECT
	 * @return The raw ResultSet to the query
	 */
	public static ResultSet datasetQueryBase(String queryS) {
		OntModel model = OntologyBase.getDatabaseOntology();
		String fullquery = getStandardPrefixDatabase() + queryS;
 		Query query = QueryFactory.create(fullquery);
		QueryExecution qe = null;
		ResultSet results = null;
		try {
			qe = QueryExecutionFactory.create(query, model);
			ResultSet results1 = qe.execSelect();
			results = ResultSetFactory.copyResults(results1);
		} finally {
			qe.close();
		}
		return results;
	}

	/**
	 * This converts the ResultSet to a mapping of keyword to RDF nodes
	 * 
	 * Each member of the List is a map from keywords to RDF nodes. Each member
	 * represents a result.
	 * 
	 * @param results: The Result set from a query
	 * @return A mapping from keywords to RDFNodes
	 */
	public static List<Map<String, RDFNode>> resultSetToMap(ResultSet results) {
		ArrayList<Map<String, RDFNode>> lst = new ArrayList<Map<String, RDFNode>>();
		while (results.hasNext()) {
			Object solution = results.next();
			ResultBinding result = (ResultBinding) solution;
			Iterator<String> names = result.varNames();
			HashMap<String, RDFNode> map = new HashMap<String, RDFNode>();
			while (names.hasNext()) {
				String name = names.next();
				RDFNode value = result.get(name);
				map.put(name, value);
			}
			lst.add(map);
		}
		return lst;
	}

	/**
	 * From the query a list of mappings from keywords to RDFNodes
	 * 
	 * @param queryS The query string
	 * @return A list of mappings from keywords to RDFNodes
	 */
	public static List<Map<String, RDFNode>> resultSetToMap(String queryS) {
		ResultSet set = datasetQueryBase(queryS);
		List<Map<String, RDFNode>> lst = resultSetToMap(set);
		return lst;
	}

	/**
	 * The simplifies the mapping to RDFNodes to a mapping to a String
	 * 
	 * From a Resource the namespace and the local string are separated out. The
	 * full namespace name is simplified to the standard abbreviation. From a
	 * Literal the value is isolated and converted to a string. Anything else is
	 * just converted to a String.
	 * 
	 * @param results A list of mappings from keywords to RDFNodes
	 * @return A list of mappings from a keyword to a String result.
	 */
	public static ArrayList<Map<String, String>> resultmapToStrings(List<Map<String, RDFNode>> results) {
		ArrayList<Map<String, String>> resultmaplst = new ArrayList<Map<String, String>>();
		for (Map<String, RDFNode> map : results) {
			Map<String, String> namemap = new HashMap<String, String>();
			Set<String> names = map.keySet();
			for (String name : names) {
				RDFNode node = map.get(name);
				if (node.isResource()) {
					Resource resource = node.asResource();
					String namespace = resource.getNameSpace();
					String local = resource.getLocalName();
					String simplenamespace = convertNameSpace(namespace);
					String full = simplenamespace + ":" + local;
					if (namespace == null) {
						full = node.toString();
					}
					namemap.put(name, full);
				} else if (node.isLiteral()) {
					Literal literal = node.asLiteral();
					String value = literal.getValue().toString();
					namemap.put(name, value);
				} else {
					System.err.println("Other: " + node.isAnon());
					System.err.println("Type: " + node.toString());
					System.err.println("" + node.asNode());
					namemap.put(name, node.toString());
				}
			}
			resultmaplst.add(namemap);
		}
		return resultmaplst;
	}

	/**
	 * A help routine to isolate a single property from the list of mappings.
	 * 
	 * @param property  The property to be isolated
	 * @param stringlst A list of mappings from a keyword to a String result.
	 * @return A list of the String of the property
	 */
	public static List<String> isolateProperty(String property, List<Map<String, String>> stringlst) {
		List<String> lst = new ArrayList<String>();
		for (Map<String, String> map : stringlst) {
			String value = map.get(property);
			lst.add(value);
		}

		return lst;
	}
	
	public static List<String> isolateProperty(String query, String property) {
		
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);

		ArrayList<String> props = new ArrayList<String>();
		for (Map<String, String> map : stringlst) {
			String sup = map.get(property);
			props.add(sup);
		}
		return props;
		
	}

	/**
	 * @param namespace The full namespace name (from Resource.getNamespace())
	 * @return The standard abbreviated namespace name
	 */
	public static String convertNameSpace(String namespace) {
		String converted = OntologyBase.namespaceMap().get(namespace);
		if (converted == null) {
			converted = namespace;
		}
		return converted;
	}
}

