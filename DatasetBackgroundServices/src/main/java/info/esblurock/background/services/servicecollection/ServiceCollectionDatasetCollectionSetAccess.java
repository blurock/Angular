package info.esblurock.background.services.servicecollection;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.DatasetCollectionIDManagement;
import info.esblurock.background.services.dataset.DatasetCollectionManagement;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public enum ServiceCollectionDatasetCollectionSetAccess {

	GetListOfDatasetCollectionIDsSet {

		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("GetListOfDatasetCollectionIDsSet");
			Element body = MessageConstructor.isolateBody(document);
			JsonObject collrecordid = json.get(ClassLabelConstants.DatasetCollectionSetRecordIDInfo).getAsJsonObject();
			String maintainer = collrecordid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			String collection = collrecordid.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
			body.addElement("div").addText("Find Collection " + collection + " from " + maintainer);
			JsonObject collids = DatasetCollectionManagement.getDatasetCollectionSets(collrecordid);
			JsonObject response = null;
			if (collids != null) {
				response = DatabaseServicesBase.standardServiceResponse(document, "Success read ", collids);
			} else {
				response = DatabaseServicesBase.standardErrorResponse(document, "Error: in reading ", null);
			}
			/*
			 * String maintainer =
			 * json.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			 * JsonObject address =
			 * DatasetCollectionIDManagement.getCollectionOfDatasetCollectionIDsSetAddress(
			 * maintainer);
			 * body.addElement("pre").addText(JsonObjectUtilities.toString(address));
			 * JsonObject setofprops = null;
			 * if(json.get(ClassLabelConstants.DatasetCollectionsSetLabel) != null) {
			 * setofprops =
			 * CreateDocumentTemplate.createTemplate("dataset:SetOfPropertyValueQueryPairs")
			 * ; String label =
			 * json.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
			 * JsonArray props = new JsonArray(); JsonObject prop1 =
			 * CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
			 * prop1.addProperty(ClassLabelConstants.DatabaseObjectType,
			 * ClassLabelConstants.DatasetCollectionsSetLabel);
			 * prop1.addProperty(ClassLabelConstants.ShortStringKey, label);
			 * props.add(prop1); setofprops.add(ClassLabelConstants.PropertyValueQueryPair,
			 * props); } JsonObject response =
			 * ReadFirestoreInformation.readFirestoreCollection(setofprops, address);
			 * if(response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()
			 * ) { String docS =
			 * response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
			 * MessageConstructor.combineBodyIntoDocument(document, docS); JsonObject
			 * catalog =
			 * response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			 * JsonArray arr =
			 * catalog.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
			 * response = DatabaseServicesBase.standardServiceResponse(document,
			 * "Success read " + arr.size() + " sets", catalog); } else { response =
			 * DatabaseServicesBase.standardErrorResponse(document,
			 * "Error: in reading sets", null); }
			 */
			return response;
		}
	},
	ReadInDatasetWithDatasetCollection {

		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("ReadInDatasetWithDatasetCollection");
			Element body = MessageConstructor.isolateBody(document);
			JsonObject idsset = json.get(ClassLabelConstants.ChemConnectDatasetCollectionIDsSet).getAsJsonObject();
			String classname = json.get(ClassLabelConstants.DatasetCollectionObjectType).getAsString();
			String label = idsset.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
			String maintainer = idsset.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			body.addElement("div").addText("Dataset  : " + label);
			body.addElement("div").addText("Maintainer: " + maintainer);
			body.addElement("div").addText("Classname: " + classname);
			String identifier = DatasetOntologyParseBase.getIDFromAnnotation(classname);
			JsonObject response = null;
			if (identifier != null) {
				if (idsset.get(identifier) != null) {
					JsonObject collectioninfo = idsset.get(identifier).getAsJsonObject();
					collectioninfo.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, label);
					JsonObject collectionid = DatasetCollectionIDManagement.firebaseIDOfCollection(classname,
							collectioninfo);
					JsonObject criteria = null;
					if (json.get(ClassLabelConstants.SetOfPropertyValueQueryPairs) != null) {
						criteria = json.get(ClassLabelConstants.SetOfPropertyValueQueryPairs).getAsJsonObject();
					}
					response = ReadFirestoreInformation.readFirestoreCollection(criteria, collectionid);
				} else {
					response = DatabaseServicesBase.standardErrorResponse(document,
							classname + "(" + identifier + ")  not is dataset collection: " + label, null);
				}
			} else {
				response = DatabaseServicesBase.standardErrorResponse(document,
						"Error: Identifer for " + classname + " not found", null);
			}
			return response;
		}

	},
	ReadInDatasetWithDatasetCollectionLabel {
		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("ReadInDatasetWithDatasetCollectionLabel");
			JsonObject response = GetListOfDatasetCollectionIDsSet.process(json);
			if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonObject collectionids = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				json.add(ClassLabelConstants.ChemConnectDatasetCollectionIDsSet, collectionids);
				JsonObject readresponse = ReadInDatasetWithDatasetCollection.process(json);
				if (readresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
					String docS = readresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
					JsonArray objects = readresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
					MessageConstructor.combineBodyIntoDocument(document, docS);
					response = DatabaseServicesBase.standardServiceResponse(document, "Succcesful Read of objects",
							objects);
				} else {
					String docS = readresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
					MessageConstructor.combineBodyIntoDocument(document, docS);
					Element body = MessageConstructor.isolateBody(document);
					body.addElement("div").addText("ReadInDatasetWithDatasetCollection Failed with:");
					body.addElement("pre").addText(JsonObjectUtilities.toString(json));
					response = DatabaseServicesBase.standardErrorResponse(document, "Read in Collection fail", null);
				}
			}
			return response;
		}
	};

	public abstract JsonObject process(JsonObject json);

}
