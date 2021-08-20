package info.esblurock.background.services.servicecollection;

import com.google.gson.JsonObject;

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
			System.out.println("DatasetCreateObjectTemplate: " + JsonObjectUtilities.toString(json));
			System.out.println("DatasetCreateObjectTemplate: " + ClassLabelConstants.DatabaseObjectType);
			String catalogtype = json.get(ClassLabelConstants.DatabaseObjectType).getAsString();
			System.out.println("DatasetCreateObjectTemplate: " + catalogtype);
			JsonObject catalog = CreateDocumentTemplate.createTemplate(catalogtype);
			JsonObject response = DatabaseServicesBase.standardServiceResponse("DatasetCreateObjectTemplate", catalog);
			return response;
		}

	},
	DatasetCollectionDocumentIDPairForHierarchy {
		@Override
		public JsonObject process(JsonObject json) {
			JsonObject catalog = json.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			JsonObject catalogidset = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(catalog);
			JsonObject response = DatabaseServicesBase
					.standardServiceResponse("DatasetCollectionDocumentIDPairForHierarchy ", catalogidset);
			return response;
		}

	},
	DatasetFillEmptyWithSourceInformation {

		@Override
		public JsonObject process(JsonObject json) {
			String catalogtype = json.get(ClassLabelConstants.DatabaseObjectType).getAsString();
			JsonObject source = json.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			JsonObject catalog = CreateDocumentTemplate.createTemplate(catalogtype);
			System.out.println("createTemplate source: " + source.get(AnnotationObjectsLabels.identifier).getAsString());
			String identifier = catalog.get(AnnotationObjectsLabels.identifier).getAsString();
			SubstituteJsonValues.substituteJsonObject(catalog, source);
			System.out.println("createTemplate: " + catalog.get(AnnotationObjectsLabels.identifier).getAsString());
			catalog.addProperty(AnnotationObjectsLabels.identifier, identifier);
			JsonObject response = DatabaseServicesBase.standardServiceResponse("DatasetFillEmptyWithSourceInformation",
					catalog);
			return response;
		}

	},
	DatasetCreateClassificationList {

		@Override
		public JsonObject process(JsonObject json) {
			String catalogtype = json.get(ClassLabelConstants.Classification).getAsString();
			JsonObject lst = GenerateSimpleClassification.generateSimpleListFromDataType(catalogtype);
			JsonObject response = DatabaseServicesBase.standardServiceResponse("DatasetCreateClassificationList", lst);
			return response;
		}

	},
	DatasetCreateClassificationTree {

		@Override
		public JsonObject process(JsonObject json) {
			String catalogtype = json.get(ClassLabelConstants.Classification).getAsString();
			JsonObject tree = DatabaseOntologyClassification.classificationTreeFromDataType(catalogtype);
			JsonObject response = DatabaseServicesBase.standardServiceResponse("DatasetCreateClassificationTree", tree);
			return response;
		}

	};

	public abstract JsonObject process(JsonObject json);
}
