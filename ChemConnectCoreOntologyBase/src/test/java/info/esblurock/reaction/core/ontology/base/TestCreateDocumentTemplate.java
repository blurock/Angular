package info.esblurock.reaction.core.ontology.base;


import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestCreateDocumentTemplate {

	@Test
	public void test() {
		System.out.println("---------------------------------------");
		System.out.println("TestCreateDocumentTemplate");
		System.out.println("---------------------------------------");
		JsonObject obj = CreateDocumentTemplate.createTemplate("dataset:DatabasePerson");
		System.out.println(JsonObjectUtilities.toString(obj));
		System.out.println("---------------------------------------");
		String address = "dataset:CollectionDocumentIDPairAddress";
		JsonObject obj1 = CreateDocumentTemplate.createTemplate(address);
		System.out.println(JsonObjectUtilities.toString(obj1));
		System.out.println("---------------------------------------");
		
	}

}
