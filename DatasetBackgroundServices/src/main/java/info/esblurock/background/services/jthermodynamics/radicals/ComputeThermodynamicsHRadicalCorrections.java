package info.esblurock.background.services.jthermodynamics.radicals;

import org.dom4j.Element;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.parameters.ParameterUtilities;
import thermo.data.structure.translational.CalculateTranslationalCorrection;
import thermo.properties.SProperties;

public class ComputeThermodynamicsHRadicalCorrections {
	
	public static JsonArray computeHRadicalCorrections(IAtomContainer mol, JsonObject info, Element body) {
		JsonArray contributions = new JsonArray();
		Double transEntropyCorrectionD = CalculateTranslationalCorrection.calculate(mol);
		JsonObject tcontribution = ParameterUtilities.parameterWithEntropy(transEntropyCorrectionD.doubleValue(),
				"Translational Energy Correction",info);
		contributions.add(tcontribution);
		body.addElement("div").addText("Translational Energy Correction(Entropy): " + transEntropyCorrectionD.toString());
		
		
        String gasconstantS = SProperties.getProperty("thermo.data.gasconstant.clasmolsk");
        double gasConstant = Double.valueOf(gasconstantS).doubleValue();
        double spin = gasConstant * Math.log1p(1.0);
        Double spinD = Double.valueOf(spin);
        String spinS = "Spin Contribution (Entropy): Rln(2) = (" + gasConstant + ")*(" + Math.log1p(1.0) + ")";
        JsonObject scontribution = ParameterUtilities.parameterWithEntropy(spinD.doubleValue(),spinS,info);
        contributions.add(scontribution);
		body.addElement("div").addText(spinS);
        
        double hrad = -52.1;
        String hradS = "Hydrogen Radical";
        JsonObject hcontribution = ParameterUtilities.parameterWithEntropy(hrad,hradS,info);
        contributions.add(hcontribution);
        body.addElement("div").addText("Hydrogen Radical (Ethalpy): " + hrad);
        
		return contributions;
	}

}
