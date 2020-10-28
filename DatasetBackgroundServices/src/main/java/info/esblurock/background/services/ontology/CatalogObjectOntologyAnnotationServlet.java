package info.esblurock.background.services.ontology;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import info.esblurock.background.core.objects.ontology.BaseAnnotationObjects;
import info.esblurock.background.core.ontology.dataset.DatasetOntologyParseBase;


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
	      response.setContentType("application/json");
		BaseAnnotationObjects hierarchy = DatasetOntologyParseBase.getAnnotationStructureFromIDObject(catalogname);
		String result = hierarchy.toString("");
		response.getWriter().append(result);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
