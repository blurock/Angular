package info.esblurock.core.services.catalog.ontology;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Enumeration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Path;

import org.json.JSONObject;

import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.catalogobjects.AnnotationSet;
import info.esblurock.core.DataBaseObjects.catalogobjects.BaseCatalogObject;
import info.esblurock.core.ontologybase.dataset.GenerateCatalogObject;

@Path("/cataloginfo")
public class CatalogObjectInfoWithAnnotations extends HttpServlet {
	
	/*
	@Context
    Request request;

	@Path("{catalogname}")
	@GET
	@Produces("application/json")
	public Response generateSetOfStandardOntologyCatalogElement(@PathParam("catalogname") String catalogname) throws JSONException {
*/
	
	   @Override
	   public void doGet(HttpServletRequest request, HttpServletResponse response)
	               throws IOException, ServletException {
	      // Set the response message's MIME type
	      response.setContentType("application/json");
	      String catalogname = request.getParameter("catalogname");

	    Enumeration<String> headnames = request.getHeaderNames();
	    while(headnames.hasMoreElements()) {
	    	String name = headnames.nextElement();
	    	System.out.println(name);
	    	System.out.println(request.getHeader(name));
	    }
	    
	    HttpSession session = request.getSession();
	    Enumeration<String> names = session.getAttributeNames();
	    while(names.hasMoreElements()) {
	    	String name =names.nextElement();
	    	System.out.println(name +  ": " + session.getAttribute(name));
	    }
	    
	    System.out.println(session.getId());
	    

	    
		Date today = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  
		String strDate = dateFormat.format(today);  
		
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement(catalogname);
		BaseCatalogObject bascat = new BaseCatalogObject();
		bascat.fillBaseInfo("1", strDate, "Public", "blurock", catalogname);
		bascat.fill(hierarchy);

		AnnotationSet set = new AnnotationSet();
		set.fill(hierarchy);

		JSONObject jobj = new JSONObject();
		jobj.put("catalog" , bascat.toJSONObject());
		jobj.put("annotations", set.toJSONObject());
		
		PrintWriter out = response.getWriter();
		out.print(jobj.toString());
	}

	
}
