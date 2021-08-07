package info.esblurock.background.services.servicecollection;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.SubstituteJsonValues;

/** These services reflect the ontology definitions under DatasetObjectManipulationService
 * 
 * @author edwardblurock
 *
 */
public enum ServiceCollectionObjectManipulation {

	DatasetCreateObjectTemplate {

		@Override
		public JsonObject process(JsonObject json) {
			String catalogtype = json.get(ClassLabelConstants.DatabaseObjectType).getAsString();
			JsonObject catalog = CreateDocumentTemplate.createTemplate(catalogtype);
			return catalog;
		}
		
	}, DatasetCollectionDocumentIDPairForHierarchy {
		@Override
		public JsonObject process(JsonObject json) {
			JsonObject catalog = json.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			JsonObject catalogidset = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(catalog);
			return catalogidset;
		}
		
	}, DatasetFillEmptyWithSourceInformation {

		@Override
		public JsonObject process(JsonObject json) {
			String catalogtype = json.get(ClassLabelConstants.DatabaseObjectType).getAsString();
			JsonObject source = json.get(ClassLabelConstants.ActivityInformationRecord).getAsJsonObject();
			JsonObject catalog = CreateDocumentTemplate.createTemplate(catalogtype);
			SubstituteJsonValues.substituteJsonObject(catalog, source);
			return catalog;
			
		}
		
	};
	
	public abstract JsonObject process(JsonObject json);
}
