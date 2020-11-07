package info.esblurock.background.services.ontology;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import info.esblurock.background.core.objects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.background.core.objects.catalogobjects.AnnotationSet;
import info.esblurock.background.core.objects.catalogobjects.BaseCatalogObject;
import info.esblurock.background.core.ontology.dataset.GenerateCatalogObject;


@WebServlet(
	    name = "CatalogObjectInfoWithAnnotations",
	    urlPatterns = {"/cataloginfo"}
	)

public class CatalogObjectInfoWithAnnotations extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	@Override
	   public void doGet(HttpServletRequest request, HttpServletResponse response)
	               throws IOException, ServletException {
	      response.setContentType("application/json");
	      String catalogname = request.getParameter("catalogname");
	      
	      System.out.println("CatalogObjectInfoWithAnnotations");
	      
		Date today = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  
		String strDate = dateFormat.format(today);  
		
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement(catalogname);
		BaseCatalogObject bascat = new BaseCatalogObject();
		bascat.fillBaseInfo("1", strDate, "Public", "blurock", catalogname);
		bascat.fill(hierarchy);

		System.out.println(hierarchy);
		AnnotationSet set = new AnnotationSet();
		set.fill(hierarchy);

		JSONObject jobj = new JSONObject();
		jobj.put("catalog" , bascat.toJSONObject());
		jobj.put("annotations", set.toJSONObject());
		
		PrintWriter out = response.getWriter();
		out.print(jobj.toString());
	}

	
}
