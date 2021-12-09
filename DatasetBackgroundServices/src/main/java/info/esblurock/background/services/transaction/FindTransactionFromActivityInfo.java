package info.esblurock.background.services.transaction;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

public enum FindTransactionFromActivityInfo {

	DatasetTransactionEventObject {

		@Override
		void fill(JsonObject info, JsonObject transaction) {
			JsonObject recordid = info.get(ClassLabelConstants.DatasetTransactionSpecificationForCollection)
					.getAsJsonObject();
			transaction.add(ClassLabelConstants.DatasetTransactionSpecificationForCollection, recordid);
			System.out.println("DatasetTransactionEventObject: \n" + JsonObjectUtilities.toString(recordid));
		}

	},
	DatasetCollectionManagementTransaction {

		@Override
		void fill(JsonObject info, JsonObject transaction) {
			JsonObject recordid = info.get(ClassLabelConstants.DatasetCollectionSetRecordIDInfo).getAsJsonObject();
			transaction.add(ClassLabelConstants.DatasetCollectionSetRecordIDInfo, recordid);
		}

	};

	abstract void fill(JsonObject info, JsonObject transaction);

	public static JsonObject findTransaction(String transactiontype, JsonObject info) {
		System.out.println("findTransaction: " + transactiontype);
		TransactionProcess process = TransactionProcess.valueOf(transactiontype.substring(8));
		String transactionobjectname = process.transactionObjectName();
		String name = transactionobjectname.substring(8);
		System.out.println("findTransaction: " + name);
		FindTransactionFromActivityInfo fill = FindTransactionFromActivityInfo.valueOf(name);
		JsonObject transaction = null;
		if (fill != null) {
			transaction = CreateDocumentTemplate.createTemplate(transactionobjectname);
			JsonObject shortdescr = transaction.get(ClassLabelConstants.ShortTransactionDescription).getAsJsonObject();
			shortdescr.addProperty(ClassLabelConstants.TransactionEventType, transactiontype);
			fill.fill(info, transaction);
		}
		System.out.println("findTransaction: " + JsonObjectUtilities.toString(transaction));
		return transaction;
	}

}
