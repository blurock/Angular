package info.esblurock.background.services.dataset;

import java.util.ArrayList;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

public class DatasetCollectionCreateSystemCollection {
    
    public static String systemhierarchy = "systemthermodynamics";
    
    public static JsonObject process(JsonObject event, JsonObject info) {
        JsonObject response = null;
        Document document = MessageConstructor.startDocument("Dataset Collection Set Creation Event");
        Element body = MessageConstructor.isolateBody(document);
        Element successtitleelement = body.addElement("h3");
        Element successdivelement = body.addElement("div");
        String transactionID = event.get(ClassLabelConstants.TransactionID).getAsString();
     
        String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
        String dataset = info.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
        String title = info.get(ClassLabelConstants.DescriptionTitle).getAsString();
        String systemdataset = info.get(ClassLabelConstants.SystemDatasetCollectionsSetLabel).getAsString();
        String version = info.get(ClassLabelConstants.DatasetVersion).getAsString();
        
        body.addElement("div").addText("Maintainer           : " + maintainer);
        body.addElement("div").addText("Collection Name      : " + dataset);
        
        JsonObject collectionsetidinfo = new JsonObject();
        collectionsetidinfo.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
        collectionsetidinfo.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, dataset);
        boolean success = true;
        JsonObject datasetcollectionset = DatasetCollectionManagement.getDatasetCollectionSets(collectionsetidinfo);
        body.addElement("pre").addText(JsonObjectUtilities.toString(datasetcollectionset));
        JsonObject transactionfirestore = BaseCatalogData.insertFirestoreAddress(event);
        if(datasetcollectionset != null) {
            JsonObject systemcollectionset = CreateDocumentTemplate.createTemplate("dataset:ThermodynamicsSystemCollectionIDsSet");
            systemcollectionset.addProperty(ClassLabelConstants.CatalogSystemDatasetMaintainer, systemhierarchy);
            systemcollectionset.addProperty(ClassLabelConstants.SystemDatasetCollectionsSetLabel, systemdataset);
            systemcollectionset.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
            systemcollectionset.addProperty(ClassLabelConstants.DatasetCollectionsSetLabel, dataset);
            systemcollectionset.addProperty(ClassLabelConstants.CatalogObjectKey, dataset);
            systemcollectionset.addProperty(ClassLabelConstants.DescriptionAbstract, title);
            systemcollectionset.addProperty(ClassLabelConstants.DatasetCollectionType, "dataset:ThermodynamicsSystemCollectionIDsSet");
            systemcollectionset.add(ClassLabelConstants.FirestoreCatalogIDForTransaction,transactionfirestore);
            BaseCatalogData.insertStandardBaseInformation(systemcollectionset, systemhierarchy, transactionID, title);
            BaseCatalogData.insertFirestoreAddress(systemcollectionset);
            
            success = copyDatasetElements(systemcollectionset, transactionID,transactionfirestore,version, datasetcollectionset, systemdataset, ClassLabelConstants.JThermodynamics2DSubstructureThermodynamics,document);
            success = copyDatasetElements(systemcollectionset, transactionID,transactionfirestore,version,datasetcollectionset, systemdataset, ClassLabelConstants.ThermodynamicBensonRuleDefinition,document);
            success = copyDatasetElements(systemcollectionset, transactionID,transactionfirestore,version,datasetcollectionset, systemdataset, ClassLabelConstants.JThermodynamicsDisassociationEnergyOfStructure,document);
            success = copyDatasetElements(systemcollectionset, transactionID,transactionfirestore,version,datasetcollectionset, systemdataset, ClassLabelConstants.JThermodynamicsMetaAtomDefinition,document);
            success = copyDatasetElements(systemcollectionset, transactionID,transactionfirestore,version,datasetcollectionset, systemdataset, ClassLabelConstants.JThermodynamicsSymmetryStructureDefinition,document);
            success = copyDatasetElements(systemcollectionset, transactionID,transactionfirestore,version,datasetcollectionset, systemdataset, ClassLabelConstants.JThermodynamicsVibrationalStructure,document);
            
            
            JsonArray arr = new JsonArray();
            arr.add(systemcollectionset);
            try {
                WriteFirestoreCatalogObject.writeCatalogObjectWithException(systemcollectionset);
                if(success) {
                    successtitleelement.addText("Successful Creation of System Database");
                    successdivelement.addText("All components were transferred");
                    response = DatabaseServicesBase.standardServiceResponse(document, "Success, all data transfered", arr);
                } else {
                    successtitleelement.addText("Some (non-fatal) errors found");
                    successdivelement.addText("Examine logs for details, some elements may not have been transferred");
                    response = DatabaseServicesBase.standardServiceResponse(document, "Some (non-fatal) errors found, not all objects transferred", arr);
                }
            } catch (Exception e) {
                body.addElement("div").addText("DatasetCollectionID object  not written: ");
                response = DatabaseServicesBase.standardErrorResponse(document, "Dataset Collection not found", arr);
            }
            

        } else {
            response = DatabaseServicesBase.standardErrorResponse(document, "Dataset Collection not found", null);
        }
        return response;
    }

    private static boolean copyDatasetElements(JsonObject systemcollectionset, String transactionid, JsonObject transactionfirestore, String version, JsonObject datasetcollectionset, String systemdataset,
            String setlabel, Document document) {
       boolean success = true;
       
       Element body = MessageConstructor.isolateBody(document);
       if(datasetcollectionset.get(setlabel) != null) {
           body.addElement("div").addText("Dataset specification found: " + setlabel);
           JsonObject specification = datasetcollectionset.get(setlabel).getAsJsonObject();
           String classname = OntologyUtilityRoutines.typesFromIdentifier(setlabel);
           JsonObject colresponse = FindDatasetCollections.readInDatasetCollection(classname, specification);
           MessageConstructor.combineBodyIntoDocument(document, colresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
           if(colresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
               JsonArray array = colresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
               body.addElement("div").addText("Set of Objects " + array.size() + " found ");
               JsonObject newspecification = generateNewSpecification(version,systemdataset,systemhierarchy);
               systemcollectionset.add(setlabel, newspecification);
               body.addElement("pre").addText(JsonObjectUtilities.toString(newspecification));
               
               ArrayList<String> ids = new ArrayList<String>();
               for(JsonElement element : array ) {
                   JsonObject catalog = element.getAsJsonObject();
                   
                   
                   catalog.add(ClassLabelConstants.DatasetTransactionSpecificationForCollection, newspecification);
                   catalog.addProperty(ClassLabelConstants.CatalogObjectOwner, systemhierarchy);
                   catalog.add(ClassLabelConstants.FirestoreCatalogIDForTransaction, transactionfirestore);
                   catalog.addProperty(ClassLabelConstants.TransactionID, transactionid);
                   catalog.addProperty(ClassLabelConstants.CatalogObjectAccessRead, "Public");
                   catalog.addProperty(ClassLabelConstants.CatalogObjectAccessModify, systemhierarchy);
                   BaseCatalogData.insertFirestoreAddress(catalog);
                   try {
                    WriteFirestoreCatalogObject.writeCatalogObjectWithException(catalog);
                    ids.add(catalog.get(ClassLabelConstants.CatalogObjectKey).getAsString());
                } catch (Exception e) {
                    body.addElement("div").addText("Catalog Object not written: " + catalog.get(ClassLabelConstants.CatalogObjectKey).getAsString());
                    body.addElement("div").addText(e.getMessage());
                }
               }
               JsonObject firestore = DatasetCollectionIDManagement.firebaseIDOfCollection(classname, newspecification);
               ManageDatasetDocumentLists.writeCollectionIDs(ids,firestore);
               
           } else {
               success = false;
               body.addElement("div").addText(classname + " objects not found so not written to system");
           }
           
           
       } else {
           body.addElement("div").addText("Dataset specification not found: " + setlabel);
           body.addElement("pre").addText(JsonObjectUtilities.toString(datasetcollectionset));
           body.addElement("div").addText("Dataset not transferred");
           success = false;
       }
       
       
       return success; 
    }
    
    private static JsonObject generateNewSpecification(String version, String systemdataset, String systemhierarchy) {
        JsonObject newspec = new JsonObject();
        newspec.addProperty(ClassLabelConstants.CatalogDataObjectStatus, "dataset:CatalogObjectStatusCurrent");
        newspec.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, systemhierarchy);
        newspec.addProperty(ClassLabelConstants.DatasetVersion, version);
        newspec.addProperty(ClassLabelConstants.DatasetName, systemdataset);
        return newspec;
    }
    

}
