package info.esblurock.reaction.core.ontology.base.rdfs;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public enum FillRDFTriple {

	RDFSubjectObjectAsRecord {

		@Override
		public void fill(JsonObject obj, RDFInformation info) {
			obj.add(ClassLabelConstants.RDFJsonAsObject, info.getObjectValue().getAsJsonObject());
			obj.add(ClassLabelConstants.RDFJsonAsSubject, info.getSubjectValue().getAsJsonObject());
		}
		
	}, RDFObjectAsPrimitiveSubjectRecord {

		@Override
		public void fill(JsonObject obj, RDFInformation info) {
			obj.addProperty(ClassLabelConstants.RDFObjectKey, info.getObjectValue().getAsString());
			obj.add(ClassLabelConstants.RDFJsonAsSubject, info.getSubjectValue().getAsJsonObject());
		}
		
	}, RDFSubjectObjectPrimitives {

		@Override
		public void fill(JsonObject obj, RDFInformation info) {
			obj.addProperty(ClassLabelConstants.RDFObjectKey, info.getObjectValue().getAsString());
			obj.addProperty(ClassLabelConstants.RDFSubjectKey, info.getSubjectValue().getAsString());
		}
		
	}, RDFSubjectPrimitiveObjectRecord {

		@Override
		public void fill(JsonObject obj, RDFInformation info) {
			obj.addProperty(ClassLabelConstants.RDFSubjectKey, info.getSubjectValue().getAsString());
			obj.add(ClassLabelConstants.RDFJsonAsObject, info.getObjectValue().getAsJsonObject());
		}
		
	};
	
	abstract public void fill(JsonObject obj, RDFInformation info);
}
