package info.esblurock.background.services.dataset;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestInsertDatasetCollectionInCollectionSet {

	@Test
	public void test() {
		System.out.println("------------------------------------");
		System.out.println("DatasetCollectionSetAddDatasetEvent");
		System.out.println("------------------------------------");
		
		String srcpath = "src/test/java/resources/dataset/addcollectionDisassociationEnergy.json";
		//String srcpath = "src/test/java/resources/dataset/addcollectionMetaAtom.json";
		try {
			String content = Files.readString(Paths.get(srcpath));
			JsonObject json = JsonObjectUtilities.jsonObjectFromString(content);

			String transactionname = "dataset:DatasetCollectionSetCreationEvent";
			String criteria = "Administrator.StandardDataset";
			if(TransactionProcess.setFirstTransactionIntoActivityInfo(json, transactionname, criteria,false) ) {
				JsonObject response = TransactionProcess.processFromTransaction(json);
				JsonObjectUtilities.printResponse(response);
			} else {
				System.err.println("Prerequisite Transaction not found");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
