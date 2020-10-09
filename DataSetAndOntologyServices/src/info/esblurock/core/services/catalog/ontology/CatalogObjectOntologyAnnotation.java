package info.esblurock.core.services.catalog.ontology;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;

import com.sun.research.ws.wadl.Request;

import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.core.ontologybase.dataset.DatasetOntologyParseBase;

@Path("/catalogannotation")
public class CatalogObjectOntologyAnnotation {
	
	@Path("{catalogname}")
	@GET
	@Produces("text/plain")
	public Response generateSetOfStandardOntologyCatalogElement(@PathParam("catalogname") String catalogname) throws JSONException {
		System.out.println("generateSetOfStandardOntologyCatalogElement: " + catalogname);
		BaseAnnotationObjects hierarchy = DatasetOntologyParseBase.getAnnotationStructureFromIDObject(catalogname);
		String result = hierarchy.toString("");
		System.out.println(result);
		return Response.status(200).entity(result).build();
	}
	

}
