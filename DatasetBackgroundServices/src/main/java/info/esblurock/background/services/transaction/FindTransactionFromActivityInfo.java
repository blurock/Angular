package info.esblurock.background.services.transaction;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;

public enum FindTransactionFromActivityInfo {

	DatasetTransactionEventObject {

		@Override
		void fill(JsonObject info, JsonObject transaction) {
			JsonObject recordid = info.get(ClassLabelConstants.DatasetTransactionSpecificationForCollection)
					.getAsJsonObject();
			transaction.add(ClassLabelConstants.DatasetTransactionSpecificationForCollection, recordid);
            BaseCatalogData.insertFirestoreAddress(transaction);
		}

		@Override
		JsonObject createSetOfProperties(JsonObject info) {
			JsonObject recordid = info.get(ClassLabelConstants.DatasetTransactionSpecificationForCollection)
					.getAsJsonObject();
			String version = recordid.get(ClassLabelConstants.DatasetVersion).getAsString();
			JsonObject setofprops = CreateDocumentTemplate.createTemplate("dataset:SetOfPropertyValueQueryPairs");
			JsonArray props = new JsonArray();
			setofprops.add(ClassLabelConstants.PropertyValueQueryPair, props);
			JsonObject prop1 = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
			prop1.addProperty(ClassLabelConstants.DatabaseObjectType, "dataset:datasettransactionspecification.dataset:datasetversion");
			prop1.addProperty(ClassLabelConstants.ShortStringKey, version);
			props.add(prop1);
			
			return setofprops;
		}
		

	},
	DatasetCollectionManagementTransaction {

		@Override
		void fill(JsonObject info, JsonObject transaction) {
			JsonObject recordid = info.get(ClassLabelConstants.DatasetCollectionSetRecordIDInfo).getAsJsonObject();
			transaction.add(ClassLabelConstants.DatasetCollectionSetRecordIDInfo, recordid);
		}

		@Override
		JsonObject createSetOfProperties(JsonObject info) {
			return null;
		}

	};

	abstract void fill(JsonObject info, JsonObject transaction);
	abstract JsonObject createSetOfProperties(JsonObject info);

	public static JsonObject findTransaction(String transactiontype, JsonObject info) {
	    JsonObject transaction = null;
	    String transactionobjectname = "";
	    String name = "";
	    
		TransactionProcess process = TransactionProcess.valueOf(transactiontype.substring(8));
		transactionobjectname = process.transactionObjectName();
		name = transactionobjectname.substring(8);
		FindTransactionFromActivityInfo fill = FindTransactionFromActivityInfo.valueOf(name);
		
		if (fill != null) {
			transaction = CreateDocumentTemplate.createTemplate(transactionobjectname);
			JsonObject shortdescr = transaction.get(ClassLabelConstants.ShortTransactionDescription).getAsJsonObject();
			shortdescr.addProperty(ClassLabelConstants.TransactionEventType, transactiontype);
			fill.fill(info, transaction);
		}
		return transaction;
	}
	public static JsonObject determineSetOfProps(String transactiontype, JsonObject info) {
		TransactionProcess process = TransactionProcess.valueOf(transactiontype.substring(8));
		String transactionobjectname = process.transactionObjectName();
		String name = transactionobjectname.substring(8);
		FindTransactionFromActivityInfo fill = FindTransactionFromActivityInfo.valueOf(name);
		JsonObject setofprops = null;
		if(fill != null) {
			setofprops = fill.createSetOfProperties(info);
		}
		return setofprops;
	}

}
