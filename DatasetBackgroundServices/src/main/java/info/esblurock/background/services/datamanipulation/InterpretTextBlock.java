package info.esblurock.background.services.datamanipulation;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.StringTokenizer;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.ManageDatasetCatalogObjects;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.firestore.WriteFirestoreData;
import info.esblurock.background.services.jthermodynamics.InterpretThermodynamicBlock;
import info.esblurock.background.services.jthermodynamics.structure.GenerateJThermodynamics2DSpeciesStructure;
import info.esblurock.background.services.jthermodynamics.symmetry.InterpretSymmetryBlock;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.CreateLinksInStandardCatalogInformation;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.utilities.GenericSimpleQueries;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import thermo.compute.utilities.StringToAtomContainer;
import thermo.data.structure.structure.BuildStructureLibrary;
import thermo.data.structure.structure.MetaAtomInfo;
import thermo.data.structure.structure.MetaAtomLine;
import thermo.data.structure.structure.StructureAsCML;
import thermo.exception.ThermodynamicComputeException;

public enum InterpretTextBlock {

	ParseLinesJThermodynamicsVibrationalStructure {

		@Override
		public Element setUpOutputTable(JsonObject parsed, Element body) {
			Element table = body.addElement("table");
			Element hrow = table.addElement("tr");
			hrow.addElement("th").addText("Label");
			hrow.addElement("th").addText("Species");
			hrow.addElement("th").addText("Frequency");
			return table;
		}

		public boolean blockcheck(JsonObject parsed) {
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			return lines.size() == 1;
		}

		@Override
		public JsonObject interpret(JsonObject parsed, Element table, JsonObject info) {
			JsonObject catalog = CreateDocumentTemplate
					.createTemplate("dataset:JThermodynamicsVibrationalStructureDataSet");
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			String position = parsed.get(ClassLabelConstants.Position).getAsString();
			if (lines.size() == 1) {
				StringTokenizer tok = new StringTokenizer(lines.get(0).getAsString());
				if (tok.countTokens() == 5) {
					String modename = tok.nextToken();
					String structure = tok.nextToken();
					String structurename = tok.nextToken();
					String frequency = tok.nextToken();
					String multiplicity = tok.nextToken();
					String molformat = info.get(ClassLabelConstants.JThermodynamicsSpeciesSpecificationType)
							.getAsString();
					String form = DatasetOntologyParseBase.getAltLabelFromAnnotation(molformat);
					catalog.addProperty(ClassLabelConstants.JThermodynamicsVibrationalModeLabel, modename);
					StringToAtomContainer stringtoatom = new StringToAtomContainer(new HashSet<MetaAtomInfo>());
					IAtomContainer molecule;
					try {
						// Interpret Structure
						molecule = stringtoatom.stringToAtomContainer(form, structure);
						molecule.setID(structurename);
						JsonObject structure2d = GenerateJThermodynamics2DSpeciesStructure.generate(molecule);
						catalog.add(ClassLabelConstants.JThermodynamics2DSpeciesStructure, structure2d);

						// Interpret Frequency
						JsonObject spec = info
								.get(ClassLabelConstants.ParameterSpecificationStructureVibrationFrequency)
								.getAsJsonObject();
						JsonObject value = CreateDocumentTemplate
								.createTemplate("dataset:StructureVibrationalFrequency");
						catalog.add(ClassLabelConstants.StructureVibrationalFrequency, value);
						value.add(ClassLabelConstants.ParameterSpecification, spec);
						value.addProperty(ClassLabelConstants.ValueUncertainty, "0.0");
						value.addProperty(ClassLabelConstants.ValueAsString, frequency);

						// Interpret multiplicity
						catalog.addProperty(ClassLabelConstants.StructureVibrationalFrequencySymmetry, multiplicity);

						Element row = table.addElement("tr");
						row.addElement("td").addText(structurename);
						row.addElement("td").addText(structure);
						row.addElement("td").addText(frequency);

					} catch (ThermodynamicComputeException e) {
						Element row = table.addElement("tr");
						row.addElement("td").addText(structurename);
						row.addElement("td").addText(e.toString());
						catalog = null;
						// e.printStackTrace();
					} catch (IllegalArgumentException e) {
						Element row = table.addElement("tr");
						row.addElement("td").addText(structurename);
						row.addElement("td").addText(structure);
						row.addElement("td").addText(e.toString());
						catalog = null;

					}

				} else {
					Element row = table.addElement("tr");
					row.addElement("td").addText("not the right number of elements on the line:" + tok.countTokens());
					catalog = null;
				}
			} else {
				Element row = table.addElement("tr");
				row.addElement("td").addText("Not just one line: " + lines.size());
				catalog = null;
			}
			return catalog;
		}

	},
	ParseLinesJThermodynamicsMetaAtoms {
		@Override
		public JsonObject interpret(JsonObject parsed, Element table, JsonObject info) {
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			String position = parsed.get(ClassLabelConstants.Position).getAsString();
			BuildStructureLibrary metadef = new BuildStructureLibrary(new HashSet<MetaAtomInfo>());
			String line = lines.get(0).getAsString();
			JsonObject catalog = CreateDocumentTemplate
					.createTemplate("dataset:JThermodynamicsMetaAtomDefinitionDataSet");
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
	},
	ParseLinesJThermodynamicsDisassociationEnergy {

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
		public JsonObject interpret(JsonObject parsed, Element table, JsonObject info) {
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			String position = parsed.get(ClassLabelConstants.Position).getAsString();
			StringTokenizer tok1 = new StringTokenizer(lines.get(0).getAsString());
			JsonObject catalog = CreateDocumentTemplate
					.createTemplate("dataset:JThermodynamicsDisassociationEnergyOfStructureDataSet");
			if (tok1.countTokens() == 5) {
				StringTokenizer tok2 = new StringTokenizer(lines.get(1).getAsString());
				if (tok2.countTokens() == 2) {
					@SuppressWarnings("unused")
					String label11 = tok1.nextToken();
					@SuppressWarnings("unused")
					String label12 = tok1.nextToken();
					String energyS = tok1.nextToken();
					String errorS = tok1.nextToken();
					String nameS = tok1.nextToken();
					@SuppressWarnings("unused")
					String label21 = tok2.nextToken();
					String nancy = tok2.nextToken();
					StringToAtomContainer stringtoatom = new StringToAtomContainer(new HashSet<MetaAtomInfo>());
					try {
						String molformat = info.get(ClassLabelConstants.JThermodynamicsSpeciesSpecificationType)
								.getAsString();
						String form = DatasetOntologyParseBase.getAltLabelFromAnnotation(molformat);
						IAtomContainer molecule = stringtoatom.stringToAtomContainer(form, nancy);
						molecule.setID(nameS);
						JsonObject structure = GenerateJThermodynamics2DSpeciesStructure.generate(molecule);
						Double energyD = Double.valueOf(energyS);
						Double errorD = Double.valueOf(errorS);
						Element row = table.addElement("tr");
						JsonObject spec = info.get(ClassLabelConstants.ParameterSpecificationHDisassociationEnergy)
								.getAsJsonObject();
						JsonObject value = CreateDocumentTemplate
								.createTemplate("dataset:JThermodynamicDisassociationEnergy");
						catalog.add(ClassLabelConstants.JThermodynamicDisassociationEnergy, value);
						value.add(ClassLabelConstants.ParameterSpecification, spec);
						value.addProperty(ClassLabelConstants.ValueUncertainty, errorD.toString());
						value.addProperty(ClassLabelConstants.ValueAsString, energyD.toString());
						catalog.add(ClassLabelConstants.JThermodynamics2DSpeciesStructure, structure);
						row.addElement("td").addText(position);
						row.addElement("td").addText(nancy);
						row.addElement("td").addText(energyD.toString());
					} catch (ThermodynamicComputeException ex) {
						Element row = table.addElement("tr");
						row.addElement("td").addText(nancy);
						row.addElement("td").addText("Error: " + ex.getMessage());
						catalog = null;
					}
				}
			}
			return catalog;
		}

	},
	ParseLinesJThermodynamicsMolecule {

		@Override
		public Element setUpOutputTable(JsonObject info, Element body) {
			Element table = body.addElement("table");
			Element hrow = table.addElement("tr");
			hrow.addElement("th").addText("Molecule");
			hrow.addElement("th").addText("Enthalpy");
			hrow.addElement("th").addText("Entropy");
			return table;
		}

		@Override
		public boolean blockcheck(JsonObject parsed) {
			boolean ans = parsed.get(ClassLabelConstants.RepositoryDataPartitionBlock) != null;
			return ans;
		}

		@Override
		public JsonObject interpret(JsonObject parsed, Element table, JsonObject info) {
			return InterpretThermodynamicBlock.interpretMolecularThermodynamics(parsed, table, info);
		}

	},
	ParseLinesJThermodynamicsSubstructures {

		@Override
		public Element setUpOutputTable(JsonObject info, Element body) {
			Element table = body.addElement("table");
			Element hrow = table.addElement("tr");
			hrow.addElement("th").addText("Substructure");
			hrow.addElement("th").addText("Enthalpy");
			hrow.addElement("th").addText("Entropy");
			return table;
		}

		@Override
		public boolean blockcheck(JsonObject parsed) {
			boolean ans = parsed.get(ClassLabelConstants.RepositoryDataPartitionBlock) != null;
			return ans;
		}

		@Override
		public JsonObject interpret(JsonObject parsed, Element table, JsonObject info) {
			return InterpretThermodynamicBlock.interpretSubstructureThermodynamics(parsed, table, info);
		}

	},
	ParseLinesJThermodynamicsBensonRules {

		@Override
		public Element setUpOutputTable(JsonObject info, Element body) {
			Element table = body.addElement("table");
			Element hrow = table.addElement("tr");
			hrow.addElement("th").addText("Benson Rule");
			hrow.addElement("th").addText("Enthalpy");
			hrow.addElement("th").addText("Entropy");
			return table;
		}

		@Override
		public boolean blockcheck(JsonObject parsed) {
			boolean ans = parsed.get(ClassLabelConstants.RepositoryDataPartitionBlock) != null;
			return ans;
		}

		@Override
		public JsonObject interpret(JsonObject parsed, Element table, JsonObject info) {
			return InterpretThermodynamicBlock.interpretBensonRuleThermodynamics(parsed, table, info);
		}

	},
	ParseLinesJThermodynamicsSymmetryDefinition {

		@Override
		public Element setUpOutputTable(JsonObject info, Element body) {
			Element table = body.addElement("table");
			Element hrow = table.addElement("tr");
			hrow.addElement("th").addText("Symmetry Label");
			hrow.addElement("th").addText("Symmetry Type");
			hrow.addElement("th").addText("Structure");
			hrow.addElement("th").addText("Symmetry");
			return table;
		}

		@Override
		public boolean blockcheck(JsonObject parsed) {
			boolean ans = parsed.get(ClassLabelConstants.RepositoryDataPartitionBlock) != null;
			return ans;
		}

		@Override
		public JsonObject interpret(JsonObject parsed, Element table, JsonObject info) {
			JsonArray lines = parsed.get(ClassLabelConstants.ParsedLine).getAsJsonArray();
			String content = lines.get(0).getAsString();
			JsonObject catalog = InterpretSymmetryBlock.interpret(content, table);
			return catalog;
		}

	};

	/**
	 * @param info The transaction information (can be used for the table title)
	 * @param body The body of the document
	 * @return A table with the header elements corresponding to the lines in the
	 *         loop
	 */
	public abstract Element setUpOutputTable(JsonObject info, Element body);

	/**
	 * @param parsed This is the isolated block
	 * @return true if the block satisfies the criteria for interpretation
	 */
	public abstract boolean blockcheck(JsonObject parsed);

	public abstract JsonObject interpret(JsonObject parsed, Element table, JsonObject info);

	/**
     * @param event: The transaction (DatasetCollectionObjectSetWriteTransaction)
     * @param prerequisites The prerequisite is of type 'RepositoryDataPartitionBlock'
     * @param info The info needed to make the interpretation
     * @return The response.
     * 
     * info:
     * DatasetSpecificationForCollectionSet
     * BlockInterpretationMethod
     * The parameter unit information needed to interpret the block
     * 
     * 
     * This creates the set of catalog objects and then, using ManageDatasetCatalogObjects.writeSetOfCatalogObjects
     * the catalog objects are written. Those which already exist in the database are deleted
     * (within the writeSetOfCatalogObjects call) and the new values are written in their place.
     * This assumes that the catalog name, CatalogObjectKey, represents the specific catalog object.
     * 
     */
    public static JsonObject interpret(JsonObject event, JsonObject prerequisites, JsonObject info) {
    	JsonObject response = null;
    	try {
        String owner = event.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
        String transactionID = event.get(ClassLabelConstants.TransactionID).getAsString();
        JsonObject datasetspec = info.get(ClassLabelConstants.SpecificationForDataset)
                .getAsJsonObject();
        String genericlabel = datasetspec.get(ClassLabelConstants.CatalogObjectUniqueGenericLabel).getAsString();
        event.add(ClassLabelConstants.SpecificationForDataset, datasetspec);
        JsonObject transfirestoreID = BaseCatalogData.insertFirestoreAddress(event);
        Document document = MessageConstructor.startDocument("TransactionInterpretTextBlock");
        Element body = MessageConstructor.isolateBody(document);
        int errorcnt = 0;
        JsonArray catalogset = new JsonArray();
        JsonArray parsedlineset = TransactionProcess.retrieveSetOfOutputsFromTransaction(prerequisites,
                ClassLabelConstants.PartiionSetWithinRepositoryFile);
        body.addElement("div").addText("Processing " + parsedlineset.size() + " blocks");
        InterpretTextBlock method = getMethod(info);
        Element table = method.setUpOutputTable(info, body);
        
        JsonArray errors = new JsonArray();
        for (int i = 0; i < parsedlineset.size(); i++) {
            JsonObject parsed = parsedlineset.get(i).getAsJsonObject();
            if (checkIfCompatableParse(parsed, info)) {
                JsonObject catalog = method.interpret(parsed, table, info);
                if (catalog != null) {
                	catalog.addProperty(ClassLabelConstants.CatalogObjectUniqueGenericLabel, genericlabel);
                    catalog.add(ClassLabelConstants.SpecificationForDataset, datasetspec);
                    catalog.add(ClassLabelConstants.FirestoreCatalogIDForTransaction, transfirestoreID.deepCopy());
                    BaseCatalogData.insertStandardBaseInformation(catalog, owner, transactionID, "false", true);
                    CreateLinksInStandardCatalogInformation.transfer(info, catalog);
                    CreateLinksInStandardCatalogInformation.transfer(parsed, catalog);
                    CreateLinksInStandardCatalogInformation.linkCatalogObjects(parsed,
                            "dataset:ConceptLinkRepositoryPartitionToInterpretation", catalog);
                    catalogset.add(catalog);
                    addToChemConnectDatabaseObjectsForLabel(event, catalog);
     
                } else {
                    errors.add(parsed);
                    errorcnt++;
                }
            } else {
                String sourceformatinfo = info.get(ClassLabelConstants.FileSourceFormat).getAsString();
                String sourceformatparsed = parsed.get(ClassLabelConstants.FileSourceFormat).getAsString();
                body.addElement("div")
                        .addText("Incompatable parse: Expected: " + sourceformatinfo + " Got: " + sourceformatparsed);
                errorcnt++;
            }
        }
        String classname = "";
        if (errorcnt == 0) {
            if (catalogset.size() > 0) {
                JsonObject catalog = catalogset.get(0).getAsJsonObject();
                classname = catalog.get(ClassLabelConstants.DatabaseObjectType).getAsString();
                event.addProperty(ClassLabelConstants.DatasetCollectionObjectType, classname);
        		JsonArray set = new JsonArray();
        		Element writetable = body.addElement("table");
        		Element hrow = writetable.addElement("tr");
        		hrow.addElement("th").addText("Name");
        		hrow.addElement("th").addText("Message");
        		for (int i = 0; i < catalogset.size(); i++) {
        			Element row = writetable.addElement("tr");
        			JsonObject interpreted = catalogset.get(i).getAsJsonObject();
        			String message = WriteFirestoreCatalogObject.writeCatalogObject(interpreted);
        			String name = catalog.get(ClassLabelConstants.CatalogObjectKey).getAsString();
        			row.addElement("td").addText(name);
        			row.addElement("td").addText(message);
        			set.add(catalog);
        		}

                JsonObject genericset = addToChemConnectDatabaseUniqueGenericLabelSet(event,info);
                if(genericset == null) {
                	errors.add("ERROR: trouble adding the DatabaseUniqueGenericLabelSet");
                }

        		String message = "Successful: " + catalogset.size() + " blocks of '" + classname + "' objects";
        		response = DatabaseServicesBase.standardServiceResponse(document, message, catalogset);
               /*
                response = ManageDatasetCatalogObjects.writeSetOfCatalogObjects(event, classname, datasetspec, catalogset);
                MessageConstructor.combineBodyIntoDocument(document, response.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
                String message = "Successful: " + catalogset.size() + " blocks of '" + classname + "' objects";
                response = DatabaseServicesBase.standardServiceResponse(document, message, catalogset);
                */
            } else {
                String errormessage = "No objects created for interpret";
                response = DatabaseServicesBase.standardErrorResponse(document, errormessage, null);
            }
            
        } else {
            String errormessage = "Errors found in parsing blocks";
            Element div = body.addElement("div");
            Element title = div.addElement("div","Block positions were errors occurred");
            Element ul = div.addElement("ul");
            for(int i=0; i<errors.size(); i++) {
                JsonObject parse = errors.get(i).getAsJsonObject();
                ul.addElement("li",parse.get(ClassLabelConstants.Position).getAsString());
            }
            response = DatabaseServicesBase.standardErrorResponse(document, errormessage, errors);
        }

        
    	} catch(Exception ex) {
    		ex.printStackTrace();
    	}
    	return response;
    }

	private static InterpretTextBlock getMethod(JsonObject info) {
		String methodS = info.get(ClassLabelConstants.BlockInterpretationMethod).getAsString();
		if (methodS.startsWith("dataset:")) {
			methodS = methodS.substring(8);
		}
		return InterpretTextBlock.valueOf(methodS);
	}

	public static boolean checkIfCompatableParse(JsonObject parsed, JsonObject info) {
		String sourceformatinfo = info.get(ClassLabelConstants.FileSourceFormat).getAsString();
		String sourceformatparsed = parsed.get(ClassLabelConstants.FileSourceFormat).getAsString();
		return sourceformatinfo.equals(sourceformatparsed);
	}

	private static JsonObject addToChemConnectDatabaseObjectsForLabel(JsonObject event, JsonObject catalog) {
		JsonObject created = createChemConnectDatabaseObjectsForLabel(event,catalog);
		JsonObject firestoreid = created.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
		String simplename = firestoreid.get(ClassLabelConstants.SimpleCatalogName).getAsString();
		System.out.println("addToChemConnectDatabaseObjectsForLabel simplename=" + simplename);
		JsonObject response = ReadFirestoreInformation.readFirestoreCatalogObject(firestoreid);
		System.out.println("addToChemConnectDatabaseObjectsForLabel response=" + response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean());
		JsonObject objforlabel = null;
		if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			if (!response.get(ClassLabelConstants.SimpleCatalogObject).isJsonNull()) {
				JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				System.out.println("addToChemConnectDatabaseObjectsForLabel size=" + arr.size());
				if (arr.size() > 0) {
					objforlabel = arr.get(0).getAsJsonObject();
					System.out.println("addToChemConnectDatabaseObjectsForLabel id=" +objforlabel.get(ClassLabelConstants.CatalogObjectKey).toString());
				} else {
					objforlabel = null;
				}
			} else {
				objforlabel = null;
			}
		} else {
			objforlabel = created;
			firestoreid.addProperty(ClassLabelConstants.SimpleCatalogName,simplename);
		}
		
		if (objforlabel != null) {
			JsonObject datasetid = catalog.get(ClassLabelConstants.SpecificationForDataset).getAsJsonObject();
			String uniquelabelString = datasetid.get(ClassLabelConstants.CatalogObjectUniqueGenericLabel).getAsString();
			JsonArray names = objforlabel.get(ClassLabelConstants.CatalogObjectUniqueGenericLabel).getAsJsonArray();
			names.add(uniquelabelString);
			String message = WriteFirestoreCatalogObject.writeCatalogObject(objforlabel);
			if (message.startsWith("ERROR")) {
				objforlabel = null;
			}
		}
		return objforlabel;
	}
	
	private static JsonObject createChemConnectDatabaseObjectsForLabel(JsonObject event, JsonObject catalog) {
		String owner = event.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
		String transactionID = event.get(ClassLabelConstants.TransactionID).getAsString();
		JsonObject datasetid = catalog.get(ClassLabelConstants.SpecificationForDataset).getAsJsonObject();
		String maintainer = datasetid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		String objtype = datasetid.get(ClassLabelConstants.DatasetObjectType).getAsString();
		JsonObject genericset = BaseCatalogData.createStandardDatabaseObject("dataset:ChemConnectDatabaseObjectsForLabel", 
				owner, transactionID, "false");

		genericset.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		genericset.addProperty(ClassLabelConstants.DatasetObjectType,objtype );
		
		String uniquelabelString = datasetid.get(ClassLabelConstants.CatalogObjectUniqueGenericLabel).getAsString();
		String id = catalog.get(ClassLabelConstants.CatalogObjectKey).getAsString();
		System.out.println("createChemConnectDatabaseObjectsForLabel id=                " + id);
		System.out.println("createChemConnectDatabaseObjectsForLabel uniquelabelString= " + uniquelabelString);
		genericset.addProperty(ClassLabelConstants.CatalogObjectKeyLabel,id);
		genericset.addProperty(ClassLabelConstants.CatalogObjectKey,id);

		BaseCatalogData.insertFirestoreAddress(genericset);
		return genericset;
		
	}
	
	/**
	 * @param event The transaction
	 * @param info  The activity info
	 * @return The current ChemConnectDatabaseUniqueGenericLabelSet, null if
	 *         something went wrong
	 * 
	 *         The necessary information is extracted from the transaction and the
	 *         info.
	 * 
	 *         This routine creates a ChemConnectDatabaseUniqueGenericLabelSet
	 *         (using createChemConnectDatabaseUniqueGenericLabelSet) using the
	 *         generated firestoreID, the database is checked if one already exists.
	 *         if no, the generated catalog object is used, if yes, then the one
	 *         from the database is used.
	 * 
	 *         The new ChemConnectDatabaseUniqueGenericLabelSet is added (using
	 *         addGenericLabel)
	 */
	private static JsonObject addToChemConnectDatabaseUniqueGenericLabelSet(JsonObject event, JsonObject info) {
		JsonObject created = createChemConnectDatabaseUniqueGenericLabelSet(event, info);
		
		JsonObject firestoreid = created.get(ClassLabelConstants.FirestoreCatalogID).getAsJsonObject();
		String simplename = firestoreid.get(ClassLabelConstants.SimpleCatalogName).getAsString();
		JsonObject response = ReadFirestoreInformation.readFirestoreCollection(null,firestoreid);
		JsonObject genericset = null;
		if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			if (!response.get(ClassLabelConstants.SimpleCatalogObject).isJsonNull()) {
				JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				if (arr.size() > 0) {
					genericset = arr.get(0).getAsJsonObject();
				} else {
					genericset = null;
				}
			} else {
				genericset = null;
			}
		} else {
			genericset = created;
			firestoreid.addProperty(ClassLabelConstants.SimpleCatalogName,simplename);
		}

		if (genericset != null) {
			JsonObject datasetid = info.get(ClassLabelConstants.SpecificationForDataset).getAsJsonObject();
			String uniquelabelString = datasetid.get(ClassLabelConstants.CatalogObjectUniqueGenericLabel).getAsString();
			JsonObject descr = event.get(ClassLabelConstants.ShortTransactionDescription).getAsJsonObject();
			String title = descr.get(ClassLabelConstants.DescriptionTitleTransaction).getAsString();
			addGenericLabel(genericset, title, uniquelabelString);

			String message = WriteFirestoreCatalogObject.writeCatalogObject(genericset);
			if (message.startsWith("ERROR")) {
				genericset = null;
			}
		}
		return genericset;
	}

	/**
	 * @param event The current transaction
	 * @param info  The current info
	 * @return The generated ChemConnectDatabaseUniqueGenericLabelSet
	 * 
	 *         The necessary information is extracted from the transaction and the
	 *         info.
	 */
	private static JsonObject createChemConnectDatabaseUniqueGenericLabelSet(JsonObject event, JsonObject info) {
		String owner = event.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
		String transactionID = event.get(ClassLabelConstants.TransactionID).getAsString();
		JsonObject datasetid = info.get(ClassLabelConstants.SpecificationForDataset).getAsJsonObject();
		String maintainer = datasetid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		String objtype = datasetid.get(ClassLabelConstants.DatasetObjectType).getAsString();
		JsonObject genericset = BaseCatalogData.createStandardDatabaseObject("dataset:ChemConnectDatabaseUniqueGenericLabelSet", 
				owner, transactionID, "false");

		genericset.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		genericset.addProperty(ClassLabelConstants.DatasetObjectType,objtype );

		BaseCatalogData.insertFirestoreAddress(genericset);
		return genericset;
	}

	/**
	 * @param genericset        The current ChemConnectDatabaseUniqueGenericLabelSet
	 * @param title             The title extracted from the transaction
	 * @param uniquelabelString The unique label extracted from info
	 * 
	 *                          A new UniqueGenericLabelSpecification is created and
	 *                          added to the
	 *                          ChemConnectDatabaseUniqueGenericLabelSet
	 * 
	 */
	private static void addGenericLabel(JsonObject genericset, String title, String uniquelabelString) {
		JsonObject uniqueelement = new JsonObject();
		uniqueelement.addProperty(ClassLabelConstants.CatalogObjectUniqueGenericLabel, uniquelabelString);
		uniqueelement.addProperty(ClassLabelConstants.DescriptionTitle, title);
		JsonArray set = genericset.get(ClassLabelConstants.UniqueGenericLabelSpecification).getAsJsonArray();
		set.add(uniqueelement);
	}

}
