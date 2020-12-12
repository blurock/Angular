package info.esblurock.background.services.ontology;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ExecutionException;

import org.json.JSONObject;

import com.google.api.core.ApiFuture;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiIssuer;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;

import info.esblurock.background.services.firestore.FirestoreBaseClass;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.catalogobjects.AnnotationSet;
import info.esblurock.core.DataBaseObjects.catalogobjects.BaseCatalogObject;
import info.esblurock.core.DataBaseObjects.classifications.ClassificationHierarchy;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.dataset.GenerateCatalogObject;

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
	
	private static final long serialVersionUID = 1L;

	 @ApiMethod(httpMethod = ApiMethod.HttpMethod.GET, name = "cataloginfo")
	  public Message cataloginfo(@Named("catalogname") String catalogname) {
		Date today = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  
		String strDate = dateFormat.format(today);  
		
		StandardOntologyCatalogElementHierarchy hierarchy = GenerateCatalogObject.generateSetOfStandardOntologyCatalogElement(catalogname);
		BaseCatalogObject bascat = new BaseCatalogObject();
		bascat.fillBaseInfo("1", strDate, "Public", "blurock", catalogname);
		bascat.fill(hierarchy);

		AnnotationSet set = new AnnotationSet();
		set.fill(hierarchy);

		JSONObject jobj = new JSONObject();
		jobj.put("catalog" , bascat.toJSONObject());
		jobj.put("annotations", set.toJSONObject());
		Message message = new Message();
		message.setMessage(jobj.toString());
		return message;
	}
	 @ApiMethod(httpMethod = ApiMethod.HttpMethod.GET, name="catalogannotation")
		public Message catalogannotation(@Named("catalogname") String catalogname) {
			BaseAnnotationObjects hierarchy = DatasetOntologyParseBase.getAnnotationStructureFromIDObject(catalogname);
			 Message message = new Message();
			 message.setMessage(hierarchy.toString(""));
			return message;
		}
	 @ApiMethod(httpMethod = ApiMethod.HttpMethod.GET, name="classificationhierarchy")
	 public Message classificationhierarchy(@Named("catalogname") String catalogname) {
		ClassificationHierarchy hier = DatabaseOntologyClassification.getClassificationHierarchy(catalogname);
		 Message message = new Message();
		 message.setMessage(hier.toString(""));
		return message;
	 }
	 

}
