package info.esblurock.core.services.catalog.ontology;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;

import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.ontologybase.dataset.GenerateCatalogObject;

@Path("/catalogelement")
public class CatalogOntologyInformation {

	@GET
	@Produces("application/json")
	public Response generateSetOfStandardOntologyCatalog() throws JSONException {
		String result = "{found: found}";
		return Response.status(200).entity(result).build();
	}

	@Path("{catalogname}")
	@GET
	@Produces("application/json")
	public Response generateSetOfStandardOntologyCatalogElement(@PathParam("catalogname") String catalogname) throws JSONException {
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement(catalogname);
		String result = hierarchy.toString("");
		return Response.status(200).entity(result).build();
	}
 
}
