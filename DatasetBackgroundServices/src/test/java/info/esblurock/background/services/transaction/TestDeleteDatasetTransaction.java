package info.esblurock.background.services.transaction;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.background.services.datamanipulation.DatasetObjectLabelListManipulation;
import info.esblurock.background.services.dataset.DeleteDatasetTransaction;
import info.esblurock.background.services.firestore.InitiallizeSystem;

public class TestDeleteDatasetTransaction {

	@Test
	public void test() {
		try {
			InitiallizeSystem.initialize();
			String specificationfordatasetS = "{"
					+ "			\"dataset:catalogobjectmaintainer\": \"Administrator\",\n"
					+ "			\"dataset:uniquegenericname\": \"SecondarySymmetryCarbonAtom\",\n"
					+ "			\"dataset:datasetobjecttype\": \"dataset:JThermodynamicsSymmetryStructureDefinitionDataSet\"\n"
					+ "}";
			
			String paths = ""
					+ "/resources/standard/symmetry/secondary/TransactionReadSecondarySymmetryCarbonAtom.json\n"
					+ "/resources/standard/symmetry/secondary/TransactionParseSecondarySymmetryCarbonAtom.json\n"
					+ "/resources/standard/symmetry/secondary/TransactionCreateSecondarySymmetryCarbonAtom.json\n";

			JsonObject specificationfordataset = JsonObjectUtilities.jsonObjectFromString(specificationfordatasetS);

			RunMultipleTransactions.runMultipleFromListOfFiles(paths, "Administrator", true,
					false);
			
			JsonObject response1 = DatasetObjectLabelListManipulation.findChemConnectDatabaseUniqueGenericLabelSet("Administrator",
					 specificationfordataset);
			JsonObjectUtilities.printResponse(response1);
			JsonObject response2 = DatasetObjectLabelListManipulation.findChemConnectDatabaseObjectsForLabel("Administrator",
					 "ExternalSymmetry-CyB1zyB1zyB1z",specificationfordataset);
			JsonObjectUtilities.printResponse(response2);
			
			

			JsonObject dresponse = DeleteDatasetTransaction.deleteTransactionPath(specificationfordataset, true, true,
					true);
					
			if (dresponse != null) {
				JsonObjectUtilities.printResponse(dresponse);
				System.out.println("Success!!!!");
			} else {
				System.out.println("Error: no reponse formed");
			}
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
