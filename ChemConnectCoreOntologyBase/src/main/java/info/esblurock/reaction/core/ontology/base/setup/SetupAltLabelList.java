package info.esblurock.reaction.core.ontology.base.setup;

import java.util.Iterator;

import info.esblurock.core.DataBaseObjects.classifications.ClassificationHierarchy;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.reaction.core.ontology.base.classification.DatabaseOntologyClassification;

public class SetupAltLabelList {

	public static String listToString() {
		StringBuilder buf = new StringBuilder();
		String topclass = "dataset:ChemConnectElementObject";
		ClassificationHierarchy hierarchy = DatabaseOntologyClassification.getClassificationHierarchy(topclass);
		buf.append("package info.esblurock.reaction.core.ontology.base.constants\n");
		buf.append("\npublic class AltLabelConstants {\n\n");
		addHierarchyLevelToList(hierarchy,buf);
		buf.append("}\n\n");
		return buf.toString();
	}

	private static void addHierarchyLevelToList(ClassificationHierarchy hierarchy, StringBuilder buf) {
		String classification = hierarchy.getClassification();
		if(classification.startsWith("dataset:")) {
			classification = classification.substring(8);
		}
		buf.append("public static String ");
		buf.append(classification);
		buf.append(" = ");
		int csize = classification.length();
		int rest = 45-csize;
		for(int i=0;i<rest;i++) {
			buf.append(" ");
		}
		BaseAnnotationObjects annotations = hierarchy.getAnnotations();
		buf.append("\"");
		buf.append(annotations.getAltlabel());
		buf.append("\"");
		buf.append(";\n");
		
		Iterator<ClassificationHierarchy> iter = hierarchy.getSubclassificatons().iterator();
		while(iter.hasNext()) {
			ClassificationHierarchy subhierarchy = iter.next();
			addHierarchyLevelToList(subhierarchy, buf);
		}
	}
}
