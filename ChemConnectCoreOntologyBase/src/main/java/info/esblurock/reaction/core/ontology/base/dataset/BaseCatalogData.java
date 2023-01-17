package info.esblurock.reaction.core.ontology.base.dataset;

import java.util.UUID;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.GenericSimpleQueries;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class BaseCatalogData {

	public static void copyOwnerAndPriviledges(JsonObject original, JsonObject obj) {
		String owner = original.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
		obj.addProperty(ClassLabelConstants.CatalogObjectOwner, owner);
		String accessread = original.get(ClassLabelConstants.CatalogObjectAccessRead).getAsString();
		obj.addProperty(ClassLabelConstants.CatalogObjectAccessRead, accessread);
		String accessmodify = original.get(ClassLabelConstants.CatalogObjectAccessModify).getAsString();
		obj.addProperty(ClassLabelConstants.CatalogObjectAccessModify, accessmodify );
	}

	public static void insertCatalogObjectKey(JsonObject json, String type) {
	    String namesrc = DatasetOntologyParseBase.getAnnotationObject(type, AnnotationObjectsLabels.documentNameSource);
		String id = UUID.randomUUID().toString();
		if(namesrc != null) {
		    if(namesrc.length() > 0) {
		    String identifier = DatasetOntologyParseBase.getAnnotationObject(namesrc, AnnotationObjectsLabels.identifier);
		    String name = JsonObjectUtilities.getValueUsingIdentifier(json,identifier);
		    if(name != null) {
		        id = name.replace('/','x').replace('(','y').replace(')','z').replace('=', 'e');
		    }
		    }
		}
		json.addProperty(ClassLabelConstants.CatalogObjectKey,id);
	}
	public static void copyTransactionID(JsonObject original, JsonObject obj) {
		String transaction = original.get(ClassLabelConstants.TransactionID).getAsString();
		obj.addProperty(ClassLabelConstants.TransactionID, transaction);
	}
	public static String generateUniqueUUID() {
		return UUID.randomUUID().toString();
	}
	
	public static void insertStandardBaseInformation(JsonObject obj, String owner, 
			String transactionID, String publicB) {
		insertStandardBaseInformation(obj,owner,transactionID,publicB,true);
	}
	
	public static void insertStandardBaseInformation(JsonObject obj, String owner, 
			String transactionID, String publicB, boolean computeaddress) {
		obj.addProperty(ClassLabelConstants.CatalogObjectOwner, owner);
		obj.addProperty(ClassLabelConstants.CatalogObjectAccessModify, owner );
		if(publicB == null) {
			publicB = "false";
		}
		if(publicB.equals("true")) {
			obj.addProperty(ClassLabelConstants.CatalogObjectAccessRead, "Public");			
		} else {
			obj.addProperty(ClassLabelConstants.CatalogObjectAccessRead, owner);
		}
		obj.addProperty(ClassLabelConstants.TransactionID, transactionID);
        String type = GenericSimpleQueries.classFromIdentifier(obj.get(AnnotationObjectsLabels.identifier).getAsString());
		insertCatalogObjectKey(obj,type);
		obj.addProperty(ClassLabelConstants.DatabaseObjectType, type);
		if(computeaddress) {
			insertFirestoreAddress(obj);
		}
	}
	
	public static JsonObject insertFirestoreAddress(JsonObject obj) {
		JsonObject address = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(obj);
		address.remove(AnnotationObjectsLabels.identifier);
		obj.add(ClassLabelConstants.FirestoreCatalogID, address);
		return address;
	}
	
	public static JsonObject createStandardDatabaseObject(String classname, String owner, String transactionID, String publicB) {
		JsonObject obj = CreateDocumentTemplate.createTemplate(classname);
		insertStandardBaseInformation(obj,owner,transactionID,publicB,false);
		return obj;
	}
	
}
