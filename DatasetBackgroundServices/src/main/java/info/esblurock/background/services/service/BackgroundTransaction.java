package info.esblurock.background.services.service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

@WebServlet(name = "BackgroundTransaction", urlPatterns = { "/transaction" })
public class BackgroundTransaction extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * POST The input is one JSON argument (read in using InputStream). The argument
	 * 'service' determines which service is to be performed
	 * {@link DatabaseServicesBase} processes the data with the service.
	 * 
	 * The response is application/json
	 *
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String bodyS = BackgroundService.getBody(request);
		JsonObject body = JsonObjectUtilities.jsonObjectFromString(bodyS);
		JsonObject answer = TransactionProcess.processFromTransaction(body);
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(JsonObjectUtilities.toString(answer));
		out.flush();
	}

}
