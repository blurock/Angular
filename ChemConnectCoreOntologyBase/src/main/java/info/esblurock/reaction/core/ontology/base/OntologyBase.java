package info.esblurock.reaction.core.ontology.base;

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

public class OntologyBase {

	/**
	 * A static subclass to generate/return static items.
	 *
	 */
	public static class Util {
		static OntModel unitsmodel = null;
		static OntModel datasetmodel = null;
		static Map<String, String> namespaceMap = null;

		/**
		 * Static routine to generate/return the ontology of units
		 * 
		 * @return The ontology for scientific units
		 */
		public static OntModel getUnitsOntology() {
			if (unitsmodel == null) {
				unitsmodel = ModelFactory.createOntologyModel();
				AlternativeEntryWithAppFiles alt = new AlternativeEntryWithAppFiles();

				unitsmodel.getDocumentManager().addAltEntry(alt.getQUDTQudt(), alt.getQUDTQudtLocal());
				unitsmodel.getDocumentManager().addAltEntry(alt.getQUDTDimension(), alt.getQUDTQudtLocal());
				unitsmodel.getDocumentManager().addAltEntry(alt.getQUDTQuantity(), alt.getQUDTQuantityLocal());
				unitsmodel.getDocumentManager().addAltEntry(alt.getQUDTUnit(), alt.getQUDTUnitLocal());
				unitsmodel.getDocumentManager().addAltEntry(alt.getPhysicsUnit(), alt.getPhysicsUnitLocal());
				// unitsmodel.read(alt.getPhysicsUnit());
				unitsmodel.read("http://data.nasa.gov/qudt/owl/quantity");
				unitsmodel.read("http://data.nasa.gov/qudt/owl/unit");
			}
			return unitsmodel;
		}

		/**
		 * This routine generates/returns the ontology for UI structures and data
		 * structure relationships
		 * 
		 * @return The ontology model for data structures and data relations
		 */
		public static OntModel getDatabaseOntology() {
			if (datasetmodel == null) {
				AlternativeEntryWithAppFiles alt = new AlternativeEntryWithAppFiles();
				datasetmodel = ModelFactory.createOntologyModel();
				/*
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getVcardURL(),
				 * alt.getVcardLocal()); System.out.println("Vcard:      " +
				 * alt.getVcardLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getSSNURL(),
				 * alt.getSSNLocal()); System.out.println("ssn:        " + alt.getSSNLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getDataCubeURL(),
				 * alt.getDataCubleLocal()); System.out.println("data cube: " +
				 * alt.getDataCubleLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTQuantity(),
				 * alt.getQUDTQuantityLocal()); System.out.println("qudt:      " +
				 * alt.getQUDTQuantityLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getFoafURL(),
				 * alt.getFoafLocal()); System.out.println("foaf:      " + alt.getFoafLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getSKOSURL(),
				 * alt.getSKOSLocal()); System.out.println("skos:      " + alt.getSKOSLocal());
				 */
				/*
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getDctermsURL(),
				 * alt.getDcTermsLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getDCITypeURL(),
				 * alt.getDCITypeLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getProvoURL(),
				 * alt.getProvoLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getOrgURL(),
				 * alt.getOrgLocal());
				 * 
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTQudt(),
				 * alt.getQUDTQudtLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTDimension(),
				 * alt.getQUDTQudtLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTUnit(),
				 * alt.getQUDTUnitLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getPhysicsUnit(),
				 * alt.getPhysicsUnitLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTQuantity(),
				 * alt.getQUDTOwlLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getQUDTUnitOwl(),
				 * alt.getQUDTUnitOwlLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getElements(),
				 * alt.getElementsLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getSOSA(),
				 * alt.getSOSALocal());
				 */
				/*
				 * datasetmodel.read(alt.getQUDTQudt());
				 * datasetmodel.read(alt.getQUDTDimension());
				 * datasetmodel.read(alt.getQUDTUnit());
				 * datasetmodel.read(alt.getPhysicsUnit());
				 * datasetmodel.read(alt.getQUDTQuantity());
				 * datasetmodel.read(alt.getQUDTUnitOwl());
				 */
				/*
				 * System.out.println("dcat:      " + alt.getDCatLocal());
				 * datasetmodel.getDocumentManager().addAltEntry(alt.getDCatURL(),
				 * alt.getDCatLocal());
				 * 
				 * datasetmodel.getDocumentManager().addAltEntry(
				 * "http://www.w3.org/2004/02/skos/core",
				 * "https://github.com/w3c/dxwg/blob/dcat-2pwd-internal-review/dcat/rdf/dcat.ttl"
				 * ); datasetmodel.read(alt.getVcardURL());
				 * datasetmodel.read(alt.getDataCubeURL()); datasetmodel.read(alt.getSKOSURL());
				 * datasetmodel.read(alt.getSOSA());
				 * datasetmodel.read("http://www.w3.org/ns/prov.ttl"); datasetmodel.read(
				 * "https://github.com/w3c/dxwg/blob/dcat-2pwd-internal-review/dcat/rdf/dcat.ttl"
				 * ); datasetmodel.read("http://qudt.org/1.1/vocab/dimensionalunit");
				 * datasetmodel.read("http://qudt.org/1.1/vocab/dimension");
				 * datasetmodel.read("http://qudt.org/1.1/vocab/quantity");
				 * datasetmodel.read("http://qudt.org/1.1/vocab/unit");
				 * 
				 * //datasetmodel.read(alt.getElements());
				 */
				
				String filename = "/resources/Dataset.ttl";
				InputStream str = OntologyBase.class.getResourceAsStream(filename);

				try {
					datasetmodel.read(str, "http://esblurock.info", "TURTLE");
				} catch (Exception ex) {
					System.out.println("Error in reading Ontology:   " + filename + "\n" + ex.toString());
				} catch (java.lang.NoClassDefFoundError ex) {
					System.out.println("Error in reading Ontology:   " + filename + "\n" + ex.toString());
				} catch (java.lang.NoSuchFieldError ex) {
					System.out.println("Error in reading Ontology:   " + filename + "\n" + ex.toString());
				}
			}
			return datasetmodel;
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
				namespaceMap.put("http://qudt.org/schema/qudt#", "qudt");
				namespaceMap.put("http://qudt.org/vocab/unit#", "unit");
				namespaceMap.put("http://qudt.org/1.1/vocab/quantity#", "qudt");
				namespaceMap.put("http://www.w3.org/ns/dcat#", "dcat");
				namespaceMap.put("http://www.esblurock.info/dataset#", "dataset");
				namespaceMap.put("http://purl.org/dc/terms/", "dcterms");
				namespaceMap.put("http://www.w3.org/ns/org#", "org");
				namespaceMap.put("http://www.w3.org/ns/ssn/", "ssn");
				namespaceMap.put("http://purl.org/linked-data/cube#", "qb");
			}
			return namespaceMap;
		}
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
				+ "PREFIX qudt-vocab: <http://qudt.org/1.1/vocab/quantity#>" + "\n";
		return databasePrefix;
	}

	/**
	 * The prefix data (standard namespaces) is appended to the SELECT part of the
	 * query
	 * 
	 * @param queryS: The query beginning with SELECT
	 * @return The raw ResultSet to the query
	 */
	public static boolean datasetASK(String queryS) {
		OntModel model = OntologyBase.Util.getDatabaseOntology();
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
		OntModel model = OntologyBase.Util.getDatabaseOntology();
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
					System.out.println("Other: " + node.isAnon());
					System.out.println("Type: " + node.toString());
					System.out.println("" + node.asNode());
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
		String converted = Util.namespaceMap().get(namespace);
		if (converted == null) {
			converted = namespace;
		}
		return converted;
	}
}
