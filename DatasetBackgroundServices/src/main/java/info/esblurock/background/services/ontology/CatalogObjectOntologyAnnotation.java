package info.esblurock.background.services.ontology;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import info.esblurock.background.core.objects.ontology.BaseAnnotationObjects;
import info.esblurock.background.core.ontology.dataset.DatasetOntologyParseBase;


@WebServlet(
	    name = "CatalogObjectOntologyAnnotation",
	    urlPatterns = {"/catalogannotation"}
	)
public class CatalogObjectOntologyAnnotation extends HttpServlet {
	   public void doGet(HttpServletRequest request, HttpServletResponse response)
               throws IOException, ServletException {
		   response.setContentType("application/json");
	      String catalogname = request.getParameter("catalogname");
		System.out.println("generateSetOfStandardOntologyCatalogElement: " + catalogname);
		BaseAnnotationObjects hierarchy = DatasetOntologyParseBase.getAnnotationStructureFromIDObject(catalogname);
		String result = hierarchy.toString("");
		System.out.println(result);
		
		PrintWriter out = response.getWriter();
		out.print(result);
		
	}
	

}
