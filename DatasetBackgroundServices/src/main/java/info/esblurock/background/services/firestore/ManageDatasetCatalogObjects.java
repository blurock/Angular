package info.esblurock.background.services.firestore;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class ManageDatasetCatalogObjects extends DeleteCatalogDataObject {
    
    public static JsonObject deleteDatasetCatalogObjects(List<String> ids, JsonObject info) {
       JsonObject sourcecollection = info.get(ClassLabelConstants.DatasetSpecificationForCollectionSet)
                .getAsJsonObject()
        String collection = sourcecollection.get(ClassLabelConstants.DataCatalog).getAsString();
        return null;
    }
    
    public static createDeletedCollectionFirestoreID(JsonObject sourcecollection) {
        JsonObject src = sourcecollection.deepCopy();
        String collection = src.get(ClassLabelConstants.DataCatalog).getAsString();
        JsonObject pairaddress = src.get(ClassLabelConstants.CollectionDocumentIDPairAddress).getAsJsonObject();
        JsonArray pairs = pairaddress.get(ClassLabelConstants.CollectionDocumentIDPair).getAsJsonArray();
        int count = pairs.size();
        JsonObject pair = new JsonObject();
        pair.addProperty(ClassLabelConstants.DatasetCollectionID, collection);
        pair.addProperty(ClassLabelConstants., collection);
        
        return src;
    }

    /** Move (and/or delete) catalog objects from collection
     * 
     * @param ids The set of ids of the catalog objects to move
     * @param sourcecollection The dataset collection to move from (FirestoreCatalogID)
     * @param destcollection The dataset collection to move to (FirestoreCatalogID)
     * @param deletesrc true if the source is to be deleted.
     * @return the response of the action
     * 
     * The definition of 'deleting' a catalog object is actually delete it from the collection and move a copy of the deleted 
     * catalog objects to another directory. Moving the catalog objects to another directory also involves deleting the 
     * catalog object from the source collection.
     * 
     * This routine can also be used to copy a catalog objects to another directory (for example copying a collection for a user).
     * 
     * This routine is used using FirestoreCatalogID because the source and destination have alread been established by calling routines.
     * 
     * 
     */
    public static JsonObject movecpyCatalogObjectsTransaction(List<String> ids, JsonObject sourcecollection, JsonObject destcollection, boolean deletesrc) {
        JsonObject response = null;
        Document document = MessageConstructor.startDocument("Move Set of Catalog Objects");
        Element body = MessageConstructor.isolateBody(document);
        
       getFirestoreID();
       Type type = new TypeToken<HashMap<String, Object>>() {
       }.getType();
       Element div = body.addElement("div");
       if(deletesrc) {
           div.addElement("h2","Move and delete Source");
       } else {
           div.addElement("h2","Move keeping Source");
       }
       div.addElement("h3", "Move From");
       div.addElement("pre",JsonObjectUtilities.toString(sourcecollection));
       div.addElement("h3", "Move To");
       div.addElement("pre",JsonObjectUtilities.toString(destcollection));
       div.addElement("h3", "Element IDs to move");
       Element lst = div.addElement("ul");
       JsonArray destarr = new JsonArray();
       db.runTransaction(
                transaction -> {
                    for (int i = 0; i < ids.size(); i++) {
                        String id = ids.get(i);
                        body.addElement("li",id);
                        JsonObject source = buildNewFirestore(sourcecollection, id);
                        JsonObject destination = buildNewFirestore(destcollection,id);
                        DocumentReference docrefsource = SetUpDocumentReference.setup(db, source);
                        DocumentSnapshot sourcesnap = transaction.get(docrefsource).get();
                        Map<String,Object> srcfiremap = sourcesnap.getData();
                        String srcString = new Gson().toJson(srcfiremap);
                        JsonObject srccatalog = JsonObjectUtilities.jsonObjectFromString(srcString);
                        JsonObject destcatalog = srccatalog.deepCopy();
                        destcatalog.add(ClassLabelConstants.FirestoreCatalogID,destination);
                        if(deletesrc) {
                            transaction.delete(docrefsource);
                        }
                        DocumentReference docrefdest = SetUpDocumentReference.setup(db, destination);
                        Map<String, Object> destmapObj = new Gson().fromJson(destcatalog, type);
                        transaction.set(docrefdest,destmapObj);
                    }
                  return null;
                });
            String message = "Moved " + destarr.size() + " Catalog objects";
            response = DatabaseServicesBase.standardServiceResponse(document, message, destarr);
            return response;
        }
    
    private static JsonObject buildNewFirestore(JsonObject collection, String ID) {
        JsonObject newcollection = collection.deepCopy();
        newcollection.addProperty(ClassLabelConstants.SimpleCatalogName, ID);
        return newcollection;
    }
    

}
