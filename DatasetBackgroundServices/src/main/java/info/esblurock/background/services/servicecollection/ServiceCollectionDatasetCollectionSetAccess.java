package info.esblurock.background.services.servicecollection;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.DatasetCollectionIDManagement;
import info.esblurock.background.services.dataset.DatasetCollectionManagement;
import info.esblurock.background.services.dataset.FindDatasetCollections;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

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
					
					String catalogtype = OntologyUtilityRoutines.exactlyOnePropertySingle(classname, "dcat:catalog");
					
					JsonObject collectionid = DatasetCollectionIDManagement.firebaseIDOfCollection(catalogtype,
							collectioninfo);
					JsonObject criteria = null;
					if(json.get(ClassLabelConstants.SetOfPropertyValueQueryPairs) != null) {
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

	}, ReadInDatasetWithDatasetCollectionLabel {
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
				    response = readresponse;
				}
			}
			return response;
		}
	}, FindAllDatasetCollectionSets {

        @Override
        public JsonObject process(JsonObject json) {
            return FindDatasetCollections.findAllDatasetCollectionSets(json);
        }
	    
	};

	public abstract JsonObject process(JsonObject json);

}
