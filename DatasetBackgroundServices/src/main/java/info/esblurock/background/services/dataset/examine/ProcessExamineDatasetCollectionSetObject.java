package info.esblurock.background.services.dataset.examine;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.DatasetCollectionIDManagement;
import info.esblurock.background.services.dataset.DatasetCollectionManagement;
import info.esblurock.background.services.dataset.ReadInDatasetWithDatasetCollectionProcess;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CompoundObjectDimensionInformation;
import info.esblurock.reaction.core.ontology.base.dataset.CompoundObjectDimensionSet;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.dataset.ParseCompoundObject;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class ProcessExamineDatasetCollectionSetObject {
    
     /** 
      * 
     * @param info 
     * @return The response with the array of summary objects
     * 
     * info has: 
     * <ul>
     * <li> DatasetCollectionSetRecordIDInfo The specification for the dataset collection set
     * <ul>
     * <li> DatasetCollectionsSetLabel The label of the collection set
     * <li> CatalogDataObjectMaintainer The maintainer of the collection set
     * </ul>
     * <li> DatasetCollectionObjectType The specific classname of the dataset to convert
     * </ul>
     * 
     */
    public static JsonObject process(JsonObject info) {
        JsonObject response = null;
        Document document = MessageConstructor.startDocument("ProcessExamineDatasetCollectionSetObject");
        Element body = MessageConstructor.isolateBody(document);
        JsonObject recordid = info.get(ClassLabelConstants.DatasetCollectionSetRecordIDInfo).getAsJsonObject();
        String dataset = recordid.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
        String maintainer = recordid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
        String objecttype = info.get(ClassLabelConstants.ThermodynamicDatasetCollectionType).getAsString();
        body.addElement("div").addText("Dataset  : " + dataset);
        body.addElement("div").addText("Maintainer: " + maintainer);
        body.addElement("div").addText("Object Type: " + objecttype);
        
        CompoundObjectDimensionSet set = new CompoundObjectDimensionSet();
        ParseCompoundObject.compoundObjectTypeObjects(objecttype, "<http://www.w3.org/ns/dcat#catalog>", set);
        if(set.size() > 0) {
            CompoundObjectDimensionInformation typeinfo = set.get(0);
            String classname = typeinfo.getClassname();
            body.addElement("div").addText("Classname: " + classname);
            response = ReadInDatasetWithDatasetCollectionProcess.process(maintainer, dataset, classname, null, document);
            MessageConstructor.combineBodyIntoDocument(document, response.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
            JsonObject summary = CreateDocumentTemplate.createTemplate("dataset:DatasetObjectSummaryTable");
            DataObjectSummary process = DataObjectSummary.valueOf(classname.substring(8)); 
            JsonArray descriptionkey = process.objectNames();
            JsonArray searchkey = process.searchObjectNames();
            summary.add(ClassLabelConstants.SummaryTableSearchKey,searchkey);
            summary.add(ClassLabelConstants.SummaryTableDescriptionKey,descriptionkey);
            
            JsonArray searchvalues = new JsonArray();
            JsonArray descriptionvalues = new JsonArray();
            summary.add(ClassLabelConstants.DatasetObjectSummaryTableDescriptors, descriptionvalues);
            summary.add(ClassLabelConstants.DatasetObjectSummaryTableSearchTerms, searchvalues);
            if(response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
                JsonArray dataobjects = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
                
                Element lst = body.addElement("ul");
                
                JsonArray summaryelements = new JsonArray();
                for(JsonElement ele: dataobjects) {
                    JsonObject dataobject = (JsonObject) ele;
                    lst.addElement("li").setText(dataobject.get(ClassLabelConstants.CatalogObjectKey).getAsString());
                    JsonObject descriptors = DataObjectSummary.createDescriptorSummary(classname,dataobject, info);
                    JsonObject searchterms = DataObjectSummary.createSearchSummary(classname,dataobject, info);
                    searchvalues.add(searchterms);
                    descriptionvalues.add(descriptors);
                    }
                String text = "Successful read of " +  summaryelements.size() + " " +  classname + " objects";
                response = DatabaseServicesBase.standardServiceResponse(document, text, summary);
            } else {
                response = DatabaseServicesBase.standardErrorResponse(document,
                        "Error: Collection Set not found (or could not be read)",
                        null);
            }
        } else {
            response = DatabaseServicesBase.standardErrorResponse(document,
                "Error: Object not defined in collection set IDs",
                null);
        }
        return response;
    }

}
