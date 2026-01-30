package esblurock.info.JavaAIAgent.simplefunction.tools;

import com.google.adk.tools.FunctionTool;
import com.google.adk.tools.Annotations.Schema;

public class TransactionTool {

	@Schema(name = "execute_transaction", 
		      description = "Sends transaction data to the backend processing service")
		public String runTransaction(String transactionDataJson) throws Exception {
		    
		    String gcfUrl = System.getenv("RUN_TRANSACTION_URL");
		    return GeneralBackEndCall.callBackEndService("transaction", transactionDataJson);
		}
	public static final FunctionTool TRANSITION_TOOL 
	= FunctionTool.create(TransactionTool.class, "execute_transaction" );

	@Schema(name = "getcataloginformation", 
		      description = "Given the catalog name, get the information about the object")
		public String getCatalogInformation(String transactionDataJson) throws Exception {
		    
		    String gcfUrl = System.getenv("RUN_GETCATALOGINFO_URL");
		    return GeneralBackEndCall.callBackEndService("transaction", transactionDataJson);
		}
	
	public static final FunctionTool CATALOGINFO_TOOL 
	= FunctionTool.create(TransactionTool.class, "getcataloginformation" );
	
	
	
}
