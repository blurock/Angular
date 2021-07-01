package info.esblurock.reaction.core.ontology.base;


import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestCreateDocumentTemplate {

	@Test
	public void test() {
		JsonObject obj = CreateDocumentTemplate.createTemplate("dataset:DatabasePerson");
		System.out.println(JsonObjectUtilities.toString(obj));
	}

}
