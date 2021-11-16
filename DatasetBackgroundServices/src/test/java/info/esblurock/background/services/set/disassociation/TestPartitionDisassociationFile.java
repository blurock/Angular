package info.esblurock.background.services.set.disassociation;

import static org.junit.Assert.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestPartitionDisassociationFile {

	@Test
	public void test() {
		String srcpath = "src/test/java/resources/disassociationenergy/parsedisassociationfile.json";
		try {
			String content = Files.readString(Paths.get(srcpath));
			JsonObject json = JsonObjectUtilities.jsonObjectFromString(content);
			String type = "dataset:InitialReadInOfRepositoryFile";
			if(TransactionProcess.setFirstTransactionIntoActivityInfo(json,
					"dataset:InitialReadInOfRepositoryFile", 
					"dataset:JThermodynamicsDisassociationEnergyFormat", false)) {
				JsonObject response = TransactionProcess.processFromTransaction(json);
				JsonObjectUtilities.printResponse(response);
			} else {
				System.out.println("Failed to get prerequisite: " + type);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
