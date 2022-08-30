package info.esblurock.background.services.transaction;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class FindTransactions {

    public static JsonObject findRDFShortTransactionDescriptionByType(String type) {
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

    /**
     * Get RDFShortTransactionDescription RDF set given the type of transaction
     * event
     * 
     * @param type    The transaction type
     * @param keyword The keyword of the RDFShortTransactionDescription
     * @return The standard response giving the set of
     *         RDFShortTransactionDescription of this type
     * 
     *         The RDFShortTransactionDescription is within a
     *         RDFSubjectObjectAsRecord. This RDF is searched with two criteria:
     *         <ul>
     *         <li>RDFPredicate: RDFShortTransactionDescription
     *         <li>dataset:rdfjsonasobject.prov:activity: The given type
     *         <li>dataset:rdfjsonasobject.dataset:transactionkey: The keyword
     *         <ul>
     *         The object of the RDFShortTransactionDescription is a
     *         ShortTransactionDescription which holds:
     *         <ul>
     *         <li>TransactionEventType: This is the type searched for
     *         <li>DescriptionTitleTransaction: This is a short description
     *         <ul>
     *         The DescriptionTitleTransaction can be used in helping the user
     *         choose the right transaction.
     * 
     *         Complexity: This does one firestore access
     * 
     */
    public static JsonObject findRDFShortTransactionDescriptionByType(String type, String keyword) {
        JsonObject json = CreateDocumentTemplate.createTemplate("dataset:RDFSubjectObjectAsRecord");
        JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(json);
        JsonObject setofprops = CreateDocumentTemplate.createTemplate("dataset:SetOfPropertyValueQueryPairs");
        JsonArray props = new JsonArray();
        JsonObject prop1 = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
        prop1.addProperty(ClassLabelConstants.DatabaseObjectType, ClassLabelConstants.RDFPredicate);
        prop1.addProperty(ClassLabelConstants.ShortStringKey, "dataset:RDFShortTransactionDescription");
        JsonObject prop2 = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
        String key1 = ClassLabelConstants.RDFJsonAsObject + "." + ClassLabelConstants.TransactionEventType;
        // String key1 = "dataset:rdfjsonasobject.prov:activity";
        prop2.addProperty(ClassLabelConstants.DatabaseObjectType, key1);
        prop2.addProperty(ClassLabelConstants.ShortStringKey, type);
        props.add(prop2);
        if (keyword != null) {
            JsonObject prop3 = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
            String key2 = "dataset:rdfjsonasobject.dataset:transactionkey";
            prop3.addProperty(ClassLabelConstants.DatabaseObjectType, key2);
            prop3.addProperty(ClassLabelConstants.ShortStringKey, keyword);
            props.add(prop3);
        }
        setofprops.add(ClassLabelConstants.PropertyValueQueryPair, props);
        JsonObject response = ReadFirestoreInformation.readFirestoreCollection(setofprops, firestoreid);
        return response;
    }

    /**
     * Retrieve from database TransactionEventObject using the Transaction event
     * type
     * 
     * @param type The transaction type
     * @return The set of firestore ID and label pairs (LabelFirestoreIDPair)
     * 
     *         This routine uses findRDFShortTransactionDescriptionByType to find
     *         the set of RDFShortTransactionDescription of the type For each
     *         RDFShortTransactionDescription, the RDF object is retrieved
     *         (RDFJsonAsObject) and the ShortTransactionDescription is extracted
     *         The LabelFirestoreIDPair is extracted from the RDF subject
     *         (RDFJsonAsSubject)
     */
    public static JsonObject findLabelFirestoreIDPairByType(String type, String keyword) {
        JsonObject response = findRDFShortTransactionDescriptionByType(type, keyword);
        if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
            Document docmessage = MessageConstructor.startDocument("findTransactionDescriptionByType");
            String responsemessage = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
            MessageConstructor.combineBodyIntoDocument(docmessage, responsemessage);
            // Get the set of RDFS that satisfy the criteria
            JsonArray RDFs = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
            JsonArray idpairs = new JsonArray();
            for (int i = 0; i < RDFs.size(); i++) {
                JsonObject RDF = RDFs.get(i).getAsJsonObject();
                // Get object of the RDF RDFShortTransactionDescription
                JsonObject object = RDF.get(ClassLabelConstants.RDFJsonAsObject).getAsJsonObject();
                // Get the ShortTransactionDescription from the object
                String description = object.get(ClassLabelConstants.DataTypeComment).getAsString();
                // transaction firestore id is the subject
                JsonObject transid = RDF.get(ClassLabelConstants.RDFJsonAsSubject).getAsJsonObject();
                // create the LabelFirestoreIDPair
                JsonObject pair = CreateDocumentTemplate.createTemplate("dataset:LabelFirestoreIDPair");
                pair.add(ClassLabelConstants.FirestoreCatalogID, transid);
                pair.addProperty(ClassLabelConstants.DataTypeComment, description);
                idpairs.add(pair);
            }
            JsonObject object = new JsonObject();
            object.addProperty(ClassLabelConstants.TransactionEventType, type);
            object.add(ClassLabelConstants.LabelFirestoreIDPair, idpairs);
            String message = "Success: Transaction IDs of type '" + type + "' found";
            response = DatabaseServicesBase.standardServiceResponse(docmessage, message, object);
        }
        return response;
    }

    /**
     * Retrieve from database TransactionEventObject using the Transaction event
     * type
     * 
     * @param type The transaction type
     * @return The set of TransactionEventObject objects
     * 
     *         This routine calls the findLabelFirestoreIDPairByType routine to get
     *         the LabelFirestoreIDPair set For each LabelFirestoreIDPair, use the
     *         FirestoreCatalogID to get the TransactionEventObject
     */
    public static JsonObject findAndReadTransactionEventObjectByType(String type, String keyword) {
        JsonObject response = findLabelFirestoreIDPairByType(type, keyword);
        if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
            Document docmessage = MessageConstructor.startDocument("findTransactionDescriptionByType");
            String responsemessage = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
            MessageConstructor.combineBodyIntoDocument(docmessage, responsemessage);
            // The the set of id and label pairs
            JsonArray pairs = response.get(ClassLabelConstants.LabelFirestoreIDPair).getAsJsonArray();
            JsonArray transactions = new JsonArray();
            // For each of the pairs, retrieve from the database the corresponding
            // transactions
            for (int i = 0; i < pairs.size(); i++) {
                JsonObject pair = pairs.get(i).getAsJsonObject();
                // Extract the firestore id
                JsonObject firestoreid = pair.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
                // Retrieve the transaction from the database
                JsonObject transaction = ReadFirestoreInformation.readFirestoreCatalogObject(firestoreid);
                // add to array
                transactions.add(transaction);
            }
            JsonObject object = new JsonObject();
            object.add(ClassLabelConstants.TransactionEventObject, transactions);
            String message = "Transactions of type '" + type + "' found";
            response = DatabaseServicesBase.standardServiceResponse(docmessage, message, object);
        }
        return response;
    }

    /**
     * @param info    The activity information from the process input
     * @param type
     * @param onlyone
     * @return
     */
    public static JsonObject findDatasetTransaction(JsonObject info, String type, boolean onlyone) {
        JsonObject transaction = null;
        JsonObject emptycatalog = FindTransactionFromActivityInfo.findTransaction(type, info);
        if (emptycatalog != null) {
            JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(emptycatalog);
            firestoreid.remove(ClassLabelConstants.SimpleCatalogName);
            JsonObject setofprops = FindTransactionFromActivityInfo.determineSetOfProps(type, info);
            JsonObject response = ReadFirestoreInformation.readFirestoreCollection(setofprops, firestoreid);
            JsonObjectUtilities.printResponse(response);
            if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
                JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
                if (arr != null) {
                    if (onlyone) {
                        if (arr.size() == 1) {
                            transaction = arr.get(0).getAsJsonObject();
                        }
                    } else {
                        if (arr.size() > 0) {
                            transaction = arr.get(0).getAsJsonObject();
                        }
                    }
                }
            } else {
                System.out.println(
                        "Dataset Transaction not found: " + type + "\n" + JsonObjectUtilities.toString(firestoreid));
                System.out.println("Empty catalog\n" + JsonObjectUtilities.toString(emptycatalog));
            }
        }
        return transaction;
    }

    /** Find a specific transaction for a dataset
     * 
     * The point of this is to use the DatasetTransactionSpecificationForCollection specification
     * to find the collection of transactions. The ID finds the specific ID
     * 
     * @param info: The ActivityInformationRecord
     * @param type The transaction event type (subclass of TransactionEvent)
     * @param transactionID The transaction ID (not the database ID)
     * @return
     */
    public static JsonObject findSpecificDatasetTransaction(JsonObject info, String type, String transactionID) {
        Document document = MessageConstructor.startDocument("findSpecificDatasetTransaction");
        Element body = MessageConstructor.isolateBody(document);
        Element ul = body.addElement("ul");
        ul.addElement("li", "Transaction ID: " + transactionID);
        JsonObject transaction = null;
        JsonObject emptycatalog = FindTransactionFromActivityInfo.findTransaction(type, info);
        JsonObject response = null;
        if (emptycatalog != null) {
            JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(emptycatalog);
            firestoreid.remove(ClassLabelConstants.SimpleCatalogName);
            firestoreid.addProperty(ClassLabelConstants.SimpleCatalogName, transactionID);
            JsonObject setofprops = FindTransactionFromActivityInfo.determineSetOfProps(type, info);

            JsonObject idprop = CreateDocumentTemplate.createTemplate("dataset:PropertyValueQueryPair");
            idprop.addProperty(ClassLabelConstants.DatabaseObjectType, "transaction");
            idprop.addProperty(ClassLabelConstants.ShortStringKey, transactionID);
            JsonArray props = setofprops.get(ClassLabelConstants.PropertyValueQueryPair).getAsJsonArray();
            props.add(idprop);

            
            response = ReadFirestoreInformation.readFirestoreCollection(setofprops, firestoreid);

            //JsonObjectUtilities.printResponse(response);
            if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
                String rdfmessage = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
                MessageConstructor.combineBodyIntoDocument(document, rdfmessage);
                JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
                if (arr != null) {
                    if(arr.size() > 0) {
                        transaction = arr.get(0).getAsJsonObject();
                        response = DatabaseServicesBase.standardServiceResponse(document,
                                "Sucesss: Transaction found: ", transaction);                        
                    } else {
                        response = DatabaseServicesBase.standardErrorResponse(document, "No transactions found", null);
                    }
                } else {
                    response = DatabaseServicesBase.standardErrorResponse(document, "No transactions found: error in reading database", null);
                    
                }
            } else {
                String idS = JsonObjectUtilities.toString(firestoreid);
                System.out.println(idS);
                Element pre = body.addElement("pre");
                pre.addText(idS);
                String rdfmessage = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
                MessageConstructor.combineBodyIntoDocument(document, rdfmessage);
                response = DatabaseServicesBase.standardErrorResponse(document, "Error in reading database", null);
            }
        } else {
            response = DatabaseServicesBase.standardErrorResponse(document, "Error in creating: " + type, null);
        }
        return response;
    }
}
