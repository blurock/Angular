package info.esblurock.background.services.set.symmetry;

import static org.junit.Assert.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.Test;

import com.google.gson.JsonObject;

import info.esblurock.background.services.jthermodynamics.symmetry.InterpretSymmetryBlock;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class TestReadSymmetryBlock {

	@Test
	public void test() {
		String srcpath = "src/test/java/resources/symmetrydefinition/SymmetryDefinition.xml";
		String content;
		try {
			content = Files.readString(Paths.get(srcpath));
			JsonObject catalog = InterpretSymmetryBlock.interpret(content);
			System.out.println(JsonObjectUtilities.toString(catalog));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}

}
