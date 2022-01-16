package info.esblurock.background.services.jthermodynamics.symmetry;

import java.io.IOException;

import org.dom4j.Element;
import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.jthermodynamics.dataset.FindMetaAtomDefinitionsInDatasetCollection;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import thermo.data.structure.structure.SetOfMetaAtomsForSubstitution;
import thermo.data.structure.structure.StructureAsCML;
import thermo.data.structure.structure.symmetry.CalculateSymmetryCorrection;
import thermo.exception.ThermodynamicException;

public class DatabaseCalculateSymmetryCorrection {
	DatabaseCalculateExternalSymmetryCorrection externalD;
	DatabaseCalculateInternalSymmetryCorrection internalD;
	DatabaseCalculateOpticalSymmetryCorrection opticalD;
	
	String metaatomtype = "LinearStructure";
	SetOfMetaAtomsForSubstitution substitute;
	
	public DatabaseCalculateSymmetryCorrection(String maintainer, String dataset)  {
		super();
		externalD = new DatabaseCalculateExternalSymmetryCorrection(maintainer,dataset);
		internalD = new DatabaseCalculateInternalSymmetryCorrection(maintainer,dataset,externalD);
		opticalD = new DatabaseCalculateOpticalSymmetryCorrection(maintainer,dataset);
		substitute = 
				FindMetaAtomDefinitionsInDatasetCollection.setUpSubstituteMetaAtoms(maintainer, dataset, metaatomtype);
		
	}
	
	public JsonObject compute(IAtomContainer molecule, Element body, JsonObject info) {
		StructureAsCML cmlstruct;
		IAtomContainer newmolecule = null;
		try {
			cmlstruct = new StructureAsCML(molecule);
			newmolecule = substitute.substitute(cmlstruct);
			//substituteBack.substitute(newmolecule);
			JsonArray contributionsE = externalD.compute(molecule, body, info);
			JsonArray contributionsI = internalD.compute(molecule, body, info);
			JsonArray contributionsO = opticalD.compute(molecule, body, info);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (CDKException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return null;
	}
	
	public IAtomContainer substituteLinearAtoms(StructureAsCML struct, Element body) {
		IAtomContainer molecule = null;
		try {
			molecule = substitute.substitute(struct);
		} catch (ClassNotFoundException | CDKException | IOException e1) {
			body.addElement("div").addText("Unsuccesful attempt to substitute BensonAtom meta atoms in molecule");
		}
		return molecule;

	}
		
}
