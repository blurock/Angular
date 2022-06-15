package info.esblurock.background.services.transaction;

import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.SystemObjectInformation;
import info.esblurock.background.services.datamanipulation.InterpretTextBlock;
import info.esblurock.background.services.dataset.DatasetCollectionManagement;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.firestore.gcs.PartiionSetWithinRepositoryFileProcess;
import info.esblurock.background.services.firestore.gcs.UploadFileToGCS;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.service.rdfs.GenerateAndWriteRDFForObject;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.CreateLinksInStandardCatalogInformation;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;
import info.esblurock.reaction.core.ontology.base.utilities.SubstituteJsonValues;

public enum TransactionProcess {

	CreateDatabasePersonEvent {

		@Override
		public JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			String owner = event.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
			String transactionID = event.get(ClassLabelConstants.TransactionID).getAsString();
			JsonObject obj = new JsonObject();
			Document document = MessageConstructor.startDocument("CreateDatabasePersonEvent");
			Element body = MessageConstructor.isolateBody(document);
			obj.add(ClassLabelConstants.ActivityCatalogDatabasePersonCreation, info);
			obj.addProperty(ClassLabelConstants.CatalogObjectOwner, owner);
			obj.addProperty(ClassLabelConstants.TransactionID, transactionID);
			obj.addProperty(DatabaseServicesBase.service, "SubstituteAndWriteDatabasePerson");
			JsonObject response = DatabaseServicesBase.process(obj);
			if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonObject catalog = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				String catalogmessage = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
				MessageConstructor.combineBodyIntoDocument(document, catalogmessage);
				body.addElement("h3", "GenerateAndWriteRDFForObject");
				response = GenerateAndWriteRDFForObject.generate(catalog);
				if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
					String rdfmessage = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
					MessageConstructor.combineBodyIntoDocument(document, rdfmessage);
					String message = MessageConstructor.DocumentToString(document);
					response.addProperty(ClassLabelConstants.ServiceResponseMessage, message);
					JsonArray catalogarr = new JsonArray();
					catalogarr.add(catalog);
					response.add(ClassLabelConstants.SimpleCatalogObject, catalogarr);
				}
			}
			return response;
		}

		@Override
		String transactionKey(JsonObject catalog) {
			JsonObject person = catalog.get(ClassLabelConstants.PersonalDescription).getAsJsonObject();
			String title = person.get(ClassLabelConstants.UserClassification).getAsString();
			return title;
		}

		@Override
		String transactionObjectName() {
			return "dataset:UserManagementTransactionObject";
		}

	},
	CreateUserAccountEvent {

		@Override
		JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			String owner = event.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
			String transactionID = event.get(ClassLabelConstants.TransactionID).getAsString();
			String username = info.get(ClassLabelConstants.username).getAsString();
			Document document = MessageConstructor.startDocument("CreateDatabasePersonEvent: " + username);
			// Get prerequisite transaction CreateDatabasePersonEvent
			JsonObject persontransaction = prerequisites.get("dataset:eventcreateperson").getAsJsonObject();
			// Get DatabasePerson ID
			JsonArray personids = persontransaction.get(ClassLabelConstants.DatabaseObjectIDOutputTransaction)
					.getAsJsonArray();
			JsonObject personid = personids.get(0).getAsJsonObject();
			// Substitute Info
			JsonObject catalog = BaseCatalogData.createStandardDatabaseObject("dataset:UserAccount", owner,
					transactionID, "false");
			String identifier = catalog.get(AnnotationObjectsLabels.identifier).getAsString();
			SubstituteJsonValues.substituteJsonObject(catalog, info);
			catalog.addProperty(AnnotationObjectsLabels.identifier, identifier);
			// Write to database
			WriteFirestoreCatalogObject.writeCatalogObject(catalog);
			JsonArray catalogarr = new JsonArray();
			catalogarr.add(catalog);
			// Make link to DatabasePerson
			addLinkToCatalog(catalogarr, personid, "dataset:DatabasePerson", "dataset:ConceptLinkDatabasePerson");
			JsonObject response = DatabaseServicesBase.standardServiceResponse(document,
					"Sucesss: CreateUserAccountEvent", catalogarr);
			return response;
		}

		@Override
		String transactionKey(JsonObject catalog) {
			String username = catalog.get(ClassLabelConstants.username).getAsString();
			return username;
		}

		@Override
		String transactionObjectName() {
			return "dataset:UserManagementTransactionObject";
		}

	},
	InitialReadInOfRepositoryFile {
		@Override
		JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			String owner = event.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
			String transactionID = event.get(ClassLabelConstants.TransactionID).getAsString();
			JsonObject response = UploadFileToGCS.readFromSource(transactionID, owner, info);
			if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				JsonObject catalog = arr.get(0).getAsJsonObject();

				JsonObject recordid = info.get(ClassLabelConstants.DatasetTransactionSpecificationForCollection)
						.getAsJsonObject();
				//catalog.add(ClassLabelConstants.DatasetTransactionSpecificationForCollection, recordid);
				BaseCatalogData.insertFirestoreAddress(catalog);
				CreateLinksInStandardCatalogInformation.addPrerequisitesToDataObjectLink(catalog, prerequisites);
				CreateLinksInStandardCatalogInformation.transfer(info, catalog);
				event.add(ClassLabelConstants.DatasetTransactionSpecificationForCollection, recordid);
		        JsonObject transfirestoreID = BaseCatalogData.insertFirestoreAddress(event);
                catalog.add(ClassLabelConstants.FirestoreCatalogIDForTransaction,transfirestoreID.deepCopy());
                WriteFirestoreCatalogObject.writeCatalogObject(catalog);
			}
			return response;
		}

		@Override
		String transactionKey(JsonObject catalog) {
			JsonObject gcsblob = catalog.get(ClassLabelConstants.GCSBlobFileInformationStaging).getAsJsonObject();
			String key = gcsblob.get(ClassLabelConstants.FileSourceFormat).getAsString();
			return key;
		}

		@Override
		String transactionObjectName() {
			return "dataset:DatasetTransactionEventObject";
		}

	},
	PartiionSetWithinRepositoryFile {

		@Override
		JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			return PartiionSetWithinRepositoryFileProcess.process(event, prerequisites, info);
		}

		@Override
		String transactionKey(JsonObject catalog) {
			String fileformat = catalog.get(ClassLabelConstants.FileSourceFormat).getAsString();
			return fileformat;
		}

		@Override
		String transactionObjectName() {
			return "dataset:DatasetTransactionEventObject";
		}
	},
	TransactionSetupMolecularThermodynamics {

		@Override
		JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			return InterpretTextBlock.interpret(event, prerequisites, info);
		}

		@Override
		String transactionKey(JsonObject catalog) {
			JsonObject structure = catalog.get(ClassLabelConstants.JThermodynamics2DSpeciesStructure).getAsJsonObject();
			String name = structure.get(ClassLabelConstants.JThermodynamicsStructureIsomerName).getAsString();
			return name;
		}

		@Override
		String transactionObjectName() {
			return "dataset:DatasetTransactionEventObject";
		}

	},
	TransactionSetupBensonRule {

		@Override
		JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			return InterpretTextBlock.interpret(event, prerequisites, info);
		}

		@Override
		String transactionKey(JsonObject catalog) {
			return null;
		}

		@Override
		String transactionObjectName() {
			return "dataset:DatasetTransactionEventObject";
		}

	},
	TransactionInterpretTextBlock {
		@Override
		JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			return InterpretTextBlock.interpret(event, prerequisites, info);
		}

		@Override
		String transactionKey(JsonObject catalog) {

			JsonObject structure = catalog.get(ClassLabelConstants.DatasetSpecificationForCollectionSet)
					.getAsJsonObject();
			String maintainer = structure.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			String dataset = structure.get(ClassLabelConstants.DatasetName).getAsString();
			String version = structure.get(ClassLabelConstants.DatasetVersion).getAsString();
			return maintainer + "." + dataset + ":" + version;
		}

		@Override
		String transactionObjectName() {
			return "dataset:DatasetTransactionEventObject";
		}

	},
	DatasetCollectionSetCreationEvent {

		@Override
		JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			JsonObject response = DatasetCollectionManagement.setupNewDatabaseCollectionSet(event, info);
			return response;
		}

		@Override
		String transactionKey(JsonObject catalog) {
			String maintainer = catalog.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			String name = catalog.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
			return maintainer + "." + name;
		}

		@Override
		String transactionObjectName() {
			return "dataset:DataCollectionAddCollectionTransaction";
		}

	},
	DatasetCollectionSetAddDatasetEvent {

		@Override
		JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info) {
			return DatasetCollectionManagement.insertCollectionInfoDataset(event, info, prerequisites);
		}

		@Override
		String transactionKey(JsonObject catalog) {
			String maintainer = catalog.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			String name = catalog.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
			return maintainer + "." + name;
		}

		@Override
		String transactionObjectName() {
			return "dataset:DatasetCollectionAddDatasetToCollectionTransaction";
		}

	};

	public static void addLinkToCatalog(JsonArray catalogobjs, JsonObject linkobj, String type, String concept) {
		for (int i = 0; i < catalogobjs.size(); i++) {
			JsonObject catalog = catalogobjs.get(i).getAsJsonObject();
			JsonArray linkarr = catalog.get(ClassLabelConstants.DataObjectLink).getAsJsonArray();
			JsonObject link = CreateDocumentTemplate.createTemplate("dataset:DataObjectLink");
			link.add(ClassLabelConstants.FirestoreCatalogID, linkobj);
			link.addProperty(ClassLabelConstants.DatabaseObjectType, type);
			link.addProperty(ClassLabelConstants.DataTypeConcept, concept);
			linkarr.add(link);
		}
	}

	/**
	 * @param transaction The current transaction
	 * @return The set of prerequisite transactions (TransactionEventObject)
	 * 
	 *         <ul>
	 *         <li>The required transactions firestoreid's are retrieved
	 *         (DatabaseIDFromRequiredTransaction)
	 *         <li>The set of keys for the transactions are found
	 *         <li>For each key, read in the transaction from the corresponding
	 *         firestoreID and set in list
	 *         <ul>
	 * 
	 */
	public static JsonObject getPrerequisiteObjects(JsonObject transaction) {

		JsonObject transactions = new JsonObject();
		JsonObject prerequisites = transaction.get(ClassLabelConstants.DatabaseIDFromRequiredTransaction)
				.getAsJsonObject();
		Iterator<String> keys = prerequisites.keySet().iterator();
		while (keys.hasNext()) {
			String key = keys.next();
			JsonObject fireid = prerequisites.get(key).getAsJsonObject();
			JsonObject response = ReadFirestoreInformation.readFirestoreCatalogObject(fireid);
			if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonObject pretrans = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				transactions.add(key, pretrans);
			}
		}
		return transactions;
	}

	/**
	 * @param prerequisites   The set of prerequisite transactions
	 * @param transidentifier The identifier of the transaction to retrieve
	 * @return The corresponding output catalog object (returns null if
	 *         unsuccessful)
	 * 
	 */
	public static JsonObject retrieveSingleOutputFromTransaction(JsonObject prerequisites, String transidentifier) {
		JsonObject catalog = null;
		// Get the InitialReadInOfRepositoryFile transaction
		if (prerequisites.get(transidentifier) != null) {
			JsonObject stagingtransaction = prerequisites.get(transidentifier).getAsJsonObject();
			// Get the set of output FirestoreID from transaction
			JsonArray outobjects = stagingtransaction.get(ClassLabelConstants.DatabaseObjectIDOutputTransaction)
					.getAsJsonArray();
			if (outobjects.size() > 0) {
				// There is only one, get the FirestoreID of RepositoryFileStaging output
				JsonObject stagingid = outobjects.get(0).getAsJsonObject();
				// Read the catalog object and isolate it from the response
				JsonObject response = ReadFirestoreInformation.readFirestoreCatalogObject(stagingid);
				if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
					catalog = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				}
			}
		} else {
			System.out.println("Prerequisite '" + transidentifier + "' not found in\n"
					+ JsonObjectUtilities.toString(prerequisites));
		}
		return catalog;
	}

	public static JsonArray retrieveSetOfOutputsFromTransaction(JsonObject prerequisites, String transidentifier) {
		JsonArray catalogset = new JsonArray();
		// Get the InitialReadInOfRepositoryFile transaction
		JsonObject stagingtransaction = prerequisites.get(transidentifier).getAsJsonObject();
		// Get the set of output FirestoreID from transaction
		JsonArray outobjects = stagingtransaction.get(ClassLabelConstants.DatabaseObjectIDOutputTransaction)
				.getAsJsonArray();
		for (int i = 0; i < outobjects.size(); i++) {
			JsonObject stagingid = outobjects.get(i).getAsJsonObject();
			// Read the catalog object and isolate it from the response
			JsonObject response = ReadFirestoreInformation.readFirestoreCatalogObject(stagingid);
			if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonObject catalog = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				catalogset.add(catalog);
			}
		}
		return catalogset;
	}

	/**
	 * @param transactionID The transaction ID (unique code for set of transactions)
	 * @param owner         the owner of all the objects generated by the
	 *                      transaction
	 * @param prerequisites The set of IDs for the prerequisites of the transaction
	 * @param info          The auxiliary information associated with the
	 *                      transaction
	 * @return the transaction event
	 */
	abstract JsonObject process(JsonObject event, JsonObject prerequisites, JsonObject info);

	/**
	 * Generate Transaction Key
	 * 
	 * @param catalog The catalog
	 * @return The key associated with the transaction
	 */
	abstract String transactionKey(JsonObject catalog);

	abstract String transactionObjectName();

	public static JsonObject processFromTransaction(String transaction, JsonObject prerequisites, JsonObject info) {
		Document document = MessageConstructor.startDocument("Transaction: " + transaction);
		String transname = transaction.substring(8);
		TransactionProcess process = TransactionProcess.valueOf(transname);
		String transactionID = SystemObjectInformation.determineTransactionID();
		String owner = SystemObjectInformation.determineOwner();
		String transactionobjectname = process.transactionObjectName();
		JsonObject event = BaseCatalogData.createStandardDatabaseObject(transactionobjectname, owner, transactionID,
				owner);
        String title = info.get(ClassLabelConstants.DescriptionTitle).getAsString();
        JsonObject shortdescr = event.get(ClassLabelConstants.ShortTransactionDescription).getAsJsonObject();
        shortdescr.addProperty(ClassLabelConstants.TransactionEventType, transaction);
        shortdescr.addProperty(ClassLabelConstants.DataTypeComment, title);
		//event.addProperty(ClassLabelConstants.TransactionEventType, transname);
		event.add(ClassLabelConstants.ActivityInformationRecord, info);
		JsonObject response = process.process(event, prerequisites, info);
		if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {

			JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
			if (arr.size() > 0) {
				JsonObject catalog = arr.get(0).getAsJsonObject();
		        shortdescr.addProperty(ClassLabelConstants.TransactionKey, process.transactionKey(catalog));
				JsonArray output = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				GenerateTransactionEventObject.addDatabaseObjectIDOutputTransaction(event, output);
				WriteFirestoreCatalogObject.writeCatalogObject(event);
				String message = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
				MessageConstructor.combineBodyIntoDocument(document, message);
				response.add(ClassLabelConstants.TransactionEventObject, event);
				/*
				JsonObject rdfresponse = GenerateAndWriteRDFForObject.generate(event);
				if (rdfresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
					String rdfmessage = rdfresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
					MessageConstructor.combineBodyIntoDocument(document, rdfmessage);
					response = DatabaseServicesBase.standardServiceResponse(document, "Success: " + transaction, event);
				} else {
					response = DatabaseServicesBase.standardErrorResponse(document, rdfresponse, event);
				}
				*/
			} else {
				String docmessage = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
				MessageConstructor.combineBodyIntoDocument(document, docmessage);
				Element body = MessageConstructor.isolateBody(document);
				body.addElement("div").addText("No partitions executed, no catalog objects written");
				response = DatabaseServicesBase.standardErrorResponse(document, "No partitions executed", response);
			}
		}
		return response;
	}

	/**
	 * @param json The TransactionEventInputObject object from the post
	 * @return the transaction event
	 * 
	 *         The object should have
	 *         <ul>
	 *         <li>Transaction (dataset:transaction) String
	 *         <li>Prerequisite IDs (dataset:requiredtransitionid) JsonArray
	 *         <li>ActivityInfo (dataset:activityinfo) JsonObject
	 *         <ul>
	 * 
	 *         Prerequisites that are subclasses of DatabaseTransactionEvent can be
	 *         filled in from the activity info.
	 */
	public static JsonObject processFromTransaction(JsonObject json) {
		String transaction = json.get(ClassLabelConstants.TransactionEventType).getAsString();
		// Dataset transaction events (subclass of DatabaseTransactionEvent), then can
		// be filled in automatically
		fillInDatasetPrerequisites(transaction, json);
		JsonObject prerequisites = getPrerequisiteObjects(json);
		JsonObject info = json.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
		return processFromTransaction(transaction, prerequisites, info);
	}

	/**
	 * Insert prerequisite transaction firestoreid into activity info
	 * 
	 * @param json            The activity info
	 * @param transactionname The name of prerequisite transaction
	 * @param criteria        The limiting criteria (the transaction key in
	 *                        ShortTransactionDescription)
	 * @param limittoone      If true, then only one transacation meeting the
	 *                        transactionname and criteria is allowed.
	 * @return true if successful
	 * 
	 *         This is primarily used for testing purposes, to find an appropriate
	 *         prerequisite transaction. This is why just the first transaction
	 *         found is taken.
	 * 
	 *         If DatabaseIDFromRequiredTransaction does not exist in the json, then
	 *         one is created.
	 * 
	 *         If limittoone is true, then only one is allowed (might be useful in
	 *         real cases).
	 * 
	 */
	public static boolean setFirstTransactionIntoActivityInfo(JsonObject json, String transactionname, String criteria,
			boolean limittoone) {
		boolean success = true;
		JsonObject transresponse = FindTransactions.findLabelFirestoreIDPairByType(transactionname, criteria);
		if (transresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			JsonArray labelids = transresponse.get(ClassLabelConstants.LabelFirestoreIDPair).getAsJsonArray();
			if (labelids.size() > 0) {
				boolean go = true;
				if (limittoone) {
					go = labelids.size() == 1;
				}
				if (go) {
					JsonObject first = labelids.get(0).getAsJsonObject();
					JsonObject firestorid = first.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
					JsonObject prerequisites = new JsonObject();
					if (json.get(ClassLabelConstants.DatabaseIDFromRequiredTransaction) != null) {
						prerequisites = json.get(ClassLabelConstants.DatabaseIDFromRequiredTransaction)
								.getAsJsonObject();
					} else {
						json.add(ClassLabelConstants.DatabaseIDFromRequiredTransaction, prerequisites);
					}
					String preid = DatasetOntologyParseBase.getIDFromAnnotation(transactionname);
					prerequisites.add(preid, firestorid);
				} else {
					System.err.println("More than one prerequisite Transactions found: \n"
							+ JsonObjectUtilities.toString(labelids));
					success = false;
				}
			} else {
				System.err.println("Prerequisite Transaction not found meeting criteria: " + criteria);
				success = false;
			}
		} else {
			System.err.println("Prerequisite Transaction not found: " + transactionname);
			success = false;
		}
		return success;
	}

	/**
	 * @param eventtype the transaction event name
	 * @param json      The TransactionProcess input
	 * 
	 *                  If can be found using the standard information in the
	 *                  activity info and If a single prerequisite is found, then it
	 *                  is added to the prerequisites (or if onlyone is false, then
	 *                  the first one is returned).
	 * 
	 *                  If the set of prerequisites is not in the input, an empty
	 *                  prerequisite object i is put there and that is filled in.
	 * 
	 *                  If the label for the event type is present in the
	 *                  prerequisites, then it is not changed.
	 * 
	 *                  the working routine for this is
	 *                  FindTransactions.findDatasetTransaction. If this returns a
	 *                  non-null transaction, then the FirebaseCatalogID is entered
	 *                  in the prerequisites. Otherwise, nothing is fill in.
	 * 
	 * 
	 */
	public static void fillInDatasetPrerequisites(String eventtype, JsonObject json) {
		// Get Activity info of the input
		JsonObject info = json.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
		// Get prequisites, if not there, create prerequisites object
		JsonObject prerequisites = null;
		if (json.get(ClassLabelConstants.DatabaseIDFromRequiredTransaction) == null) {
			prerequisites = new JsonObject();
			json.add(ClassLabelConstants.DatabaseIDFromRequiredTransaction, prerequisites);
		} else {
			prerequisites = json.get(ClassLabelConstants.DatabaseIDFromRequiredTransaction).getAsJsonObject();
		}
		// From the event, find the prerequisite transactions
		List<String> prerequisitenames = OntologyUtilityRoutines.exactlyOnePropertyMultiple(eventtype,
				OntologyObjectLabels.requires);
		// Loop through each prerequisite
		for (String name : prerequisitenames) {
			String label = DatasetOntologyParseBase.getIDFromAnnotation(name);
			// If the prerequisite has not been filled in yet, find it and add it in.
			if (prerequisites.get(label) == null) {
				JsonObject transaction = FindTransactions.findDatasetTransaction(info, name, true);
				if (transaction != null) {
					JsonObject firebaseid = transaction.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
					prerequisites.add(label, firebaseid);
				} else {
					System.out.println("No transaction found");
				}
			}
		}

	}
}
