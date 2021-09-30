package info.esblurock.background.services.transaction;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class FindTransactions {

	public static JsonObject findTransactionDescriptionByType(String type) {
		JsonObject json = CreateDocumentTemplate.createTemplate("dataset:RDFSubjectObjectAsRecord");
		JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(json);
		JsonObject setofprops = CreateDocumentTemplate.createTemplate("dataset:SetOfPropertyValueQueryPairs");
		JsonArray props = new JsonArray();
		JsonObject prop1 = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
		prop1.addProperty(ClassLabelConstants.DatabaseObjectType, ClassLabelConstants.RDFPredicate);
		prop1.addProperty(ClassLabelConstants.ShortStringKey, "dataset:RDFShortTransactionDescription");
		JsonObject prop2 = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
		String key = "dataset:rdfjsonasobject.prov:activity";
		prop2.addProperty(ClassLabelConstants.DatabaseObjectType, key);
		prop2.addProperty(ClassLabelConstants.ShortStringKey, type);
		props.add(prop2);
		
		setofprops.add(ClassLabelConstants.PropertyValueQueryPair, props);
		JsonObject response = ReadFirestoreInformation.readFirestoreCollection(setofprops, firestoreid);
		return response;
	}
}
