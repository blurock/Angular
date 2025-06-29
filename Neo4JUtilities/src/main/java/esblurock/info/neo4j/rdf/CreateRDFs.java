package esblurock.info.neo4j.rdf;

import static org.hamcrest.CoreMatchers.nullValue;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.dom4j.Document;
import org.dom4j.Element;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;
import org.neo4j.driver.Record;
import org.neo4j.driver.summary.ResultSummary;
import org.neo4j.driver.summary.SummaryCounters;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import esblurock.info.neo4j.rdf.JsonToCypherUtilities;
import esblurock.info.neo4j.rdf.MapOfQueryAndProperties;
import esblurock.info.neo4j.utilities.Neo4JInitialization;
import info.esblurock.reaction.core.MessageConstructor;
import info.esblurock.reaction.core.StandardResponse;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;

public class CreateRDFs {

	public static JsonObject createRDFFromCatalogObject(JsonObject obj) {
        Document docmessage = MessageConstructor.startDocument("Create RDFs From CatalogObject");
        return createRDFFromCatalogObject(obj, docmessage);
	}
	public static JsonObject createRDFFromCatalogObject(JsonObject obj, Document docmessage) {
		Element body = MessageConstructor.isolateBody(docmessage);
		JsonObject response = null;
		String rdfpredicateString = ClassLabelConstants.RDFPredicate;
        body.addElement("h3").addText("Create RDFs From CatalogObject using RDF TransactionID: " + obj.get(ClassLabelConstants.TransactionID).getAsString());
		MapOfQueryAndProperties cypherquery = JsonToCypherUtilities.createSimpleRelation(obj);
		Driver driver = Neo4JInitialization.initDriver();
		try (Session session = driver.session()) {
			Transaction transaction = session.beginTransaction();
			Set<String> keyStrings = cypherquery.keySet();
			JsonArray jsonarray = new JsonArray();
			for (String key : keyStrings) {
				JsonObject jsonobject = new JsonObject();
				jsonarray.add(jsonobject);
				jsonobject.addProperty(rdfpredicateString, key);
				body.addElement("h3").addText(key);
				QueryAndProperties queryprops = cypherquery.getQuery(key);
				String query = queryprops.getQuery();
				List<Map<String, Object>> properties = queryprops.getProperties();
				int nodesCreated = 0;
				int relationshipsCreated = 0;
				body.addElement("pre").addText("Map Sets: " + properties.size());
				JsonArray jsonproperties = new JsonArray();
				
				for (Map<String, Object> map : properties) {
					Result result = transaction.run(query, map);
					while (result.hasNext()) {
						Record record = result.next();
						Map<String, Object> resultmap = record.asMap();
						for (String resultkey : resultmap.keySet()) {
							String object = (String) map.get(resultkey);
							jsonproperties.add(object);
						}
					}
					ResultSummary summary = result.consume();
					SummaryCounters counters = summary.counters();
					nodesCreated = nodesCreated + counters.nodesCreated();
					relationshipsCreated = relationshipsCreated + counters.relationshipsCreated();
				}
				body.addElement("pre").addText("Nodes Created: " + nodesCreated);
				body.addElement("pre").addText("Relationships Created: " + relationshipsCreated);
			}
			transaction.commit();
			response = StandardResponse.standardServiceResponse(docmessage, "Created RDFs", jsonarray);
		} catch (Exception e) {
			String message = "Error in creating RDFs: " + e.toString();
			response = StandardResponse.standardErrorResponse(docmessage, message, null);
			e.printStackTrace();
		} finally {
			driver.close();
		}
		return response;
	}
}
