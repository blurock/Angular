package info.esblurock.background.services.dataset;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ManageDatasetCatalogObjects;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;

public class ManageDatasetDocumentLists {
    static String indexID = "CatalogIDs";
    static String IDlabel = "IDs";

    public static ArrayList<String> getCollectionIDs(String classname, JsonObject recordid) {
        
        JsonObject firestoreid = FindDatasetCollections.findDatasetCollectionID(classname, recordid);
        firestoreid.addProperty(ClassLabelConstants.SimpleCatalogName, indexID);
        JsonObject response = ReadFirestoreInformation.readFirestoreCatalogObject(firestoreid);
        JsonArray IDarray = new JsonArray();
        if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
            JsonObject ids = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
            IDarray = ids.get(IDlabel).getAsJsonArray();
        } else {
            IDarray = new JsonArray();
        }
        ArrayList<String> IDs = new ArrayList<String>();
        for(int i = 0; i < IDarray.size(); i++){
            IDs.add(IDarray.get(i).getAsString());
        }
        
        return IDs;
    }
    
    public static String writeCollectionIDs(List<String> datasetIDs, String classname, JsonObject recordid) {
        JsonObject firestoreid = FindDatasetCollections.findDatasetCollectionID(classname, recordid);
        firestoreid.addProperty(ClassLabelConstants.SimpleCatalogName, indexID);
        JsonObject ids = new JsonObject();
        ids.add(IDlabel, ManageDatasetCatalogObjects.listOfStringsToJsonArray(datasetIDs));
        ids.add(ClassLabelConstants.FirestoreCatalogID, firestoreid);
        return WriteFirestoreCatalogObject.writeCatalogObject(ids);
    }

}
