package esblurock.info.neo4j.rdf;

import static org.hamcrest.CoreMatchers.nullValue;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.rdfs.FindRDFInClass;
import info.esblurock.reaction.core.ontology.base.rdfs.ListOfRDFInformation;
import info.esblurock.reaction.core.ontology.base.rdfs.RDFInformation;
import info.esblurock.reaction.core.ontology.base.utilities.GenericSimpleQueries;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

public class JsonToCypherUtilities {

	private static String transactionaltlabel = DatasetOntologyParseBase
			.getAltLabelFromAnnotation("dataset:TransactionIDinRDF");
	private static String owneraltlabel = DatasetOntologyParseBase
			.getAltLabelFromAnnotation("dataset:CatalogObjectOwner");

	public static MapOfQueryAndProperties createSimpleRelation(JsonObject obj) {
		String id = obj.get(AnnotationObjectsLabels.identifier).getAsString();
		String classname = GenericSimpleQueries.classFromIdentifier(id);

		String transactionID = obj.get(ClassLabelConstants.TransactionID).getAsString();
		String owner = obj.get(ClassLabelConstants.CatalogObjectOwner).getAsString();

		ListOfRDFInformation rdfs = FindRDFInClass.createFullRDFForObject(obj);
		MapOfQueryAndProperties queryandproperties = new MapOfQueryAndProperties();
		for (RDFInformation rdf : rdfs.getList()) {
			Map<String, Object> proplst = new HashMap<String, Object>();
			String predicate = rdf.getPredicateClass();
			QueryAndProperties queryprops = null;

			String subjectnodeString = createNodeWithProperties(classname, rdf.getSubjectClass(), transactionID, owner,
					true, proplst, true);
			String objectnodeString = createNodeWithProperties(classname, rdf.getObjectClass(), transactionID, owner,
					false, proplst, true);
			String predicateString = createpPredicate(rdf.getPredicateClass(), null, null, owner, proplst);
			if (!queryandproperties.containsQuery(predicate)) {
				StringBuffer buffer = new StringBuffer();
				buffer.append("CREATE ");
				buffer.append(subjectnodeString);
				buffer.append("-");
				buffer.append(predicateString);
				buffer.append("->");
				buffer.append(objectnodeString);
				buffer.append(" RETURN subject." + transactionaltlabel + " AS " + transactionaltlabel);
				queryprops = queryandproperties.initialQuery(predicate, buffer.toString());

			} else {
				queryprops = queryandproperties.getQuery(predicate);
			}
			queryprops.addProperties(proplst);
		}
		return queryandproperties;
	}

	public static String createpPredicate(String predicateClass, Map<String, Object> values, String transactionID,
			String owner, Map<String, Object> proplst) {
		StringBuffer buffer = new StringBuffer();
		String properties = generatePropertiesForNode(values, transactionID, owner, proplst);
		buffer.append("[");
		buffer.append("relation");
		if (predicateClass != null) {
			buffer.append(":");
			String predicatename = predicateClass.substring(8);
			buffer.append(predicatename);
		}
		buffer.append(" ");
		buffer.append(properties);
		buffer.append("]");
		return buffer.toString();
	}

	public static String createNodeWithProperties(String classname, Map<String, Object> values, String transactionID,
			String owner, boolean subject, Map<String, Object> proplst, boolean create) {

		String subjectproperties = generatePropertiesForNode(values, transactionID, owner, proplst);
		if (create && values != null) {
			if (values.size() == 1) {
				String id = values.keySet().iterator().next();
				classname = GenericSimpleQueries.classFromIdentifier(id);
			}
		}
		StringBuffer buffer = new StringBuffer();
		buffer.append("(");

		if (subject) {
			buffer.append("subject");
		} else {
			buffer.append("object");
		}
		if (classname != null) {
			buffer.append(":");
			String nodename = classname.substring(8);
			buffer.append(nodename);

			if (subject) {
				buffer.append("SUBJECT");
			} else {
				buffer.append("OBJECT");
			}
		}
		buffer.append(" ");
		buffer.append(subjectproperties);
		buffer.append(")");
		return buffer.toString();
	}

	public static String generatePropertiesForNode(Map<String, Object> values, String transactionID, String owner,
			Map<String, Object> propertymap) {
		StringBuffer properties = new StringBuffer();
		properties.append("{");
		if (values == null) {
			values = new HashMap<String, Object>();
		}
		boolean first = true;
		for (String id : values.keySet()) {
			if (first) {
				first = false;
			} else {
				properties.append(", ");
			}

			String classname = GenericSimpleQueries.classFromIdentifier(id);
			String altlabel = DatasetOntologyParseBase.getAltLabelFromAnnotation(classname);
			addProperty(altlabel, properties);
			propertymap.put(altlabel, values.get(id));
		}
		if (values.keySet().size() > 0) {
			properties.append(", ");
		}
		addProperty(owneraltlabel, properties);
		propertymap.put(owneraltlabel, owner);
		if (transactionID != null) {
			properties.append(", ");
			addProperty(transactionaltlabel, properties);
			propertymap.put(transactionaltlabel, transactionID);
		}
		properties.append("}");
		return properties.toString();
	}

	private static void addProperty(String id, StringBuffer buf) {
		buf.append(id);
		buf.append(": $");
		buf.append(id);
		buf.append(" ");
	}
}
