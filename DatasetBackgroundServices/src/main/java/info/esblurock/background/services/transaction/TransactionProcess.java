package info.esblurock.background.services.transaction;

import com.google.gson.JsonObject;

public enum TransactionProcess {
	
	CreateDatabasePersonEvent {

		@Override
		public JsonObject process(JsonObject catalog, JsonObject info) {
			
			return null;
		};
		
	};
	
	abstract JsonObject process(JsonObject catalog, JsonObject info);
	public static JsonObject processFromTransaction(String transaction, JsonObject catalog, JsonObject info) {
		String transname = transaction.substring(8);
		TransactionProcess process = TransactionProcess.valueOf(transname);
		return process.process(catalog, info);
	}
}
