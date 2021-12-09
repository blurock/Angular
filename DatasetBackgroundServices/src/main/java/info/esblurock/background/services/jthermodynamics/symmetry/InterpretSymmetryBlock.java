package info.esblurock.background.services.jthermodynamics.symmetry;

import java.io.StringReader;
import java.io.StringWriter;

import org.json.JSONObject;
import org.json.XML;
import org.openscience.cdk.exception.CDKException;
import org.w3c.dom.Document;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.utilities.XMLUtilityRoutines;
import info.esblurock.background.services.jthermodynamics.structure.GenerateJThermodynamics2DSpeciesStructure;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import thermo.data.structure.structure.StructureAsCML;

public class InterpretSymmetryBlock {

	/**
	 * Create JThermodynamicsSymmetryStructureDefinition
	 * 
	 * @param xml The XML representation in string form of
	 *            JThermodynamicsSymmetryStructureDefinition
	 * @return The JsonObject representation of
	 *         JThermodynamicsSymmetryStructureDefinition
	 */
	public static JsonObject interpret(String xmlString) {
		Document xml = XMLUtilityRoutines.convertStringToXMLDocument(xmlString);
		return interpret(xml);
	}

	/**
	 * Create JThermodynamicsSymmetryStructureDefinition
	 * 
	 * @param xml The XML representation of
	 *            JThermodynamicsSymmetryStructureDefinition
	 * @return The JsonObject representation of
	 *         JThermodynamicsSymmetryStructureDefinition
	 */
	public static JsonObject interpret(Document xml) {
		JsonObject speciesstructure = interpretStructure(xml);
		JsonObject symmetry = interpretSymmetry(xml);
		JsonObject catalog = CreateDocumentTemplate
				.createTemplate("dataset:JThermodynamicsSymmetryStructureDefinition");
		catalog.add(ClassLabelConstants.JThermodynamicsSymmetryDefinition, symmetry);
		catalog.add(ClassLabelConstants.JThermodynamics2DGraphicalSubStructure, speciesstructure);
		return catalog;
	}

	private static JsonObject interpretStructure(Document doc) {
		JsonObject structure = null;
		String strObject = XMLUtilityRoutines.retrieveAsStringFromDocument(doc,"molecule");
		try {
			StructureAsCML cmlstruct = new StructureAsCML("Name", strObject);
			structure = GenerateJThermodynamics2DSpeciesStructure.generate(cmlstruct.getMolecule());

		} catch (CDKException ex) {
			System.out.println(ex);
		}
		return structure;
	}

	static JsonObject interpretSymmetry(Document doc) {
		JsonObject symmetry = XMLUtilityRoutines.getJsonObjectFromDocument(doc, ClassLabelConstants.JThermodynamicsSymmetryDefinition);
		if (!symmetry.get(ClassLabelConstants.JThermodynamicsSymmetryNodeGroupDefinition).isJsonArray()) {
			JsonObject nodedef = symmetry.get(ClassLabelConstants.JThermodynamicsSymmetryNodeGroupDefinition)
					.getAsJsonObject();
			JsonArray arr = new JsonArray();
			arr.add(nodedef);
			symmetry.add(ClassLabelConstants.JThermodynamicsSymmetryNodeGroupDefinition, arr);
		}
		return symmetry;
	}

}
