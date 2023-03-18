package info.esblurock.background.services.transaction;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.FirestoreBaseClass;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.SetUpDocumentReference;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

/**
 * @author edwardblurock
 *
 */
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

    /**
     * Find a specific transaction for a dataset
     * 
     * The point of this is to use the DatasetTransactionSpecificationForCollection
     * specification to find the collection of transactions. The ID finds the
     * specific ID
     * 
     * @param info:         The ActivityInformationRecord
     * @param type          The transaction event type (subclass of
     *                      TransactionEvent)
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

            // JsonObjectUtilities.printResponse(response);
            if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
                String rdfmessage = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
                MessageConstructor.combineBodyIntoDocument(document, rdfmessage);
                JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
                if (arr != null) {
                    if (arr.size() > 0) {
                        transaction = arr.get(0).getAsJsonObject();
                        response = DatabaseServicesBase.standardServiceResponse(document,
                                "Sucesss: Transaction found: ", transaction);
                    } else {
                        response = DatabaseServicesBase.standardErrorResponse(document, "No transactions found", null);
                    }
                } else {
                    response = DatabaseServicesBase.standardErrorResponse(document,
                            "No transactions found: error in reading database", null);

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

    public static JsonObject findDatasetNameForMaintainer(JsonObject info) {
        Document document = MessageConstructor.startDocument("findDatasetNameForMaintainer");
        Element body = MessageConstructor.isolateBody(document);
        JsonObject response = null;
        String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
        String eventtype = null;
        if(info.get(ClassLabelConstants.TransactionEventType) != null) {
            eventtype = info.get(ClassLabelConstants.TransactionEventType).getAsString();
        }
        String catalogtype = null;
        if(info.get(ClassLabelConstants.CatalogObjectType) != null) {
            catalogtype = info.get(ClassLabelConstants.CatalogObjectType).getAsString();
        }
        JsonObject firestoreid = CreateDocumentTemplate.createTemplate("dataset:FirestoreCatalogID");
        JsonArray pairs = new JsonArray();
        firestoreid.add(ClassLabelConstants.CollectionDocumentIDPairAddress, pairs);
        firestoreid.addProperty(ClassLabelConstants.DataCatalog, "hierthermodynamicdataset");
        firestoreid.addProperty(ClassLabelConstants.SimpleCatalogName, maintainer);
        
        
        
        return response;
    }

   
    
    public static JsonObject readCatalogTransactionObjectHierarchy(JsonObject info) {
        String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
        Document docmessage = MessageConstructor.startDocument("readFirestoreCollection");
        Element body = MessageConstructor.isolateBody(docmessage);
        JsonObject response = new JsonObject();
        Firestore db;
        try {
            db = FirestoreBaseClass.getFirebaseDatabase();
            // CatalogHierarchyThermodynamicDatasets
            CollectionReference col = db.collection("hierthermodynamicdataset");
            // CatalogObjectDatasetMaintainer
            DocumentReference datasetnamesref = col.document(maintainer);
            JsonArray listofdatasetnames = getDatasetName(datasetnamesref,info,body);
            
            if(listofdatasetnames.size() > 0) {
                JsonObject node =  new JsonObject();
                node.addProperty(ClassLabelConstants.CatalogHierarchyCatalogObjectType, "dataset:CatalogObjectDatasetMaintainer");
                node.addProperty(ClassLabelConstants.CatalogObjectKey, maintainer);
                node.add(ClassLabelConstants.CatalogHiearchyNode, listofdatasetnames);
                node.remove(ClassLabelConstants.SimpleDatabaseObjectStructure);
                JsonArray arr = new JsonArray();
                arr.add(node);
                response = DatabaseServicesBase.standardServiceResponse(docmessage,
                        "Successful read of collectiion set objects", arr);
                
            } else {
                response = DatabaseServicesBase.standardErrorResponse(docmessage,"No Transaction objects found", null);
            }

 
        } catch (IOException e) {
            response = DatabaseServicesBase.standardErrorResponse(docmessage, e.toString(), null);
        }
        return response;
    }
   
    private static JsonArray getDatasetName(DocumentReference datasetnamesref, JsonObject info, Element body) {
        JsonArray listofdatasetnames = new JsonArray();
        Iterable<CollectionReference> collections = datasetnamesref.listCollections();
        Iterator<CollectionReference> iter = collections.iterator();
        while (iter.hasNext()) {
            // CatalogHierarchyDatasetName (and others)
            CollectionReference collection = iter.next();
            String datasetname = collection.getId();
            if (!(datasetname.equals("hieridcollectionset")
                    || datasetname.equals("hieraddcollectionsettransactions"))) {
                // CatalogHierarchyDatasetTransactionSeries (CatalogObjectUniqueGenericLabel)
                JsonArray uniquenames = getUniqueGenericLabel(collection, info,body);
                if (uniquenames.size() > 0) {
                    JsonObject node =  new JsonObject();
                    node.addProperty(ClassLabelConstants.CatalogHierarchyCatalogObjectType, "dataset:CatalogHierarchyDatasetTransactionSeries");
                    node.addProperty(ClassLabelConstants.CatalogObjectKey, datasetname);
                    node.add(ClassLabelConstants.CatalogHiearchyNode, uniquenames);
                    node.remove(ClassLabelConstants.SimpleDatabaseObjectStructure);
                    listofdatasetnames.add(node);
                }

            }
        }
        return listofdatasetnames;
    }
    
    /** Loop over all uniquelabels, each one representing a data submission, to ultimately retrieve objects
     * 
     * @param info    The activity information from the process input 
     * @param uniquelabels Collection of objects in Firestore.
     * @param body The body of the document
     * @return JsonArray of the objects
     * 
     * This loops over the the uniquelabels. In this level of the hierarchy, there is also the element of 'hierdatasetcollection'
     * and this is hopped over.
     * For each unique label, the sub hierarchy is retrieved. If there are elements retrieved in the subhierarchy, then
     * they are associated with the unique label.

     */
    private static JsonArray getUniqueGenericLabel(CollectionReference uniquelabels, JsonObject info, Element body) {
        JsonArray uniquenames = new JsonArray();
        Iterable<DocumentReference> documents = uniquelabels.listDocuments();
        Iterator<DocumentReference> dociter = documents.iterator();
        while (dociter.hasNext()) {
            // CatalogHierarchyDatasetCollection
            DocumentReference document = dociter.next();
            String genericname = document.getId();
            if (!genericname.equals("hierdatasetcollection")) {
                // CatagoryHierarchyDatasetTransactionType
                JsonArray transactiontypes = getDatasetTransactionType(document, info, body);
                if (transactiontypes.size() > 0) {
                    JsonObject node =  new JsonObject();
                    node.addProperty(ClassLabelConstants.CatalogHierarchyCatalogObjectType, "dataset:CatalogHierarchyDatasetTransactionSeries");
                    node.addProperty(ClassLabelConstants.CatalogObjectKey, genericname);
                    node.add(ClassLabelConstants.CatalogHiearchyNode, transactiontypes);
                    uniquenames.add(node);
                }

            }

        }
       return uniquenames;
    }
    
    /** Loop over all types to retreive objects
     * 
     * @param info    The activity information from the process input 
     * @param objecttypelabel Collection of objects in Firestore.
     * @param body The body of the document
     * @return JsonArray of the objects
     * 
     * This loops over the the data types. If the type matches
     * the criteria (checkIfType), then the subobjects are retrieved and returned.

     */
    private static JsonArray getDatasetTransactionType(DocumentReference document, JsonObject info, Element body) {
        JsonArray transactiontypes = new JsonArray();
        Iterable<CollectionReference> objecttypecollections = document.listCollections();
        Iterator<CollectionReference> objecttypeiter = objecttypecollections.iterator();
        while (objecttypeiter.hasNext()) {
            CollectionReference objecttypelabel = objecttypeiter.next();
            // CatagoryHierarchyDatasetTransactionType
            String typelabel = objecttypelabel.getId();
            if (checkIfType(typelabel, info,body)) {
                JsonArray objects = getObjects(objecttypelabel,body);
                if (objects.size() > 0) {
                    JsonObject node = new JsonObject();
                    node.addProperty(ClassLabelConstants.CatalogHierarchyCatalogObjectType, "dataset:CatagoryHierarchyDatasetTransactionType");
                    node.addProperty(ClassLabelConstants.CatalogObjectKey, typelabel);
                    node.add(ClassLabelConstants.CatalogHiearchyNode, objects);
                    node.remove(ClassLabelConstants.SimpleDatabaseObjectStructure);
                    transactiontypes.add(node);
                }
            }
        }
       return transactiontypes;
    }
    /*
     * @param typelabel The label of the hierarchy representing the type of object 
     * @param info: The source of the type that should be included
     * @param body Used to insert into the body 
     * @return true if the link in the hierarchy should be included... false otherwise.
     * 
     */
    private static boolean checkIfType(String typelabel, JsonObject info, Element body) {
        String type = info.get(ClassLabelConstants.TransactionEventType).getAsString();
     // take away the 'dataset:' from type
        String tocompare = type.substring(8);
        boolean ans = tocompare.equals(typelabel);
        if(ans) {
            body.addElement("div").addText("Type: " + type);
        }
        return ans;
    }
    
    /** Isolate the collection of objects from a CollectionReference
     * 
     * @param objecttypelabel Collection of objects in Firestore.
     * @param body The body of the document
     * @return JsonArray of the objects
     * 
     * This is meant to be a help routine of readCatalogTransactionObjectHierarchy to 
     * read the collection of objects (transactions) at the bottom of the hierarchy.
     * But in principle it could be used in general
     */
    private static JsonArray getObjects(CollectionReference objectlabel, Element body) {
        JsonArray objects = new JsonArray();
        Iterable<DocumentReference> objref = objectlabel.listDocuments();
        Iterator<DocumentReference> objiter = objref.iterator();
        Element table = body.addElement("table");
        Element hrow = table.addElement("tr");
        hrow.addElement("th").addText("Object key");
        while (objiter.hasNext()) {
            DocumentReference object = objiter.next();
            // CatagoryHierarchyDatasetTransactionEvent
            String objectname = object.getId();
            Element row = table.addElement("tr");
            row.addElement("td").addText(objectname);
            ApiFuture<DocumentSnapshot> objectfuture = object.get();
            DocumentSnapshot objsnap;
            try {
                objsnap = objectfuture.get();
                Map<String, Object> mapObj = objsnap.getData();
                String jsonString = new Gson().toJson(mapObj);
                JsonObject transaction = JsonObjectUtilities.jsonObjectFromString(jsonString);
                JsonObject node = new JsonObject();
                node.addProperty(ClassLabelConstants.CatalogHierarchyCatalogObjectType, "dataset:CatagoryHierarchyDatasetTransactionEvent");
                node.addProperty(ClassLabelConstants.CatalogObjectKey, objectname);
                node.add(ClassLabelConstants.SimpleDatabaseObjectStructure, transaction);
                objects.add(node);
           } catch (InterruptedException | ExecutionException e) {
               body.addElement("div").addText("Error in reading transaction: " + objectname);
               body.addElement("div").addText(e.getMessage());
            }
        }
        return objects;
    }

}
