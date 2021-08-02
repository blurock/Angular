package info.esblurock.background.services.transaction;

import java.util.UUID;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.constants.SupplementaryConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.transaction.TransactionConceptParsing;
import info.esblurock.reaction.core.ontology.base.utilities.SubstituteJsonValues;

public class ProcessTransactionBase {
	
	/** Generate a unique transactionID
	 * This uses the built in UU
	 * 
	 * @return transactionID
	 * 
	 */
	public static String generateTransactionID() {
        return UUID.randomUUID().toString();
 	}
	
	/** Json Template of the source of the transaction
	 * 
	 * @param transaction The name of the transaction
	 * @return A template of the source (ActivityInformation) of the transaction
	 */
	public static JsonObject setupActivityInformationTemplate(String transaction) {
		String info = TransactionConceptParsing.sourceDataOfTransaction(transaction);
		JsonObject jsonobj = CreateDocumentTemplate.createSubTemplate(info);
		return jsonobj;
	}
	
	/** Return catalog object of transaction
	 * 
	 * @param transaction The transaction class name
	 * @return The JSON template of the catalog object
	 */
	public static JsonObject setupCatalogObjectTemplate(String transaction) {
		String catalog = TransactionConceptParsing.catalogOfTransactionSingle(transaction);
		JsonObject jsonobj = CreateDocumentTemplate.createSubTemplate(catalog);
		return jsonobj;
	}
	
	/** Fill in transaction catalog object with source information
	 * 
	 * @param transaction The transaction class
	 * @param info The source information for the transaction
	 * @return The catalog object with source information filled in
	 */
	public static JsonObject fillInSourceInformationInCatalog(String transaction, JsonObject info) {
		JsonObject catalog = setupCatalogObjectTemplate(transaction);
		SubstituteJsonValues.substituteJsonObject(catalog, info);
		return catalog;
	}
	
	public static void fillInOwnerInformation(JsonObject catalog, String owner) {
		catalog.addProperty(ClassLabelConstants.CatalogObjectOwner, owner);
		catalog.addProperty(ClassLabelConstants.CatalogObjectAccessRead, owner);
		catalog.addProperty(ClassLabelConstants.CatalogObjectAccessModify, owner);
	}
	
	public static JsonObject createNewCatalogObject(String transaction, JsonObject info, String owner) {
		JsonObject catalog = fillInSourceInformationInCatalog(transaction,info);
		fillInOwnerInformation(catalog, owner);
		return catalog;
	}
	
	public static void writeCatalogObject(JsonObject catalog) {
		
	}
	
	public static void processTransaction(String transaction, JsonObject catalog, JsonObject info, 
			String owner) {
		if(catalog == null) {
			catalog = createNewCatalogObject(transaction,info,owner);
		}
		catalog.addProperty(ClassLabelConstants.TransactionID, generateTransactionID());
		catalog = TransactionProcess.processFromTransaction(transaction, catalog, info);
	}

}
