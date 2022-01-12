package info.esblurock.background.services.jthermodynamics.symmetry;

import org.dom4j.Element;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonObject;

import thermo.data.structure.structure.symmetry.CalculateSymmetryCorrection;

public class DatabaseCalculateSymmetryCorrection extends CalculateSymmetryCorrection {
	
	public DatabaseCalculateSymmetryCorrection(String maintainer, String dataset)  {
		super();
		external = new DatabaseCalculateExternalSymmetryCorrection(maintainer,dataset);
		internal = new DatabaseCalculateInternalSymmetryCorrection(maintainer,dataset,external);
		
	}
	
	public JsonObject compute(IAtomContainer molecule, Element body, JsonObject info) {

		return null;
	}
		
}
