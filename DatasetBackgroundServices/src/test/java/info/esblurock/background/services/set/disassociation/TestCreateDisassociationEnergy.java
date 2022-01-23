package info.esblurock.background.services.set.disassociation;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.InitiallizeSystem;
import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestCreateDisassociationEnergy {

	@Test
	public void test() {
		InitiallizeSystem .initialize();
		String srcpath = "src/test/java/resources/disassociationenergy/createdisassociationenergies.json";
		String content;
		try {
			content = Files.readString(Paths.get(srcpath));
			JsonObject json = JsonObjectUtilities.jsonObjectFromString(content);
			System.out.println("----------------------------------------------");
			JsonObject response = TransactionProcess.processFromTransaction(json);
			System.out.println("----------------------------------------------");
			JsonObjectUtilities.printResponse(response);
			System.out.println("----------------------------------------------");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
