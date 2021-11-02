package info.esblurock.background.services.set;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Iterator;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.jthermodynamics.dataset.FindDatasetCollections;
import info.esblurock.background.services.jthermodynamics.dataset.FindMetaAtomDefinitionsInDatasetCollection;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import thermo.data.structure.structure.MetaAtomDefinition;

public class TestFindDatasetCollection {

	@Test
	public void test() {
		String maintainer = "Administrator";
		String dataset = "Standard";
		String classname = "dataset:JThermodynamicsMetaAtomDefinition";
		String version = "20200919";
		JsonObject recordid = CreateDocumentTemplate.createTemplate("dataset:DatabaseRecordIDInfo");
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectMaintainer, maintainer);
		recordid.addProperty(ClassLabelConstants.DatasetVersion, version);
		recordid.addProperty(ClassLabelConstants.DatasetName, dataset);
		recordid.addProperty(ClassLabelConstants.CatalogObjectUniqueGenericLabel, "Generic");
		recordid.addProperty(ClassLabelConstants.CatalogDataObjectStatus, "CatalogObjectStatusCurrent");

		JsonObject firebaseid = FindDatasetCollections.findDatasetCollectionID(classname, recordid);
		System.out.println(JsonObjectUtilities.toString(firebaseid));
		
		JsonObject response = FindDatasetCollections.readInDatasetCollection(classname, recordid);
		JsonObjectUtilities.printResponse(response);
		
		 ArrayList<MetaAtomDefinition> defs = FindMetaAtomDefinitionsInDatasetCollection.findMetaAtomDefinitions(recordid);
		 if(defs != null) {
			 Iterator<MetaAtomDefinition> iter = defs.iterator();
			 System.out.println("---------------------------------------------");
			 System.out.println("Number of definitions: " + defs.size());
			 while(iter.hasNext()) {
				 MetaAtomDefinition def = iter.next();
				 System.out.println("---------------------------------------------");
				 System.out.println(def.toString());
			 }
			 System.out.println("---------------------------------------------");
		 } else {
			 System.out.println("******** Error in reading MetaAtomDefinitions");
		 }
	}

}
