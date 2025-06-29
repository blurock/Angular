package esblurock.info.neo4j.rdf;

import com.google.gson.JsonObject;

public enum RDFQuestions {
	FindListOfCatalogObjectUniqueGenericLabel  {
		@Override
		public JsonObject execute(JsonObject input) {
			return RDFQuestionsUtilities.FindListOfCatalogObjectUniqueGenericLabel(input);
		}
	},
	FindTreeOfPrerequisiteTransactions{

	@Override
	public JsonObject execute(JsonObject input) {
		return RDFQuestionsUtilities.FindTreeOfPrerequisiteTransactions(input);
	}

	},
	FindCatalogObjectsFromUniqueGenericLabelAndType {
		@Override
		public JsonObject execute(JsonObject input) {
			return RDFQuestionsUtilities.CatalogObjectsFromUniqueGenericLabel(input);
		}
	};
	
	abstract JsonObject execute(JsonObject input);

}
