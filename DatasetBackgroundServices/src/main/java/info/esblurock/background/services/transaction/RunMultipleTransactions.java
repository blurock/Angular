package info.esblurock.background.services.transaction;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.StringTokenizer;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;


public class RunMultipleTransactions {
	/**
	 * @param transactioninputs A string where each line is the input file for a transaction
	 * @param printresults true if each transaction should be printed
	 * @return The last response. If an error occurred, then the last response is the error response.
	 */
	public static JsonObject runMultipleFromListOfFiles(String transactioninputs, boolean printresults) {
		StringTokenizer tok = new StringTokenizer(transactioninputs,"\n");
		boolean success = true;
		JsonObject response = null;
		while(tok.hasMoreElements() && success) {
			String srcpath = tok.nextToken();
			String content;
			try {
				content = Files.readString(Paths.get(srcpath));
				JsonObject json = JsonObjectUtilities.jsonObjectFromString(content);
				response = TransactionProcess.processFromTransaction(json);
				if(response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
					System.out.println(" ------------ Transaction " + srcpath + " ------------ ");
					if(printresults) {
						JsonObjectUtilities.printResponse(response);
					}
				} else {
					success = false;
					System.out.println(" ------------ Transaction failed ------------ ");
				}
			} catch (IOException e) {
				success = false;
				System.out.println("Error in input translation: " + srcpath);
			}
		}
		return response;
	}
}
