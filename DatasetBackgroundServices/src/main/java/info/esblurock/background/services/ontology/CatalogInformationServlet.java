package info.esblurock.background.services.ontology;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;

import com.google.gson.JsonObject;

import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

@WebServlet(name = "CatalogInformationServlet", urlPatterns = { "/cataloginfo" })

public class CatalogInformationServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String catalogname = request.getParameter("catalogname");
		if (!catalogname.startsWith("dataset:")) {
			catalogname = "dataset:" + catalogname;
		}
        Document document = MessageConstructor.startDocument("DatasetCollectionDocumentIDPairForHierarchy");
		JsonObject catalogandanno = CreateDocumentTemplate.createTemplateWithAnnotations(catalogname);
        JsonObject serveresponse = DatabaseServicesBase.standardServiceResponse(document,
                "Success: DatasetCollectionDocumentIDPairForHierarchy", catalogandanno);
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(JsonObjectUtilities.toString(serveresponse));
		out.flush();
	}

}
