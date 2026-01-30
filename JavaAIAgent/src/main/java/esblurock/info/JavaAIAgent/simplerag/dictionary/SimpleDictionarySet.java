package esblurock.info.JavaAIAgent.simplerag.dictionary;

import com.google.gson.JsonObject;

public class SimpleDictionarySet {
	
	public static DictionaryElementSet createSimple() {
		String dictionaryNameString = "";
		String descriptionString = "";
		DictionaryElementSet simpleDictionary = new DictionaryElementSet(dictionaryNameString,descriptionString);
		
		DictionaryElement e1 = new DictionaryElement(
				"TransactionInterpretDisassociationEnergy", 
				"Interpret a parsed file with disassociation text blocks to dataset objects. For each definition the structure in short text format, a structure name and the disassociate energy value.");
		DictionaryElement e2 = new DictionaryElement(
				"TransactionInterpretMetaAtom", 
				"Interpret a parsed file of single line definiitions of Meta Atom dataset objects. Each line has a Meta Atom name and a short text line structure, structure name, meta atom name and meta atom type.");
		DictionaryElement e3 = new DictionaryElement(
				"TransactionInterpretSymmetryInformation", 
				"Interpret a parsed file of symmetry definitions in JThermodynamics XML structure to dataset objects. The symmetry object has a molfile structure and assignments to symmetry.");
		DictionaryElement e4 = new DictionaryElement(
				"TransactionInterpretThermodynamicBlockLines", 
				"From a single (3 or 4 line) block of the thermodynamic specification, the thermodynamics and structure are isolated out and interpreted from a parsed file. The format originates from the TherGas format for defining thermodynamics.");
		DictionaryElement e5 = new DictionaryElement(
				"TransactionInterpretVibrationalMode", 
				"Interpret a parsed file of one line vibrational definitions to dataset objects.  Each line has the vibrational structure in short text form, vibrational name, structure name, vibrational value and symmetry factor.");
		DictionaryElement e6 = new DictionaryElement(
				"PartiionSetWithinRepositoryFile", 
				"The repository file represents the set of inputs for a set of catalog dataset objects. This parses the file into individual partitions.");
		DictionaryElement e7 = new DictionaryElement(
				"InitialReadInLocalStorageSystem", 
				"Read in text file from the local file system of the client to the staging area.");
		
		simpleDictionary.addElement(e1);
		simpleDictionary.addElement(e2);
		simpleDictionary.addElement(e3);
		simpleDictionary.addElement(e4);
		simpleDictionary.addElement(e5);
		simpleDictionary.addElement(e6);
		simpleDictionary.addElement(e7);
		
		return simpleDictionary;
	}

}
