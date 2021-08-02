package info.esblurock.reaction.core.ontology.base.hierarchy;

import java.util.Iterator;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.classification.ClassificationHierarchy;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

/**
 * @author edwardblurock
 * 
 * This class generates the FirestoreCatalogID as an array of CollectionDocumentIDPair
 * The elements of the CollectionDocumentIDPair are generated as specified by
 * the subclass of the CollectionDocumentHierarchy:
 * rdfs:isDefinedBy: How the label is to be derived
 * dc:type: Which element in CollectionDocumentIDPair to fill in
 * 
 * The main routine: {@link searchForCatalogObjectInHierarchyTemplate}
 *
 */
public class CreateHierarchyElement {

	static String topOfHierarchy = "dataset:CollectionDocumentHierarchy";
	static String simpleName = "dataset:DatasetCatalogHierarchySimpleName";
	static String datacatalog = "dataset:DatasetCatalogHierarchyDataCatalog";
	static String collection = "dataset:DatasetCatalogHierarchyCollection";
	static String document = "dataset:DatasetCatalogHierarchyDocument";

	/** Generate the FirestoreCatalogID from the class
	 * 
	 * The classname and the catalog object is used to generate the FirestoreCatalogID.
	 * The catalog object and classname elements may be used in deteriming the document 
	 * and collection names of the firestore hierarchy.
	 * 
	 * @param catalogC The classname of the catalog object
	 * @param json The catalog object
	 * 
	 * @return An array of CollectionDocumentIDPair (FirestoreCatalogID)
	 */
	public static JsonArray searchForCatalogObjectInHierarchyTemplate(String catalogC, JsonObject json) {
		JsonArray pairs = new JsonArray();
		JsonObject pair = initialCollectionDocumentIDPair();
		ClassificationHierarchy hierarchy = DatabaseOntologyClassification.getClassificationHierarchy(topOfHierarchy);
		search(hierarchy, json, pairs, pair, catalogC);
		return pairs;
	}

	/** Search down the classification hierarchy and fill in FirestoreCatalogID
	 * 
	 * @param hierarchy The classification hierarchy starting with dataset:CollectionDocumentHierarchy
	 * @param json The catalog object in json form
	 * @param pairs The current array of CollectionDocumentIDPair (FirestoreCatalogID)
	 * @param pair the CollectionDocumentIDPair being built
	 * @param catalogC The classname of the catalog object
	 * @return true if the end point of the hierarch y has been found and the FirestoreCatalogID is being filled in
	 */
	private static boolean search(ClassificationHierarchy hierarchy, JsonObject json, JsonArray pairs, JsonObject pair,
			String catalogC) {
		boolean foundB = false;
		String member = OntologyUtilityRoutines.exactlyOnePropertySingle(hierarchy.getClassification(),
				OntologyObjectLabels.member);

		if (member != null) {
			if (member.equals(catalogC)) {
				foundB = true;
			}
		}
		if (foundB) {
			String genname = generateHierarchyName(hierarchy.getClassification(), catalogC, json);
			UpdateHierarchyList(hierarchy.getClassification(), genname, pair, pairs);
		} else if (hierarchy.getSubclassificatons() != null) {
			Iterator<ClassificationHierarchy> iter = hierarchy.getSubclassificatons().iterator();
			while (iter.hasNext() && !foundB) {
				ClassificationHierarchy hier = iter.next();
				foundB = search(hier, json, pairs, pair, catalogC);
			}
			if (foundB) {
				if (!hierarchy.getClassification().equals(topOfHierarchy)) {
					String genname = generateHierarchyName(hierarchy.getClassification(), catalogC, json);
					pair = UpdateHierarchyList(hierarchy.getClassification(), genname, pair, pairs);
				}
			}
		}
		if (hierarchy.getClassification().equals(topOfHierarchy)) {
			addPairToArray(pair, pairs);
		}
		return foundB;
	}

	/**
	 * @param hierclass the current hierarchy class name
	 * @param genname The generated name (as given by the hierarchy class)
	 * @param json The current CollectionDocumentIDPair being filled in
	 * @param pairs The current array of CollectionDocumentIDPair (FirestoreCatalogID)
	 * @return The new CollectionDocumentIDPair 
	 * 
	 * From the hierarchy class, what name is to be filled in (document or collection) is determined
	 * This determined the position in the CollectionDocumentIDPair 
	 * addInCollectionDocumentIDPair determines how the pair is to be updated.
	 * 
	 */
	public static JsonObject UpdateHierarchyList(String hierclass, String genname, JsonObject json, JsonArray pairs) {
		String type = DatasetOntologyParseBase.getValueFromAnnotation(hierclass, OntologyObjectLabels.dctype);
		if (type.equals(simpleName)) {
			json = addInCollectionDocumentIDPair(ClassLabelConstants.DatasetDocumentID, genname, json, pairs);
		} else if (type.equals(datacatalog)) {
			json = addInCollectionDocumentIDPair(ClassLabelConstants.DatasetCollectionID, genname, json, pairs);
		} else if (type.equals(collection)) {
			json = addInCollectionDocumentIDPair(ClassLabelConstants.DatasetCollectionID, genname, json, pairs);
		} else if (type.equals(document)) {
			json = addInCollectionDocumentIDPair(ClassLabelConstants.DatasetDocumentID, genname, json, pairs);
		}
		return json;
	}

	/** Fill in the CollectionDocumentIDPair
	 * 
	 * @param genname The generated name
	 * @param identifier The position in CollectionDocumentIDPair
	 * @param json the current CollectionDocumentIDPair
	 * @param pairs The current array of CollectionDocumentIDPair (FirestoreCatalogID)
	 * @return The 'new' current CollectionDocumentIDPair
	 * 
	 * This fills in the CollectionDocumentIDPair
	 * If the element pointed to by the identifier is non-null, this means
	 * that the CollectionDocumentIDPair is full and should be added to the FirestoreCatalogID.
	 * if this is true, then a new (empty) CollectionDocumentIDPair is generated and filled in.
	 * 
	 */
	private static JsonObject addInCollectionDocumentIDPair(String genname, String identifier, JsonObject json,
			JsonArray pairs) {
		if (json.get(identifier) == null) {
			json.addProperty(identifier, genname);
		} else {
			JsonObject newjson = initialCollectionDocumentIDPair();
			newjson.addProperty(identifier, genname);
			addPairToArray(json, pairs);
			json = newjson;
		}
		return json;
	}

	/** Add a CollectionDocumentIDPair to the FirestoreCatalogID and update the levels
	 * @param json The CollectionDocumentIDPair to add
	 * @param pairs The FirestoreCatalogID
	 */
	private static void addPairToArray(JsonObject json, JsonArray pairs) {
		pairs.add(json);
		for (JsonElement ele : pairs) {
			JsonObject obj = (JsonObject) ele;
			int level = obj.get(ClassLabelConstants.DatasetIDLevel).getAsInt();
			level++;
			obj.addProperty(ClassLabelConstants.DatasetIDLevel, level);
		}
	}

	/** Create an empty CollectionDocumentIDPair (level is set to zero).
	 * @return An initial CollectionDocumentIDPair
	 */
	private static JsonObject initialCollectionDocumentIDPair() {
		JsonObject json = new JsonObject();
		json.addProperty(ClassLabelConstants.DatasetIDLevel, 0);
		return json;
	}

	/** Generate the Hierarchy name
	 * 
	 * Derive a name given the hierarchy class name
	 * 
	 * @param hierclass The hierarchy class name
	 * @param classname The class name of the object
	 * @param json      The object in JsonObject form
	 * @return The derived name
	 */
	public static String generateHierarchyName(String hierclass, String classname, JsonObject json) {
		String isdefinedby = DatasetOntologyParseBase.getValueFromAnnotation(hierclass,
				OntologyObjectLabels.isDefinedBy);
		String isdefinedbyShort = isdefinedby.substring(8);
		String name = GenerateStringLabel.valueOf(isdefinedbyShort).deriveName(classname, json);
		return name;
	}

}
