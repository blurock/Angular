package info.esblurock.background.services.servicecollection;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.FirestoreBaseClass;
import info.esblurock.background.services.firestore.PropertyValueQueryPair;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.SetOfPropertyValueQueryPairs;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.service.rdfs.GenerateAndWriteRDFForObject;
import info.esblurock.background.services.transaction.FindTransactions;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.SubstituteJsonValues;

public enum ServiceCollectionFirestoreCatalogAccess {
	SubstituteAndWriteDatabasePerson {
		/*
		 * SubstituteAndWriteDatabasePerson
		 * 
		 * The process associated with the CreateDatabasePersonEvent transaction
		 * 
		 * <ul> <li> Generate a standard empty DatabasePerson catalog object <li>
		 * Substitute the minimal information provided <li> Update the owner,
		 * transactionID and makepublic fields <li> Generate and write RDFs <li> Write
		 * the object
		 * 
		 */
		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("SubstituteAndWriteDatabasePerson");
			Element body = MessageConstructor.isolateBody(document);
			JsonObject response = new JsonObject();
			JsonObject source = json.get(ClassLabelConstants.ActivityCatalogDatabasePersonCreation).getAsJsonObject();
			String classname = "dataset:DatabasePerson";
			String owner = json.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
			String transID = json.get(ClassLabelConstants.TransactionID).getAsString();
			String makepublic = source.get(ClassLabelConstants.MakePublicRead).getAsString();
			JsonObject catalog = BaseCatalogData.createStandardDatabaseObject(classname, owner, transID, makepublic);
			String identifier = catalog.get(AnnotationObjectsLabels.identifier).getAsString();
			SubstituteJsonValues.substituteJsonObject(catalog, source);
			catalog.addProperty(AnnotationObjectsLabels.identifier, identifier);
			String message = WriteFirestoreCatalogObject.writeCatalogObject(catalog);
			body.addElement("pre").addText(message);
			response = DatabaseServicesBase.standardServiceResponse(document,
					"Success: SubstituteAndWriteDatabasePerson", catalog);
			return response;
		}

	},
	FirestoreServiceWriteCatalogObject {

		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("FirestoreServiceWriteCatalogObject");
			Element body = MessageConstructor.isolateBody(document);
			JsonObject response = new JsonObject();
			JsonObject catalog = json.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			String message = WriteFirestoreCatalogObject.writeCatalogObject(catalog);
			body.addElement("pre").addText(message);
			response = DatabaseServicesBase.standardServiceResponse(document,
					"Sucess: FirestoreServiceWriteCatalogObject", null);
			return response;
		}

	},
	LabelLinkToFirestoreIDRDF {

		@Override
		public JsonObject process(JsonObject json) {
			String predicatename = json.get(ClassLabelConstants.RDFPredicate).getAsString();
			Document document = MessageConstructor.startDocument("LabelLinkToFirestoreIDRDF: " + predicatename);
			Element body = MessageConstructor.isolateBody(document);
			JsonObject setofprops = CreateDocumentTemplate.createTemplate("dataset:SetOfPropertyValueQueryPairs");
			JsonArray props = new JsonArray();
			JsonObject prop1 = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
			prop1.addProperty(ClassLabelConstants.DatabaseObjectType, ClassLabelConstants.RDFPredicate);
			prop1.addProperty(ClassLabelConstants.ShortStringKey, predicatename);
			props.add(prop1);
			setofprops.add(ClassLabelConstants.PropertyValueQueryPair, props);

			JsonObject firestoreid = FirestoreBaseClass.createEmptyFirestoreCatalogID();
			firestoreid.addProperty(ClassLabelConstants.DataCatalog, "rdfobjprimsubrecord");

			JsonObject response = ReadFirestoreInformation.readFirestoreCollection(setofprops, firestoreid);
			if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				MessageConstructor.combineBodyIntoDocument(document,
						response.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
				JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				JsonArray idlabellinks = new JsonArray();
				body.addElement("h3").addText("Labels");
				for (int i = 0; i < arr.size(); i++) {
					JsonObject rdf = arr.get(i).getAsJsonObject();
					JsonObject idlabellink = CreateDocumentTemplate.createTemplate("dataset:LabelFirestoreIDPair");
					JsonObject id = rdf.get(ClassLabelConstants.RDFJsonAsSubject).getAsJsonObject();
					String label = rdf.get(ClassLabelConstants.RDFObjectKey).getAsString();
					idlabellink.add(ClassLabelConstants.FirestoreCatalogID, id);
					idlabellink.addProperty(ClassLabelConstants.CatalogObjectKey, label);
					idlabellinks.add(idlabellink);
					body.addElement("div").addText(label);
				}
				JsonObject idlabellinkpairs = CreateDocumentTemplate
						.createTemplate("dataset:SetOfLabelFirestoreIDPairs");
				idlabellinkpairs.add(ClassLabelConstants.LabelFirestoreIDPair, idlabellinks);
				response = DatabaseServicesBase.standardServiceResponse(document, "Success: LabelLinkToFirestoreIDRDF",
						idlabellinkpairs);
			}
			return response;
		}

	},
	ReadCatalogObjects {

		@Override
		public JsonObject process(JsonObject json) {
			JsonObject setofprops = json.get(ClassLabelConstants.SetOfPropertyValueQueryPairs).getAsJsonObject();
			JsonObject firestoreid = json.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
			return ReadFirestoreInformation.readFirestoreCollection(setofprops, firestoreid);
		}

	},
	ReadSpecificCatalogObjectInDataset {
	    
	    @Override
        public JsonObject process(JsonObject json) {
	    String id = json.get(ClassLabelConstants.CatalogObjectKey).getAsString();
	    String classname = json.get(ClassLabelConstants.DatabaseObjectType).getAsString();
	    JsonObject datasetid = json.get(ClassLabelConstants.DatasetSpecificationForCollectionSet).getAsJsonObject();
	    
	    System.out.println("-----------------------------------------------------");
	    System.out.println(JsonObjectUtilities.toString(json));
        System.out.println("-----------------------------------------------------");
	    
        System.out.println("-----------------------------------------------------");
	    System.out.println("ID: " + id);
	    System.out.println("Classname: " + classname);
	    System.out.println("DatasetID:\n" + JsonObjectUtilities.toString(datasetid));
        System.out.println("-----------------------------------------------------");
        
        JsonObject response = ReadFirestoreInformation.readFromDatasetSpecificationForCollectionSet(classname, datasetid, id);
	    JsonObjectUtilities.printResponse(response);
	    
	    return response;
	    }
	},
	FindTransactionsOfType {

		@Override
		public JsonObject process(JsonObject json) {
			String type = json.get(ClassLabelConstants.TransactionEventType).getAsString();
			String keyword = json.get(ClassLabelConstants.TransactionKey).getAsString();
			JsonObject response = FindTransactions.findAndReadTransactionEventObjectByType(type, keyword);
			return response;
		}
	},
	FindTransactionChoicesOfTypeAndKey {

		@Override
		public JsonObject process(JsonObject json) {
			String type = json.get(ClassLabelConstants.TransactionEventType).getAsString();
			String keyword = json.get(ClassLabelConstants.TransactionKey).getAsString();
			JsonObject response = FindTransactions.findLabelFirestoreIDPairByType(type, keyword);
			return response;
		}

	},
	FindSpecificTransactionInDataset {
	    public JsonObject process(JsonObject json) {
	    JsonObject info = json.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
	    String type = json.get(ClassLabelConstants.TransactionEventType).getAsString();
	    String transactionID = json.get(ClassLabelConstants.TransactionID).getAsString();
	    System.out.println("FindSpecificTransactionInDataset: '" + type);
	    JsonObject response = FindTransactions.findSpecificDatasetTransaction(info, type, transactionID);
	    return response;
	}
	};

	public abstract JsonObject process(JsonObject json);
}
