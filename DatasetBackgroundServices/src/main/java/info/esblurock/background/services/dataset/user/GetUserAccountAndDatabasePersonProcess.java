package info.esblurock.background.services.dataset.user;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class GetUserAccountAndDatabasePersonProcess {

    public static JsonObject get(JsonObject json) {
        Document document = MessageConstructor.startDocument("readFirestoreCollection");
        Element body = MessageConstructor.isolateBody(document);
        
        JsonObject response = new JsonObject();
        String uid = json.get(ClassLabelConstants.UID).getAsString();
        String classname = "dataset:NewUserAccount";
        body.addElement("div").addText("Read in Account: '" + uid + "'");

        JsonObject empty = CreateDocumentTemplate.createTemplate(classname);
        JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(empty);
        firestoreid.addProperty(ClassLabelConstants.SimpleCatalogName, uid);
        System.out.println("GetUserAccountAndDatabasePersonProcess: " + JsonObjectUtilities.toString(firestoreid));
        JsonObject pairresponse = ReadFirestoreInformation.readFirestoreCollection(null, firestoreid);
        if(pairresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
            System.out.println("NewUserAccount found");
            JsonArray pairarr = pairresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
            JsonObject pair = pairarr.get(0).getAsJsonObject();
            JsonObject useraccountid = pair.get(ClassLabelConstants.UserAccountObjectID).getAsJsonObject();
            JsonObject personid = pair.get(ClassLabelConstants.DatabasePersonObjectID).getAsJsonObject();
            JsonObject useraccountresponse = ReadFirestoreInformation.readFirestoreCollection(null, useraccountid);
            if(useraccountresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
                System.out.println("DatabasePerson found");
                JsonArray useraccountarr = useraccountresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
                JsonObject useraccount = useraccountarr.get(0).getAsJsonObject();
                MessageConstructor.combineBodyIntoDocument(document, useraccountresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
                
                JsonObject personresponse = ReadFirestoreInformation.readFirestoreCollection(null, personid);
                if(personresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
                    System.out.println("User Account found");
                    JsonArray personarr = personresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
                    JsonObject person = personarr.get(0).getAsJsonObject();
                    MessageConstructor.combineBodyIntoDocument(document, personresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
                    
                    JsonObject catalog = CreateDocumentTemplate.createTemplate("dataset:UserAccountDatabasePersonPair");
                    String transactionID = pair.get(ClassLabelConstants.TransactionID).getAsString();
                    BaseCatalogData.insertStandardBaseInformation(catalog, uid, transactionID, "false", false);
                    
                    catalog.add(ClassLabelConstants.UserAccount, useraccount);
                    catalog.add(ClassLabelConstants.DatabasePerson, person);
                    
                    JsonArray arr = new JsonArray();
                    arr.add(catalog);
                    String title = "Success in reading account: " + uid;
                    System.out.println("Success in User Account");
                    response = DatabaseServicesBase.standardServiceResponse(document, title, arr);
                } else {
                    System.out.println("User Account not found");
                    String errorresponse = "GetUserAccountAndDatabasePerson: error: " + uid + " error in reading DatabasePerson";
                    MessageConstructor.combineBodyIntoDocument(document, pairresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
                    response = DatabaseServicesBase.standardErrorResponse(document, errorresponse,null);
                }
            } else {
                System.out.println("DatabasePerson not found");

                String errorresponse = "GetUserAccountAndDatabasePerson: error: " + uid + " error reading UserAccount";
                MessageConstructor.combineBodyIntoDocument(document, pairresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
                response = DatabaseServicesBase.standardErrorResponse(document, errorresponse,null);
            }
            
        } else {
            String errorresponse = "GetUserAccountAndDatabasePerson: error: NewUserAccount " + uid + " does not exist";
            MessageConstructor.combineBodyIntoDocument(document, pairresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
            response = DatabaseServicesBase.standardErrorResponse(document, errorresponse,null);
        }
        System.out.println("Get: " + response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean());
        return response;
    }
}
