package info.esblurock.background.core.ontology.dataset;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.apache.jena.rdf.model.RDFNode;
import org.json.JSONObject;

import info.esblurock.background.core.ontology.OntologyBase;
import info.esblurock.background.core.ontology.classification.DatabaseOntologyClassification;
import info.esblurock.core.DataBaseObjects.catalogandrecords.SetOfBaseCatalogRecordElementInformation;
import info.esblurock.core.DataBaseObjects.classifications.ClassificationHierarchy;
import info.esblurock.core.DataBaseObjects.classifications.ClassificationTree;
import info.esblurock.core.DataBaseObjects.constants.AnnotationObjectsLabels;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;
import info.esblurock.core.DataBaseObjects.ontology.ExtendedAnnotationObjects;


/**
 * @author edwardblurock
 *
 */
/**
 * @author edwardblurock
 *
 */
/**
 * @author edwardblurock
 *
 */
public class DatasetOntologyParseBase {
	/**
	 * @param structure The ID structure object (subclass of ID)
	 * @return The data element information (annotated properties of the concept filled in).
	 * 
	 * The BaseAnnotationObjects has all the standard annotated information of the concept
	 * 
	 * @throws IOException
	 */
	static public BaseAnnotationObjects getSubElementStructureFromIDObject(String structure) {
		String query = "SELECT ?id ?type ?altl ?comment ?label ?identifer\n" 
				+ "	WHERE {\n" 
				+ "   " + structure + " <http://purl.org/dc/elements/1.1/type> ?type .\n" 
				+ "	  " + structure + " <http://purl.org/dc/terms/identifier> ?id .\n" + "	" 
				+ "   " + structure + " <http://www.w3.org/2004/02/skos/core#altLabel> ?altl .\n" 
				+ "   " + structure + " rdfs:label ?label .\n" 
				+ "   " + structure + " rdfs:comment ?comment\n" 
				+ "  }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		BaseAnnotationObjects object = null;
		ExtendedAnnotationObjects extobj = null;
		if (stringlst.size() > 0) {
			String idS = stringlst.get(0).get("id");
			String typeS = stringlst.get(0).get("type");
			String labelS = stringlst.get(0).get("label");
			String commentS = stringlst.get(0).get("comment");
			String altlabelS = stringlst.get(0).get("altl");
			object = new BaseAnnotationObjects(labelS, commentS, altlabelS, typeS, idS);
			extobj = new ExtendedAnnotationObjects(object);
			
			String purpose = DatasetOntologyParseBase.getPurposeFromAnnotation(structure);
			if(purpose.length() > 0) {
				ClassificationHierarchy purposehier = DatabaseOntologyClassification.getClassificationHierarchy(purpose);
				extobj.setPurposeObjects(purposehier);
			}
			String concept = DatasetOntologyParseBase.getConceptFromAnnotation(structure);
			if(concept.length() > 0) {
				ClassificationHierarchy concepthier = DatabaseOntologyClassification.getClassificationHierarchy(concept);
				extobj.setConceptObjects(concepthier);
			}
		}
		return extobj;
	}
	
	static public BaseAnnotationObjects getAnnotationStructureFromIDObject(String structure) {
		String idS = getIDFromAnnotation(structure);
		String typeS = getTypeFromAnnotation(structure);
		String labelS = getLabelFromAnnotation(structure);
		String commentS = getCommentFromAnnotation(structure);
		String altlabelS = getAltLabelFromAnnotation(structure);
		BaseAnnotationObjects object = new BaseAnnotationObjects(labelS, commentS, altlabelS, typeS, idS);
		return object;
	}
	
	static public String getConceptFromAnnotation(String structure) {
		String query = "SELECT ?id \n" 
				+ "	WHERE {\n" 
				+ "	  " + structure + " dataset:objectconcept ?id .\n" + "	" 
				+ "  }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		String idS = "";
		if (stringlst.size() > 0) {
			idS = stringlst.get(0).get("id");
		}
		return idS;
	}
	static public String getPurposeFromAnnotation(String structure) {
		String query = "SELECT ?id \n" 
				+ "	WHERE {\n" 
				+ "	  " + structure + " dataset:objectpurpose ?id .\n" + "	" 
				+ "  }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		String idS = "";
		if (stringlst.size() > 0) {
			idS = stringlst.get(0).get("id");
		}
		ClassificationHierarchy hierarchy = null;
		if(idS.length() > 0) {
			hierarchy = DatabaseOntologyClassification.getClassificationHierarchy(idS);
			JSONObject json = hierarchy.toJSONObject();
		}
		return idS;
	}
	static public String getIDFromAnnotation(String structure) {
		String query = "SELECT ?id \n" 
				+ "	WHERE {\n" 
				+ "	  " + structure + " <http://purl.org/dc/terms/identifier> ?id .\n" + "	" 
				+ "  }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		String idS = "";
		if (stringlst.size() > 0) {
			idS = stringlst.get(0).get("id");
		}
		return idS;
	}

	static public String getAltLabelFromAnnotation(String structure) {
		String query = "SELECT ?altl \n" 
				+ "	WHERE {\n" 
				+ "   " + structure + " <http://www.w3.org/2004/02/skos/core#altLabel> ?altl .\n" 
				+ "  }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		String altLabelS = "";
		if (stringlst.size() > 0) {
			altLabelS = stringlst.get(0).get("altl");
		}
		return altLabelS;
	}

	static public String getTypeFromAnnotation(String structure) {
		String query = "SELECT ?type \n" 
				+ "	WHERE {\n" 
				+ "   " + structure + " <http://purl.org/dc/elements/1.1/type> ?type .\n" 
				+ "  }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		String typeS = "";
		if (stringlst.size() > 0) {
			typeS = stringlst.get(0).get("type");
		}
		return typeS;
	}

	static public String getCommentFromAnnotation(String structure) {
		String query = "SELECT ?comment \n" 
				+ "	WHERE {\n" 
				+ "   " + structure + " rdfs:comment ?comment\n" 
				+ "  }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		String commentS = "";
		if (stringlst.size() > 0) {
			commentS = stringlst.get(0).get("comment");
		}
		return commentS;
	}

	static public String getLabelFromAnnotation(String structure) {
		String query = "SELECT ?label \n" 
				+ "	WHERE {\n" 
				+ "   " + structure + " rdfs:label ?label .\n" 
				+ "  }";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		String labelS = "";
		if (stringlst.size() > 0) {
			labelS = stringlst.get(0).get("label");
		}
		return labelS;
	}

	
	
	static public SetOfBaseCatalogRecordElementInformation parseElements(String classname, String label, String type) {
		String query = "SELECT ?subject ?record ?cardinality\n" + 
				"	WHERE { " + classname  + " rdfs:subClassOf ?object ."
						+ "?object owl:onProperty " + type + " ."
						+ "{?object owl:someValuesFrom ?record   }"
						+ "UNION"
						+ "{?object owl:onClass ?record . ?object owl:qualifiedCardinality ?cardinality}"
						+ "}";
		List<Map<String, RDFNode>> lst = OntologyBase.resultSetToMap(query);
		List<Map<String, String>> stringlst = OntologyBase.resultmapToStrings(lst);
		
		SetOfBaseCatalogRecordElementInformation set = new SetOfBaseCatalogRecordElementInformation(label);

		for(Map<String, String> map : stringlst) {
			String elementType = map.get("record");
			String cardinalityS = map.get("cardinality");
			boolean singlet = true;
			int cardinality = 0;
			if (cardinalityS != null) {
				cardinality = Integer.parseInt(cardinalityS);
				if (cardinality > 1) {
					singlet = false;
				}
			} else {
				singlet = false;
			}
			set.addBaseCatalogRecordElementInformation(elementType,singlet);
		}
		return set;
	}

}