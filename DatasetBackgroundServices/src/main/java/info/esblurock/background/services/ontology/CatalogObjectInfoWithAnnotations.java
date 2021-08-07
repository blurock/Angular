package info.esblurock.background.services.ontology;


import com.google.gson.JsonObject;


import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

	   
public class CatalogObjectInfoWithAnnotations {
	
	  public Message cataloginfo(String catalogname) {
		//Date today = new Date();
		//DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  
		//String strDate = dateFormat.format(today);  
		
		if(!catalogname.startsWith("dataset:")) {
			catalogname = "dataset:" + catalogname;
		}
		System.out.println("catalogname:  " + catalogname);
		
		JsonObject catalog = CreateDocumentTemplate.createSubTemplate(catalogname);
		

		Message message = new Message();
		message.setMessage(JsonObjectUtilities.toString(catalog));
		return message;
	}
/*
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
	 */

}
