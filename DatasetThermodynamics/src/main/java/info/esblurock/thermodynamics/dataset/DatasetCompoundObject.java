package info.esblurock.thermodynamics.dataset;

import java.util.Iterator;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.AltLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CompoundObjectDimensionInformation;
import info.esblurock.reaction.core.ontology.base.dataset.CompoundObjectDimensionSet;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.dataset.ParseCompoundObject;

public class DatasetCompoundObject {
	
	public static String compoundObjectName = "ChemConnectCompoundStructure";
	public static String primitiveObjectName = "ChemConnectPrimitiveDataStructure";
	public static String identifierlabel = "dcterms:identifier";
	
	public static JsonObject fillCompoundObject(String classname) {
		String identifier = DatasetOntologyParseBase.getIDFromAnnotation(classname);
		JsonObject top = new JsonObject();
		CompoundObjectDimensionSet set = ParseCompoundObject.compoundObjectDimensionObjects(classname);
		Iterator<CompoundObjectDimensionInformation> iter = set.iterator();
		top.addProperty(identifierlabel, identifier);		
		while(iter.hasNext()) {
			CompoundObjectDimensionInformation info = iter.next();
			String dimidentifier = DatasetOntologyParseBase.getIDFromAnnotation(info.getClassname());
			if(info.isCompoundobject()) {
				if(info.isSinglet()) {
					JsonObject subelements = fillCompoundObject(info.getClassname());
					top.add(dimidentifier,subelements);
				} else {
					JsonArray arr = new JsonArray();
					top.add(dimidentifier, arr);
				}
			} else {
				if(info.isSinglet()) {
					top.addProperty(dimidentifier, "not assigned");
				} else {
					JsonArray arr = new JsonArray();
					top.add(dimidentifier, arr);					
				}
			}
		}
		return top;
	}
}
