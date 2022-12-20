package info.esblurock.background.services.dataset;

import java.util.ArrayList;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;

public class ManageDatasetDocumentLists {

    public static ArrayList<String> getCollectionIDs(String classname, JsonObject info) {
        
        JsonObject recordid = info.get(ClassLabelConstants.DatasetSpecificationForCollectionSet)
                .getAsJsonObject();
        JsonObject firestoreid = FindDatasetCollections.findDatasetCollectionID(classname, recordid);
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

}
