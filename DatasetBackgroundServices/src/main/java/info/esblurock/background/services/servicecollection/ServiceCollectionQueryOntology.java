package info.esblurock.background.services.servicecollection;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonObject;

import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.service.rdfs.GenerateAndWriteRDFForObject;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;
import info.esblurock.reaction.core.ontology.base.classification.GenerateSimpleClassification;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.SubstituteJsonValues;

/**
 * These services reflect the ontology definitions under
 * DatasetObjectManipulationService
 * 
 * @author edwardblurock
 *
 */
public enum ServiceCollectionQueryOntology {

	DatasetCreateObjectTemplate {

		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("DatasetCreateObjectTemplate");
			String catalogtype = json.get(ClassLabelConstants.DatabaseObjectType).getAsString();
			JsonObject catalog = CreateDocumentTemplate.createTemplate(catalogtype);
			JsonObject response = DatabaseServicesBase.standardServiceResponse(document,
					"Success: DatasetCreateObjectTemplate", catalog);
			return response;
		}

	},
	DatasetCollectionDocumentIDPairForHierarchy {
		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("DatasetCollectionDocumentIDPairForHierarchy");
			JsonObject catalog = json.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			JsonObject catalogidset = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(catalog);
			JsonObject response = DatabaseServicesBase.standardServiceResponse(document,
					"Success: DatasetCollectionDocumentIDPairForHierarchy", catalogidset);
			return response;
		}

	},
	DatasetFillEmptyWithSourceInformation {

		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("DatasetCreateObjectTemplate");
			String catalogtype = json.get(ClassLabelConstants.DatabaseObjectType).getAsString();
			JsonObject source = json.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			JsonObject catalog = CreateDocumentTemplate.createTemplate(catalogtype);
			String identifier = catalog.get(AnnotationObjectsLabels.identifier).getAsString();
			SubstituteJsonValues.substituteJsonObject(catalog, source);
			catalog.addProperty(AnnotationObjectsLabels.identifier, identifier);
			JsonObject response = DatabaseServicesBase.standardServiceResponse(document,
					"Success: DatasetCreateObjectTemplate", catalog);
			return response;
		}

	},
	DatasetCreateClassificationList {

		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("DatasetCreateClassificationList");
			String catalogtype = json.get(ClassLabelConstants.Classification).getAsString();
			JsonObject lst = GenerateSimpleClassification.generateSimpleListFromDataType(catalogtype);
			JsonObject response = DatabaseServicesBase.standardServiceResponse(document,
					"DatasetCreateClassificationList", lst);
			return response;
		}

	},
	DatasetCreateClassificationTree {

		@Override
		public JsonObject process(JsonObject json) {
			Document document = MessageConstructor.startDocument("DatasetCreateClassificationTree");
			String catalogtype = json.get(ClassLabelConstants.Classification).getAsString();
			JsonObject tree = DatabaseOntologyClassification.classificationTreeFromDataType(catalogtype);
			JsonObject response = DatabaseServicesBase.standardServiceResponse(document,
					"Success: DatasetCreateClassificationTree", tree);
			return response;
		}

	};

	public abstract JsonObject process(JsonObject json);
}
