package info.esblurock.background.services.datamanipulation;

import java.sql.SQLException;
import java.util.HashSet;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.exception.CDKException;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.jthermodynamics.metadata.FirestoreBuildMetadataDefinition;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import thermo.data.structure.structure.MetaAtomInfo;
import thermo.data.structure.structure.MetaAtomLine;
import thermo.data.structure.structure.StructureAsCML;

public enum InterpretTextBlock {

	ParseLinesJThermodynamicsMetaAtoms {
		@Override
		public JsonObject interpret(JsonArray lines, String position,
				String owner, String transactionID, String publicS,  Element table) {
			FirestoreBuildMetadataDefinition metadef = new FirestoreBuildMetadataDefinition(new HashSet<MetaAtomInfo>());
				String line = lines.get(0).getAsString();
		    	JsonObject catalog = BaseCatalogData.createStandardDatabaseObject("dataset:JThermodynamicsMetaAtomDefinition",
						owner, transactionID, publicS);
				try {
		    	MetaAtomLine atomline = metadef.parseToMetaAtom(line,false);
				String elementname = atomline.getElementName();
				String metaatomtype = atomline.getMetaAtomType();
				String metaatomname = atomline.getMetaAtomName();
				String nancy = atomline.getNancy();
		    	StructureAsCML cmlstruct = metadef.setUpStructureAsCML(nancy,elementname);
		    	catalog.addProperty(ClassLabelConstants.JThermodynamicsMetaAtomLabel,metaatomname);
		    	catalog.addProperty(ClassLabelConstants.JThermodynamicsMetaAtomType,metaatomtype);
		    	catalog.addProperty(ClassLabelConstants.JThermodynamics2DSpeciesLabel,elementname);
		    	catalog.addProperty(ClassLabelConstants.JThermodynamicsStructureSpecification,nancy);
		    	catalog.addProperty(ClassLabelConstants.JThermodynamicsSpeciesSpecificationType,"dataset:SpeciesSpecificationNancyLinearForm");
		    	catalog.addProperty(ClassLabelConstants.JThermodynamicsStructureAsCMLString,cmlstruct.toString());
				catalog.addProperty(ClassLabelConstants.Position,position);
    			Element row = table.addElement("tr");
       			row.addElement("td").addText(position);
       			row.addElement("td").addText(line);
				} catch (SQLException | CDKException e) {
					e.printStackTrace();
				}
			return catalog;
	}
		public boolean linecheck(JsonArray lines) {
			return lines.size() == 1;
		}
	};
	public abstract boolean linecheck(JsonArray lines);
	public abstract JsonObject interpret(JsonArray lines, String position,
			String owner, String transactionID, String publicS,  Element table);
	
	public static JsonObject readAndInterpret(String methodS, JsonObject firebaseid,
			String owner, String transactionID, String publicS,  Element table) {
		JsonObject parsedcatalog = ReadFirestoreInformation.readFirestoreCatalogObject(firebaseid);
		JsonObject block = parsedcatalog.get(ClassLabelConstants.RepositoryDataPartitionBlock).getAsJsonObject();
		JsonArray lines = block.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
		String position = block.get(ClassLabelConstants.Position).getAsString();
		InterpretTextBlock method = InterpretTextBlock.valueOf(methodS);
		JsonObject catalog = new JsonObject();
		if(method.linecheck(lines)) {
			catalog = method.interpret(lines, position,
					owner, transactionID, publicS, table);
		}
		return catalog;
	}
	
	public static JsonObject build(String methodclass, String transactionID, String owner, 
			JsonObject prerequisites, JsonObject info) {
		String title = DatasetOntologyParseBase.getLabelFromAnnotation(methodclass);
		String methodS = methodclass.substring(8);
		Document document = MessageConstructor.startDocument(title);		
		Element body = MessageConstructor.isolateBody(document);
    	JsonArray catalogset = new JsonArray();
		JsonObject partitiontrans = prerequisites.get(ClassLabelConstants.RepositoryParsedToFixedBlockSize).getAsJsonObject();
		JsonArray arr = partitiontrans.get(ClassLabelConstants.DatabaseObjectIDOutputTransaction).getAsJsonArray();
		Element table = body.addElement("table");
		Element hrow = table.addElement("tr");
		hrow.addElement("th").addText("Position");
		hrow.addElement("th").addText("Line");
		for(int i=1;i<arr.size();i++) {
			JsonObject firebaseid = arr.get(i).getAsJsonObject();
			JsonObject catalog = InterpretTextBlock.readAndInterpret(methodS, firebaseid, owner, transactionID, owner, table);
			if(catalog != null) {
				catalogset.add(catalog);
			}
		}
    	JsonObject response = DatabaseServicesBase.standardServiceResponse(document, "Successful", catalogset);
    	return response;
	}

}
