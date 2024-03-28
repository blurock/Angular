package info.esblurock.background.services.chemconnect.ontology;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.classification.ClassificationHierarchy;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.dataset.annotations.BaseAnnotationObjects;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class SimpleTest {

	@Test
	public void test() {
		System.out.println("SimpleTest");
		String classname = "dataset:SubSystemDescription";
		JsonObject obj = CreateDocumentTemplate.createTemplate(classname);
		System.out.println("SimpleTest --------------------------------------------------------------------------------");
		System.out.println("classname:\n" + JsonObjectUtilities.toString(obj));

		System.out.println("SimpleTest --------------------------------------------------------------------------------");
		BaseAnnotationObjects annotations = DatasetOntologyParseBase.getAnnotationStructureFromIDObject(classname);
		JsonObject ann = annotations.toJsonObject();
		System.out.println(JsonObjectUtilities.toString(ann));
		System.out.println("SimpleTest --------------------------------------------------------------------------------");

	}

}
