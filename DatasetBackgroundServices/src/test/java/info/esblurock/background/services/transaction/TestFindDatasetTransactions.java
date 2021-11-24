package info.esblurock.background.services.transaction;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestFindDatasetTransactions {

	@Test
	public void test() {
		
		JsonObject recordid = CreateDocumentTemplate.createTemplate("dataset:DatasetTransactionSpecificationForCollection");
		String datasetname = "Standard";
		String datasetversion = "1.0";
		String maintainer = "Administrator";
		String series = "disassociationEnergyAlkanes";
		String eventtype = "dataset:PartiionSetWithinRepositoryFile";
		recordid.addProperty(ClassLabelConstants.DatasetName, datasetname);
		recordid.addProperty(ClassLabelConstants.DatasetVersion, datasetversion);
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		recordid.addProperty(ClassLabelConstants.CatalogObjectUniqueGenericLabel, series);
		
		JsonObject json = new JsonObject();
		json.add(ClassLabelConstants.ActivityInformationRecord, recordid);
		//JsonObject transaction = FindTransactions.findDatasetTransaction(recordid,type,false);
		TransactionProcess.fillInDatasetPrerequisites(eventtype, json);
		System.out.println(JsonObjectUtilities.toString(json));
	}

}
