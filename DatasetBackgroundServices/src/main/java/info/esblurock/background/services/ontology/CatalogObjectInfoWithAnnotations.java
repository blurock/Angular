package info.esblurock.background.services.ontology;


import com.google.gson.JsonObject;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiIssuer;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;

import info.esblurock.reaction.core.ontology.base.classification.ClassificationHierarchy;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.dataset.annotations.BaseAnnotationObjects;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

@Api(
	    name = "ontologyannotations",
	    version = "v1",
	    namespace =
	    @ApiNamespace(
	        ownerDomain = "ontology.esblurock.info",
	        ownerName = "ontology.esblurock.info",
	        packagePath = ""
	    ),
	    // [START_EXCLUDE]
	    issuers = {
	        @ApiIssuer(
	            name = "firebase",
	            issuer = "https://securetoken.google.com/blurock-firebase",
	            jwksUri =
	                "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system"
	                    + ".gserviceaccount.com"
	        )
	    }
	    )
	   
public class CatalogObjectInfoWithAnnotations {
	
	@ApiMethod(httpMethod = ApiMethod.HttpMethod.GET, name = "cataloginfo")
	  public Message cataloginfo(@Named("catalogname") String catalogname) {
		//Date today = new Date();
		//DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  
		//String strDate = dateFormat.format(today);  
		
		JsonObject catalog = CreateDocumentTemplate.createSubTemplate(catalogname);
		

		Message message = new Message();
		message.setMessage(JsonObjectUtilities.toString(catalog));
		return message;
	}
	 @ApiMethod(httpMethod = ApiMethod.HttpMethod.GET, name="catalogannotation")
		public Message catalogannotation(@Named("catalogname") String catalogname) {
		 BaseAnnotationObjects  annotations = DatasetOntologyParseBase.getAnnotationStructureFromIDObject(catalogname);
		 JsonObject json = annotations.toJsonObject();
		 
			 Message message = new Message();
			 message.setMessage(JsonObjectUtilities.toString(json));
			return message;
		}
	 @ApiMethod(httpMethod = ApiMethod.HttpMethod.GET, name="classificationhierarchy")
	 public Message classificationhierarchy(@Named("catalogname") String catalogname) {
		ClassificationHierarchy hier = DatabaseOntologyClassification.getClassificationHierarchy(catalogname);
		JsonObject json = hier.toJsonObject();
		 Message message = new Message();
		 message.setMessage(JsonObjectUtilities.toString(json));
		return message;
	 }
	 

}
