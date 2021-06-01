package info.esblurock.reaction.core.ontology.base;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;

import info.esblurock.reaction.core.ontology.base.setup.SetupAltLabelList;

public class LineCommands {
	static String packagedirectory = "src/main/java/";
	static String constantsdirectory = "info/esblurock/reaction/core/ontology/base/constants";
	static String altlabelconstants = "AltLabelConstants";

	public static void main(String[] args) {
		String command = args[0];
		if (command.equals("AltLabelBuild")) {
			String classAsString = SetupAltLabelList.listToString();
			String directory = packagedirectory + "/" + constantsdirectory;
			File file = new File(directory, altlabelconstants);
			try {
				PrintStream str = new PrintStream(file);
				str.print(classAsString);
				str.close();
			} catch (FileNotFoundException e) {
				System.out.println("Could not find directory");
				System.out.println("Has to be run from ChemConnectCoreOntologyBase directory");
			}
		} else {
			System.out.println("Command not found: '" + command + "'");
		}

	}

}
