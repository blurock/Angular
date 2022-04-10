package info.esblurock.reaction.core.ontology.base.dataset;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestCreateTemplateWithAnnotations {

    @Test
    public void test() {
        System.out.println("---------------------------------------------------------------------");
        String classname1 = "dataset:ActivityRepositoryInitialReadLocalFile";
        System.out.println(classname1);
        JsonObject objanno1 = CreateDocumentTemplate.createTemplateWithAnnotations(classname1);
        System.out.println(JsonObjectUtilities.toString(objanno1));
        System.out.println("---------------------------------------------------------------------");
    }

}
