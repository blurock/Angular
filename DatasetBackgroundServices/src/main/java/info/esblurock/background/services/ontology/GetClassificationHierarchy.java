package info.esblurock.background.services.ontology;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import info.esblurock.background.core.objects.classifications.ClassificationHierarchy;
import info.esblurock.background.core.ontology.classification.DatabaseOntologyClassification;


@WebServlet(
	    name = "GetClassificationHierarchy",
	    urlPatterns = {"/classificationhierarchy"}
	)

public class GetClassificationHierarchy extends HttpServlet{
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
	               throws IOException, ServletException {
	      // Set the response message's MIME type
	      response.setContentType("application/json");
	      String classification = request.getParameter("classification");
		ClassificationHierarchy hier = DatabaseOntologyClassification.getClassificationHierarchy(classification);
		String result = hier.toString("");
		PrintWriter out = response.getWriter();
		out.print(result);
		
	}	
}
