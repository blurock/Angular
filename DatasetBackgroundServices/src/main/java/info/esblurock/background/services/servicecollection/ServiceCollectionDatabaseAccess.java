package info.esblurock.background.services.servicecollection;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.jthermodynamics.symmetry.ExtractSetOfSymmetryDefinitionsFromDataset;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;

public enum ServiceCollectionDatabaseAccess {
	
	FindSetOfSymmetryElements {

		@Override
		public JsonObject process(JsonObject info) {
			Document document = MessageConstructor.startDocument("FindSetOfSymmetryElements");
			Element body = MessageConstructor.isolateBody(document);
			JsonObject response = null;
			String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			String dataset = info.get(ClassLabelConstants.DatasetName).getAsString();
			String symmetrytype = info.get(ClassLabelConstants.StructureSymmetryType).getAsString();
			body.addElement("div").addText("Maintainer: " + maintainer);
			body.addElement("div").addText("dataset   : " + dataset);
			body.addElement("div").addText("Maintainer: " + symmetrytype);
			JsonArray arr = ExtractSetOfSymmetryDefinitionsFromDataset.databaseSymmetryDefinitions(maintainer, 
					dataset, symmetrytype);
			if(arr != null) {
				body.addElement("div").addText("Read in " + arr.size() + " Symmetry elements");
				response = DatabaseServicesBase.standardServiceResponse(document, "FindSetOfSymmetryElements", arr);
			} else {
				body.addElement("div").addText("Error in reading symmetry elements");
				response = DatabaseServicesBase.standardErrorResponse(document, "Error in reading External Symmetry", null);
			}
			return response;
		}
		
	}, FindSymmetryElement {

		@Override
		public JsonObject process(JsonObject info) {
			Document document = MessageConstructor.startDocument("FindSetOfSymmetryElements");
			Element body = MessageConstructor.isolateBody(document);
			JsonObject response = null;
			String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
			String dataset = info.get(ClassLabelConstants.DatasetName).getAsString();
			String symmetrytype = info.get(ClassLabelConstants.StructureSymmetryType).getAsString();
			String symmname = info.get(ClassLabelConstants.JThermodynamicSymmetryDefinitionLabel).getAsString();
			body.addElement("div").addText("Maintainer: " + maintainer);
			body.addElement("div").addText("dataset   : " + dataset);
			body.addElement("div").addText("Maintainer: " + symmetrytype);
			
			JsonObject symmetry = ExtractSetOfSymmetryDefinitionsFromDataset.databaseSingleSymmetryDefinition(maintainer,
					dataset, symmetrytype, symmname);
			if(symmetry != null) {
				response = DatabaseServicesBase.standardServiceResponse(document, "FindSetOfSymmetryElements", symmetry);
			} else {
				response = DatabaseServicesBase.standardErrorResponse(document, "Error in reading External Symmetry", null);				
			}
			return response;
		}
		
	};

	
	public abstract JsonObject process(JsonObject json);
	
}
