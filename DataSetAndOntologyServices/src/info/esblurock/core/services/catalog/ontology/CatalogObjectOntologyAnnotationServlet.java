package info.esblurock.core.services.catalog.ontology;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.core.ontologybase.dataset.DatasetOntologyParseBase;

/**
 * Servlet implementation class CatalogObjectOntologyAnnotationServlet
 */
@WebServlet(
		description = "Get Catalog annotatiion objects", 
		urlPatterns = { 
				"/CatalogObjectOntologyAnnotationServlet", 
				"/annotation"
		})
public class CatalogObjectOntologyAnnotationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CatalogObjectOntologyAnnotationServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String catalogname = request.getParameter("catalogname");
		System.out.println("generateSetOfStandardOntologyCatalogElement: " + catalogname);
		BaseAnnotationObjects hierarchy = DatasetOntologyParseBase.getAnnotationStructureFromIDObject(catalogname);
		String result = hierarchy.toString("");
		System.out.println(result);
		response.getWriter().append(result);
		//return Response.status(200).entity(result).build();
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
