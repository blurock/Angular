package info.esblurock.background.services.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Iterator;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.background.services.servicecollection.ServiceCollectionQueryOntology;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

@WebServlet(
	    name = "BackgroundService",
	    urlPatterns = {"/service"}
	)
public class BackgroundService  extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	/** POST
	 * The input is one JSON argument (read in using InputStream).
	 * The argument 'service' determines which service is to be performed
	 * {@link DatabaseServicesBase} processes the data with the service.
	 * 
	 * The response is application/json
	 *
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) 
		      throws IOException {

		String bodyS = getBody(request);
		  JsonObject body = JsonObjectUtilities.jsonObjectFromString(bodyS);
		  JsonObject answer = DatabaseServicesBase.process(body);
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(JsonObjectUtilities.toString(answer));
			out.flush();
	  }
	
	/** Read in the JSON data from the body of the post 
	 * 
	 * @param request The request from the POST
	 * @return The JsonObject data as a string
	 * @throws IOException
	 */
	public static String getBody(HttpServletRequest request) throws IOException {

	    String body = null;
	    StringBuilder stringBuilder = new StringBuilder();
	    BufferedReader bufferedReader = null;

	    try {
	        InputStream inputStream = request.getInputStream();
	        if (inputStream != null) {
	            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
	            char[] charBuffer = new char[128];
	            int bytesRead = -1;
	            while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
	                stringBuilder.append(charBuffer, 0, bytesRead);
	            }
	        } else {
	            stringBuilder.append("");
	        }
	    } catch (IOException ex) {
	        throw ex;
	    }
        if (bufferedReader != null) {
            try {
                bufferedReader.close();
            } catch (IOException ex) {
                throw ex;
            }
        }

	    body = stringBuilder.toString();
	    return body;
	}

}
