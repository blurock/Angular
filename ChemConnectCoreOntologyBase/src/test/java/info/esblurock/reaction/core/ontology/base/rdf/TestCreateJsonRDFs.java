package info.esblurock.reaction.core.ontology.base.rdf;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.rdfs.FindRDFInClass;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.SubstituteJsonValues;

public class TestCreateJsonRDFs {

	@Test
	public void test() {
		String classname = "dataset:DatabasePerson";
		String owner = "Administration";
		String transID = BaseCatalogData.generateUniqueUUID();
		JsonObject obj = BaseCatalogData.createStandardDatabaseObject(classname, owner, transID, "true");
		BaseCatalogData.insertCatalogObjectKey(obj,classname);
		SubstituteJsonValues.substituteJsonValueString(obj, ClassLabelConstants.DOI, "DOI value");
		SubstituteJsonValues.substituteJsonValueString(obj, ClassLabelConstants.PersonFullName, "Edward Blurock");
		SubstituteJsonValues.substituteJsonValueString(obj, ClassLabelConstants.givenName, "Edward");
		SubstituteJsonValues.substituteJsonValueString(obj, ClassLabelConstants.familyName, "Blurock");
		
		JsonArray arr = FindRDFInClass.createSetOfJsonObjectRDFs(obj);		
		for(int i=0;i<arr.size();i++) {
			System.out.println("----------------------------");
			System.out.println(JsonObjectUtilities.toString(arr.get(i).getAsJsonObject()));
		}
		
	}

}
