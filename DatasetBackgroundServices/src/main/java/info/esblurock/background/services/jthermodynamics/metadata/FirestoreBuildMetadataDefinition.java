package info.esblurock.background.services.jthermodynamics.metadata;

import java.sql.SQLException;
import java.util.HashSet;

import org.dom4j.Document;
import org.dom4j.Element;
import org.openscience.cdk.exception.CDKException;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.datamanipulation.InterpretTextBlock;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import thermo.data.structure.structure.BuildStructureLibrary;
import thermo.data.structure.structure.MetaAtomInfo;
import thermo.data.structure.structure.MetaAtomLine;
import thermo.data.structure.structure.StructureAsCML;

public class FirestoreBuildMetadataDefinition extends BuildStructureLibrary {

	public FirestoreBuildMetadataDefinition(HashSet<MetaAtomInfo> ans) {
		super(ans);
	}
	

	
}
