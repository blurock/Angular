package info.esblurock.background.services.jthermodynamics;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.molecule.DatasetMoleculeUtilities;
import info.esblurock.background.services.jthermodynamics.bensonrules.ComputeBensonRulesForMolecule;
import info.esblurock.background.services.jthermodynamics.symmetry.DatabaseCalculateSymmetryCorrection;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import thermo.data.structure.structure.AddHydrogenToSingleRadical;
import thermo.data.structure.utilities.MoleculeUtilities;

public class ComputeTotalThermodynamics {
    
    
    public static JsonObject calculateTherGasThermodynamics(JsonObject info) {
        Document document = MessageConstructor.startDocument("Compute Total Thermodynamic Contributions for 2D-graphical Molecule");
        JsonObject response = null;
        JsonObject colrecordid = info.get(ClassLabelConstants.DatabaseCollectionRecordID).getAsJsonObject();
        String maintainer = colrecordid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
        String dataset = colrecordid.get(ClassLabelConstants.DatasetCollectionsSetLabel).getAsString();
        IAtomContainer molecule = DatasetMoleculeUtilities.convertLinearFormToMolecule(info);
        if (molecule != null) {
           response = calculateTherGasThermodynamics(maintainer,dataset,molecule,info,document);
        } else {
            String errorS = "Error in interpreting molecule";
            response = DatabaseServicesBase.standardErrorResponse(document, errorS, null);            
        }
        return response;
    }
    
    public static JsonObject calculateTherGasThermodynamics(String maintainer, String dataset, IAtomContainer moleculetocompute, JsonObject info, Document document) {
        System.out.println("ComputeTotalThermodynamics calculateTherGasThermodynamics");
        Element body = MessageConstructor.isolateBody(document);
        body.addElement("div").addText("Maintainer      : " + maintainer);
        body.addElement("div").addText("dataset         : " + dataset);
        
        MoleculeUtilities.setImplicitHydrogensToZero(moleculetocompute);
        JsonObject response = null;
        AddHydrogenToSingleRadical formRH = new AddHydrogenToSingleRadical();
        if (formRH.isARadical(moleculetocompute)) {
            response = computeThermodynamicsForRadicalContributions(maintainer, dataset, moleculetocompute,info);
        } else {
            response = computeThermodynamicsForMolecule(maintainer, dataset, moleculetocompute,info, document);
        }

        return response;
    }

    private static JsonObject computeThermodynamicsForMolecule(String maintainer, String dataset, IAtomContainer moleculetocompute, JsonObject info, Document document) {
        JsonObject response = ComputeBensonRulesForMolecule.compute(maintainer, dataset, moleculetocompute, info);
        if(response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
            String message = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
            Element body = MessageConstructor.isolateBody(document);
            MessageConstructor.combineBodyIntoDocument(document, message);
            JsonArray bensoncontributions = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
            DatabaseCalculateSymmetryCorrection symmcorrection = new DatabaseCalculateSymmetryCorrection(
                    maintainer, dataset);
            JsonArray symmetries = symmcorrection.compute(moleculetocompute, body, info);
            bensoncontributions.addAll(symmetries);
            String title = "Total Contribution";
            response = DatabaseServicesBase.standardServiceResponse(document, title, bensoncontributions);
        }
        
        return response;
    }

    private static JsonObject computeThermodynamicsForRadicalContributions(String maintainer, String dataset, IAtomContainer moleculetocompute, JsonObject info) {
        
        return null;
    }

}