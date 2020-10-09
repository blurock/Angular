package info.esblurock.core.services.catalog.ontology;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;

import info.esblurock.core.DataBaseObjects.classifications.ClassificationHierarchy;
import info.esblurock.core.ontologybase.classification.DatabaseOntologyClassification;

@Path("/classificationhierarchy")
public class GetClassificationHierarchy {
	
	@Path("{classification}")
	@GET
	@Produces("application/json")
	public Response generateSetOfStandardOntologyCatalogElement(@PathParam("classification") String classification) throws JSONException {
		ClassificationHierarchy hier = DatabaseOntologyClassification.getClassificationHierarchy(classification);
		String result = hier.toString("");
		return Response.status(200).entity(result).build();
	}	
}
