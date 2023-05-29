package info.esblurock.background.services.jthermodynamics.radicals;

import java.io.IOException;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.interfaces.IAtomContainer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.jthermodynamics.structcorrections.CalculateStructureCorrection;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import thermo.data.structure.structure.AddHydrogenToSingleRadical;
import thermo.data.structure.utilities.MoleculeUtilities;
import thermo.exception.NotARadicalException;

public class ComputeThermodynamicsTHERM {

    public static JsonObject computeHRadicalCorrections(IAtomContainer Rmolecule, JsonObject info, Document document) {
        boolean noerrors = true;
        JsonObject response = null;

        MoleculeUtilities.setImplicitHydrogensToZero(Rmolecule);
        AddHydrogenToSingleRadical formRH = new AddHydrogenToSingleRadical();
        IAtomContainer RHmolecule;
        try {
            RHmolecule = formRH.convert(Rmolecule);
            MoleculeUtilities.normalizeMolecule(RHmolecule);

            JsonArray contributions = new JsonArray();

            JsonObject nonradresponse = computeNonRadicalContributions(RHmolecule, info, document);
            String message = nonradresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
            MessageConstructor.combineBodyIntoDocument(document, message);
            if (nonradresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
                JsonArray nonradcontributions = nonradresponse.get(ClassLabelConstants.SimpleCatalogObject)
                        .getAsJsonArray();
                contributions.addAll(nonradcontributions);
            } else {
                noerrors = false;
            }

            JsonObject hbicontribution = computeHBICorrection(info, document);
            if (hbicontribution != null) {
                contributions.add(hbicontribution);
            } else {
                noerrors = false;
            }

            if (noerrors) {
                String title = "Successful calculation";
                response = DatabaseServicesBase.standardServiceResponse(document, title, contributions);
            } else {
                String errortitle = "Error occurred while computing with HBI contributions";
                response = DatabaseServicesBase.standardErrorResponse(document, errortitle, contributions);
            }

        } catch (NotARadicalException e) {
            
            response = computeNonRadicalContributions(Rmolecule, info, document);
            String errortitle = "Molecule not a radical";
            response = DatabaseServicesBase.standardServiceResponse(document, errortitle, null);
        } catch (IOException e) {
            String errortitle = "Error in converting the radical to a molecule";
            response = DatabaseServicesBase.standardErrorResponse(document, errortitle, null);
        }
        return response;
    }

    private static JsonObject computeHBICorrection(JsonObject info, Document document) {
        JsonObject contribution = null;
        JsonObject hbiinfo = info.deepCopy();
        hbiinfo.addProperty(ClassLabelConstants.JThermodynamicsSubstructureType, "dataset:HBISubstructure");

        JsonObject response = CalculateStructureCorrection.calculate(hbiinfo);
        String message = response.get(ClassLabelConstants.ServiceResponseMessage).getAsString();
        MessageConstructor.combineBodyIntoDocument(document, message);
        Element body = MessageConstructor.isolateBody(document);
        if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
            JsonArray hbicontributions = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
            if (hbicontributions.size() > 0) {
                contribution = hbicontributions.get(0).getAsJsonObject();
                body.addElement("div").addText("No HBI correction was added to the contributions");
            } else {
                body.addElement("div").addText("No appropriate HBI correction was found");
            }
        } else {
            body.addElement("div").addText("No HBI correction was added to the contributions");
        }

        return contribution;
    }

    private static JsonObject computeNonRadicalContributions(IAtomContainer RHmolecule,
            JsonObject info, Document document) {
        JsonArray contributions = new JsonArray();
        Element body = MessageConstructor.isolateBody(document);
        JsonObject response = null;
        JsonObject tcontribution = ComputeThermodynamicsHRadicalCorrections.translationContribution(RHmolecule, body,
                info);
        contributions.add(tcontribution);
        JsonObject symmresponse = ComputeThermodynamicsHRadicalCorrections.symmetry(RHmolecule, document, info);
        MessageConstructor.combineBodyIntoDocument(document,
                symmresponse.get(ClassLabelConstants.ServiceResponseMessage).getAsString());
        if (symmresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
            JsonArray symcontributions = symmresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
            contributions.addAll(symcontributions);
            String title = "Symmetry contributions added to calculation";
            response = DatabaseServicesBase.standardServiceResponse(document, title, contributions);
        } else {
            String symmerrormessage = "Error in computing symmetry contributions";
            response = DatabaseServicesBase.standardErrorResponse(document, symmerrormessage, contributions);
        }
        return response;
    }

}
