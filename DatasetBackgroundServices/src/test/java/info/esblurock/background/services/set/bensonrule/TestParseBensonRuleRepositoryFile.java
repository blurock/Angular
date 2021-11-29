package info.esblurock.background.services.set.bensonrule;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestParseBensonRuleRepositoryFile {

	@Test
	public void test() {
		String srcpath = "src/test/java/resources/bensonrules/parseTableA1CarbonBensonRules.json";
		try {
			String content = Files.readString(Paths.get(srcpath));
			JsonObject json = JsonObjectUtilities.jsonObjectFromString(content);
				JsonObject response = TransactionProcess.processFromTransaction(json);
				JsonObjectUtilities.printResponse(response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
