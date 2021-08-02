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

public class CreateHierarchyElement {

	static String topOfHierarchy = "dataset:CollectionDocumentHierarchy";
	static String simpleName = "dataset:DatasetCatalogHierarchySimpleName";

	public static JsonArray searchForCatalogObjectInHierarchyTemplate(String catalogC, JsonObject json) {
		JsonArray pairs = new JsonArray();
		JsonObject pair = initialCollectionDocumentIDPair();
		ClassificationHierarchy hierarchy = DatabaseOntologyClassification.getClassificationHierarchy(topOfHierarchy);
		search(hierarchy, json, pairs, pair, catalogC);
		return pairs;
	}

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
				if (!hierarchy.getClassification().equals("dataset:CollectionDocumentHierarchy")) {
					String genname = generateHierarchyName(hierarchy.getClassification(), catalogC, json);
					pair = UpdateHierarchyList(hierarchy.getClassification(), genname, pair, pairs);
				}
			}
		}
		if (hierarchy.getClassification().equals("dataset:CollectionDocumentHierarchy")) {
			addPairToArray(pair, pairs);
		}
		return foundB;
	}

	public static JsonObject UpdateHierarchyList(String hierclass, String genname, JsonObject json, JsonArray pairs) {
		String type = DatasetOntologyParseBase.getValueFromAnnotation(hierclass, OntologyObjectLabels.dctype);
		if (type.equals("dataset:DatasetCatalogHierarchySimpleName")) {
			json = addInCollectionDocumentIDPair(ClassLabelConstants.DatasetDocumentID, genname, json, pairs);
		} else if (type.equals("dataset:DatasetCatalogHierarchyDataCatalog")) {
			json = addInCollectionDocumentIDPair(ClassLabelConstants.DatasetCollectionID, genname, json, pairs);
		} else if (type.equals("dataset:DatasetCatalogHierarchyCollection")) {
			json = addInCollectionDocumentIDPair(ClassLabelConstants.DatasetCollectionID, genname, json, pairs);
		} else if (type.equals("dataset:DatasetCatalogHierarchyDocument")) {
			json = addInCollectionDocumentIDPair(ClassLabelConstants.DatasetDocumentID, genname, json, pairs);
		}
		return json;
	}

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

	private static void addPairToArray(JsonObject json, JsonArray pairs) {
		pairs.add(json);
		for (JsonElement ele : pairs) {
			JsonObject obj = (JsonObject) ele;
			int level = obj.get(ClassLabelConstants.DatasetIDLevel).getAsInt();
			level++;
			obj.addProperty(ClassLabelConstants.DatasetIDLevel, level);
		}
	}

	private static JsonObject initialCollectionDocumentIDPair() {
		JsonObject json = new JsonObject();
		json.addProperty(ClassLabelConstants.DatasetIDLevel, 0);
		return json;
	}

	/**
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
