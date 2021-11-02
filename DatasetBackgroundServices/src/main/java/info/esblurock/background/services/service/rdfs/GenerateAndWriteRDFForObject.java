package info.esblurock.background.services.service.rdfs;

import java.util.Iterator;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.rdfs.FindRDFInClass;

public class GenerateAndWriteRDFForObject {
	public static JsonObject generate(JsonObject catalog) {
		Document document = MessageConstructor.startDocument("GenerateAndWriteRDFForObject");
		Element body = MessageConstructor.isolateBody(document);
		JsonArray rdfs = FindRDFInClass.createSetOfJsonObjectRDFs(catalog);
		Iterator<JsonElement> iter = rdfs.iterator();
		Element ul = body.addElement("ul");
		while(iter.hasNext()) {
			JsonObject json = iter.next().getAsJsonObject();
			String timing = WriteFirestoreCatalogObject.writeCatalogObject(json);
			String rdfpred = json.get(ClassLabelConstants.RDFPredicate).getAsString();
			String rdfid = json.get(AnnotationObjectsLabels.identifier).getAsString();
			String message = "RDF Written: " + rdfid + " " + rdfpred + "(" + timing + ")";
			ul.addElement("li").addText(message);
		}
		JsonObject tripleset = CreateDocumentTemplate.createTemplate("dataset:SetOfCatalogObjects");
		tripleset.add(ClassLabelConstants.SimpleCatalogObject, rdfs);
		String finalmessage = "Success: GenerateAndWriteRDFForObject with " + rdfs.size() + " RDFs";
		JsonObject response = DatabaseServicesBase.standardServiceResponse(document, finalmessage , tripleset);
		return response;
	}
}
