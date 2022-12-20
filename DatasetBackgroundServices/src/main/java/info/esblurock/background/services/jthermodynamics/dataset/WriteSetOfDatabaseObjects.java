package info.esblurock.background.services.jthermodynamics.dataset;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.FindDatasetCollections;
import info.esblurock.background.services.dataset.ManageDatasetDocumentLists;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;

public class WriteSetOfDatabaseObjects {
    static String indexID = "CatalogIDs";
    static String IDlabel = "IDs";

    public static JsonObject writeSetOfCatalogObjects(String classname, JsonObject info, JsonArray set) {
        List<String> datasetIDs = ManageDatasetDocumentLists.getCollectionIDs(classname, info);
        List<String> catalogIDs = getCatalogIDs(set);
        List<String> common = new ArrayList<String>(datasetIDs);
        common.retainAll(catalogIDs);
        List<String> union = new ArrayList<String>(datasetIDs);
        union.removeAll(common);
        union.addAll(catalogIDs);
        JsonObject deleteresponse = null;
        if(common.size() > 0) {
            deleteresponse = deleteDatasetCatalogObjects(common,classname,info);
        }
        return writeDatasetElements(union, set);
    }
    
    private static JsonObject writeDatasetElements(List<String> union, JsonArray set) {
        // TODO Auto-generated method stub
        return null;
    }

    private static void writeDatasetElements(JsonArray set, String classname, JsonObject info) {
        
    }


    /** Extract list of CatalogObjectKey from JsonArray of catalog objects
     * @param set The JsonArray of catalog objects
     * @return The list of CatalogObjectKey ids
     */
    private static List<String> getCatalogIDs(JsonArray set) {
        List<String> ids = new ArrayList<String>(set.size());
        for (int i = 0; i < set.size(); i++) {
            JsonObject catalog = set.get(i).getAsJsonObject();
            ids.add(i,catalog.get(ClassLabelConstants.CatalogObjectKey).getAsString());
        }
        return ids;
    }

    
    

}
