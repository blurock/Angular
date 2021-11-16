package info.esblurock.background.services.set.disassociation;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestCreateDisassociationEnergy {

	@Test
	public void test() {
		String srcpath = "src/test/java/resources/disassociationenergy/createdisassociationenergies.json";
		try {
			String content = Files.readString(Paths.get(srcpath));
			JsonObject json = JsonObjectUtilities.jsonObjectFromString(content);
			String transactionname = "dataset:DatasetCollectionSetCreationEvent";
			String criteria = "Administrator.StandardDataset";
			if (TransactionProcess.setFirstTransactionIntoActivityInfo(json, transactionname, criteria, false)) {
				transactionname = "dataset:PartiionSetWithinRepositoryFile";
				criteria = "dataset:JThermodynamicsDisassociationEnergy";
				if (TransactionProcess.setFirstTransactionIntoActivityInfo(json, transactionname, criteria, false)) {
					System.out.println("----------------------------------------------");
					System.out.println(JsonObjectUtilities.toString(json));
					System.out.println("----------------------------------------------");
					JsonObject response = TransactionProcess.processFromTransaction(json);
					System.out.println("----------------------------------------------");
					JsonObjectUtilities.printResponse(response);
					System.out.println("----------------------------------------------");
				} else {
					System.out.println("Failed to get prerequisite: " + transactionname);
				}
			} else {
				System.out.println("Failed to get prerequisite: " + transactionname);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	
}
