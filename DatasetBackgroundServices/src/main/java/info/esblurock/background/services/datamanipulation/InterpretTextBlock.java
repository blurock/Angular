package info.esblurock.background.services.datamanipulation;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.StringTokenizer;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.jthermodynamics.structure.GenerateJThermodynamics2DSpeciesStructure;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.service.rdfs.GenerateAndWriteRDFForObject;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import thermo.build.ReadDisassociationData;
import thermo.compute.utilities.StringToAtomContainer;
import thermo.data.structure.linearform.NancyLinearFormToMolecule;
import thermo.data.structure.structure.BuildStructureLibrary;
import thermo.data.structure.structure.MetaAtomInfo;
import thermo.data.structure.structure.MetaAtomLine;
import thermo.data.structure.structure.StructureAsCML;
import thermo.exception.ThermodynamicComputeException;

public enum InterpretTextBlock {

	ParseLinesJThermodynamicsMetaAtoms {
		@Override
		public JsonObject interpret(JsonObject parsed, String owner, 
				String transactionID, String publicS, Element table) {
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			String position = parsed.get(ClassLabelConstants.Position).getAsString();
			BuildStructureLibrary metadef = new BuildStructureLibrary(new HashSet<MetaAtomInfo>());
			String line = lines.get(0).getAsString();
			JsonObject catalog = BaseCatalogData.createStandardDatabaseObject(
					"dataset:JThermodynamicsMetaAtomDefinition", owner, transactionID, publicS);
			try {
				MetaAtomLine atomline = metadef.parseToMetaAtom(line, false);
				String elementname = atomline.getElementName();
				String metaatomtype = atomline.getMetaAtomType();
				String metaatomname = atomline.getMetaAtomName();
				String nancy = atomline.getNancy();
				StructureAsCML cmlstruct = metadef.setUpStructureAsCML(nancy, elementname);
				IAtomContainer molecule = cmlstruct.getMolecule();
				JsonObject moleculestruct = GenerateJThermodynamics2DSpeciesStructure.generate(molecule);
				JsonObject metaatom = new JsonObject();
				catalog.add(ClassLabelConstants.JThermodynamicsMetaAtomInfo, metaatom);
				metaatom.add(ClassLabelConstants.JThermodynamics2DSpeciesStructure, moleculestruct);
				metaatom.addProperty(ClassLabelConstants.JThermodynamicsMetaAtomLabel, metaatomname);
				metaatom.addProperty(ClassLabelConstants.JThermodynamicsMetaAtomType, metaatomtype);
				metaatom.addProperty(ClassLabelConstants.JThermodynamicsStructureName, elementname);
				catalog.addProperty(ClassLabelConstants.JThermodynamics2DSpeciesLabel, elementname);
				catalog.addProperty(ClassLabelConstants.JThermodynamicsStructureSpecification, nancy);
				catalog.addProperty(ClassLabelConstants.JThermodynamicsSpeciesSpecificationType,
						"dataset:SpeciesSpecificationNancyLinearForm");
				
				JsonObject recordid = CreateDocumentTemplate.createTemplate("dataset:DatabaseRecordIDInfo");
				catalog.add(ClassLabelConstants.DatabaseRecordIDInfo, recordid);
				recordid.addProperty(ClassLabelConstants.CatalogObjectUniqueGenericLabel, metaatomname);
				
				Element row = table.addElement("tr");
				row.addElement("td").addText(position);
				row.addElement("td").addText(line);
			} catch (SQLException | CDKException e) {
				Element row = table.addElement("tr");
				row.addElement("td").addText(position);
				row.addElement("td").addText("Error: " + e.getMessage());
				catalog = null;
			}
			return catalog;
		}

		public boolean blockcheck(JsonObject parsed) {
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			return lines.size() == 1;
		}

		public Element setUpOutputTable(JsonObject parsed, Element body) {
			Element table = body.addElement("table");
			Element hrow = table.addElement("tr");
			hrow.addElement("th").addText("Position");
			hrow.addElement("th").addText("Line");
			return table;
		}
	}, ParseLinesJThermodynamicsDisassociationEnergy {

		@Override
		public Element setUpOutputTable(JsonObject info, Element body) {
			Element table = body.addElement("table");
			Element hrow = table.addElement("tr");
			hrow.addElement("th").addText("Position");
			hrow.addElement("th").addText("Structure");
			hrow.addElement("th").addText("Energy");
			return table;
		}

		@Override
		public boolean blockcheck(JsonObject parsed) {
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			return lines.size() == 2;
		}

		@Override
		public JsonObject interpret(JsonObject parsed, String owner, String transactionID, String publicS,
				Element table) {
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			String position = parsed.get(ClassLabelConstants.Position).getAsString();
	        StringTokenizer tok1 = new StringTokenizer(lines.get(0).getAsString());
			JsonObject catalog = BaseCatalogData.createStandardDatabaseObject(
					"dataset:JThermodynamicsDisassociationEnergy", owner, transactionID, publicS);
	        if(tok1.countTokens() == 5) {
	            StringTokenizer tok2 = new StringTokenizer(lines.get(1).getAsString());
	            if(tok2.countTokens() == 2) {
	                String energyS = tok1.nextToken();
	                String errorS  = tok1.nextToken();
	                String nameS   = tok1.nextToken();
	                @SuppressWarnings("unused")
	                String label1  = tok1.nextToken();
	                @SuppressWarnings("unused")
	                String label2  = tok1.nextToken();
	                @SuppressWarnings("unused")
					String startS  = tok2.nextToken();
	                String nancy   = tok2.nextToken();
	                StringToAtomContainer stringtoatom = new StringToAtomContainer(new HashSet<MetaAtomInfo>());
	                try {
	                IAtomContainer molecule = stringtoatom.stringToAtomContainer("NANCY", nancy);
	                molecule.setID(nameS);
	                JsonObject structure = GenerateJThermodynamics2DSpeciesStructure.generate(molecule);
	                Double energyD = Double.valueOf(energyS);
	                Double errorD = Double.valueOf(errorS);
					Element row = table.addElement("tr");
					catalog.add(ClassLabelConstants.JThermodynamics2DSpeciesStructure, structure);
					catalog.addProperty(ClassLabelConstants.DisassociationEnergyUncertainty,errorD.toString());
					catalog.addProperty(ClassLabelConstants.JThermodynamicsDisassociationEnergyValue,energyD.toString());
					
					row.addElement("td").addText(position);
					row.addElement("td").addText(nancy);
					row.addElement("td").addText(energyD.toString());
	                    StructureAsCML cml = new StructureAsCML(molecule);
	                    System.out.println(cml.getCmlStructureString());
	                } catch (CDKException ex) {
						Element row = table.addElement("tr");
						row.addElement("td").addText("Error: " + ex.getMessage()) ;
	                    Logger.getLogger(ReadDisassociationData.class.getName()).log(Level.SEVERE, null, ex);
	                    catalog = null;
	                } catch (ThermodynamicComputeException ex) {
						Element row = table.addElement("tr");
						row.addElement("td").addText(nancy);
						row.addElement("td").addText("Error: " + ex.getMessage()) ;
	                    catalog = null;
					}
	            }
	        }
			return catalog;
		}
		
	}, ParseLinesJThermodynamicsMolecule  {

		@Override
		public Element setUpOutputTable(JsonObject info, Element body) {
			return null;
		}

		@Override
		public boolean blockcheck(JsonObject parsed) {
			return false;
		}

		@Override
		public JsonObject interpret(JsonObject parsed, String owner, String transactionID, String publicS,
				Element table) {
			return null;
		}
		
	};
	

	/**
	 * @param info The transaction information (can be used for the table title)
	 * @param body The body of the document
	 * @return A table with the header elements corresponding to the lines in the loop
	 */
	public abstract Element setUpOutputTable(JsonObject info, Element body);

	/**
	 * @param parsed This is the isolated block
	 * @return true if the block satisfies the criteria for interpretation
	 */
	public abstract boolean blockcheck(JsonObject parsed);

	public abstract JsonObject interpret(JsonObject parsed, String owner, String transactionID, String publicS,
			Element table);

	public static JsonObject interpret(String transactionID, String owner, JsonObject prerequisites, JsonObject info) {
		Document document = MessageConstructor.startDocument("PartiionSetWithinRepositoryFile");
		Element body = MessageConstructor.isolateBody(document);
		JsonArray parsedlineset = TransactionProcess.retrieveSetOfOutputsFromTransaction(prerequisites,
				ClassLabelConstants.PartiionSetWithinRepositoryFile);
		InterpretTextBlock method = getMethod(info);
		JsonArray catalogset = new JsonArray();
		Element table = method.setUpOutputTable(info, body);
		int errorcnt = 0;
		for (int i = 0; i < parsedlineset.size(); i++) {
			JsonObject parsed = parsedlineset.get(i).getAsJsonObject();
			if (checkIfCompatableParse(parsed, info)) {
				JsonObject catalog = method.interpret(parsed, owner, transactionID, "false", table);
				if(catalog != null) {
					
					JsonObject recordid = catalog.get(ClassLabelConstants.DatabaseRecordIDInfo).getAsJsonObject();
					String maintainer = info.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
					recordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
					String datasetname = info.get(ClassLabelConstants.DatasetName).getAsString();
					recordid.addProperty(ClassLabelConstants.DatasetName, datasetname);
					String datasetversion = info.get(ClassLabelConstants.DatasetVersion).getAsString();
					recordid.addProperty(ClassLabelConstants.DatasetVersion, datasetversion);
					String status = info.get(ClassLabelConstants.CatalogDataObjectStatus).getAsString();
					recordid.addProperty(ClassLabelConstants.CatalogDataObjectStatus, status);
					
					BaseCatalogData.insertFirestoreAddress(catalog);
					
					catalogset.add(catalog);
					
					WriteFirestoreCatalogObject.writeCatalogObject(catalog);
					GenerateAndWriteRDFForObject.generate(catalog);
				} else {
					errorcnt++;
				}
			} else {
				errorcnt++;
			}
		}

		String message = "Successful: " + catalogset.size() + " blocks";
		if(errorcnt > 0) {
			message += " (Error count: " + errorcnt + ")";
		}
		JsonObject response = DatabaseServicesBase.standardServiceResponse(document, message, catalogset);
		return response;
	}

	private static InterpretTextBlock getMethod(JsonObject info) {
		String methodS = info.get(ClassLabelConstants.BlockInterpretationMethod).getAsString();
		if(methodS.startsWith("dataset:")) {
			methodS = methodS.substring(8);
		}
		return InterpretTextBlock.valueOf(methodS);
	}

	public static boolean checkIfCompatableParse(JsonObject parsed, JsonObject info) {
		String sourceformatinfo = info.get(ClassLabelConstants.FileSourceFormat).getAsString();
		String sourceformatparsed = parsed.get(ClassLabelConstants.FileSourceFormat).getAsString();
		return sourceformatinfo.equals(sourceformatparsed);
	}

}
