package info.esblurock.reaction.core.ontology.base.rdfs;

import java.util.Iterator;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.constants.OntologyObjectLabels;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CompoundObjectDimensionInformation;
import info.esblurock.reaction.core.ontology.base.dataset.CompoundObjectDimensionSet;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.dataset.DatasetOntologyParseBase;
import info.esblurock.reaction.core.ontology.base.dataset.ParseCompoundObject;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.GenericSimpleQueries;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;
import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

public class FindRDFInClass {
	
	public static JsonArray createSetOfJsonObjectRDFs(JsonObject obj) {
		ListOfRDFInformation rdfset = createFullRDFForObject(obj);
		JsonArray arr = new JsonArray();
		Iterator<RDFInformation> iter = rdfset.getList().iterator();
		while(iter.hasNext()) {
			RDFInformation info = iter.next();
			JsonObject rdf = convertRDFInformationToJson(info,obj);
			arr.add(rdf);
		}
		return arr;
	}
	
	private static JsonObject convertRDFInformationToJson(RDFInformation info,JsonObject obj) {
		JsonObject json = CreateDocumentTemplate.createTemplate(info.getRdftriple());
		json.addProperty(ClassLabelConstants.RDFObjectClassName, info.getObjectClass());
		json.addProperty(ClassLabelConstants.RDFSubjectClassName, info.getSubjectClass());
		json.addProperty(ClassLabelConstants.RDFPredicate, info.getClassname());
		String classname = info.getRdftriple().substring(8);
		FillRDFTriple fill = FillRDFTriple.valueOf(classname);
		try {
			fill.fill(json, info);
		} catch(IllegalStateException ex) {
			System.out.println("----------------");
			System.out.println("Error in FillRDFTriple");
			System.out.println(ex.toString());
			System.out.println("Info: \n" + info.toString());
			System.out.println("----------------");
			System.out.println("Object: \n" + JsonObjectUtilities.toString(json));
			System.out.println("----------------");
		}
		BaseCatalogData.copyOwnerAndPriviledges(obj,json);
		
		//BaseCatalogData.insertCatalogObjectKey(json,classname);
		BaseCatalogData.insertCatalogObjectKey(json,info.getRdftriple());
		BaseCatalogData.copyTransactionID(obj, json);
		json.addProperty(ClassLabelConstants.DatabaseObjectType, info.getRdftriple());
		JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(json);
		firestoreid.remove(AnnotationObjectsLabels.identifier);
		json.add(ClassLabelConstants.FirestoreCatalogID, firestoreid);
		return json;
	}
	public static ListOfRDFInformation createFullRDFForObject(JsonObject obj) {
		String id = obj.get(AnnotationObjectsLabels.identifier).getAsString();
		String topclassname = GenericSimpleQueries.classFromIdentifier(id);
		ListOfRDFInformation complete = createFullRDFForObject(topclassname,obj);
		assignRDFTripleClass(complete);		
		return complete;
	}
	
	public static ListOfRDFInformation createFullRDFForObject(String topclassname,JsonObject obj) {
		ListOfRDFInformation complete = createRDFList(topclassname, obj);
		CompoundObjectDimensionSet set = ParseCompoundObject.getCompoundElements(topclassname);
		Iterator<CompoundObjectDimensionInformation> iter = set.iterator();
		while(iter.hasNext()) {
			CompoundObjectDimensionInformation info = iter.next();
			ListOfRDFInformation lst = createFullRDFForObject(info.getClassname(), obj);
			complete.addRDFInformation(lst);
		}
		return complete;
	}
	
	public static void assignRDFTripleClass(ListOfRDFInformation complete) {
		Iterator<RDFInformation> iter = complete.getList().iterator();
		while(iter.hasNext()) {
			RDFInformation info = iter.next();
			JsonElement subject = info.getSubjectValue();
			JsonElement object = info.getObjectValue();
			String rdftype = null;
			if(subject.isJsonPrimitive()) {
				if(object.isJsonPrimitive()) {
					rdftype = "dataset:RDFSubjectObjectPrimitives";
				} else {
					rdftype = "dataset:RDFSubjectPrimitiveObjectRecord";
				}
			} else {
				if(object.isJsonPrimitive()) {
					rdftype = "dataset:RDFObjectAsPrimitiveSubjectRecord";
				} else {
					rdftype = "dataset:RDFSubjectObjectAsRecord";
				}
			}
			info.setRdftriple(rdftype);
		}
	}

	public static ListOfRDFInformation createRDFList(String classname, JsonObject obj) {
		ListOfRDFInformation lst = find(classname);
		return fillInValues(lst, obj);
	}
	
	/** Find the RDFs for a class
	 * 
	 * @param classname The catalog/record/component classname
	 * @return The list of RDFInformation (without values)
	 */
	public static ListOfRDFInformation find(String classname) {
		ListOfRDFInformation lst = new ListOfRDFInformation();
		List<String> elements = OntologyUtilityRoutines.exactlyOnePropertyMultiple(classname, OntologyObjectLabels.mappingRelation);
		Iterator<String> iter = elements.iterator();
		while(iter.hasNext()) {
			createBaseRDFInformation(classname, iter.next(), lst);
		}
		return lst;
	}
	
	public static ListOfRDFInformation fillInValues(ListOfRDFInformation lst, JsonObject obj) {
		ListOfRDFInformation completed = new ListOfRDFInformation();
		Iterator<RDFInformation> iter = lst.getList().iterator();
		while(iter.hasNext() ) {
			RDFInformation info = iter.next();
			String objid = DatasetOntologyParseBase.getIDFromAnnotation(info.getObjectClass());
			JsonArray objectarr = JsonObjectUtilities.getValueUsingIdentifierMultiple(obj,objid);
			String subid = DatasetOntologyParseBase.getIDFromAnnotation(info.getSubjectClass());
			JsonArray subjectarr = JsonObjectUtilities.getValueUsingIdentifierMultiple(obj,subid);
			
			for(int i=0;i< objectarr.size();i++) {
				JsonElement object = objectarr.get(i);
				for(int j=0;j<subjectarr.size();j++) {
					JsonElement subject = subjectarr.get(j);
					RDFInformation rdf = new RDFInformation(info,subject, object);
					completed.addRDFInformation(rdf);
				}
			}
		}
		return completed;
	}
	


	/** Fill in information from RDF class
	 * 
	 * @param rdfclass The RDF class having the RDF information
	 * @param lst The list of base RDFInfomration
	 */
	private static void createBaseRDFInformation(String classname, String rdfclass, ListOfRDFInformation lst) {
		List<String> entities = OntologyUtilityRoutines.exactlyOnePropertyMultiple(rdfclass, OntologyObjectLabels.entity);
		List<String> members = OntologyUtilityRoutines.exactlyOnePropertyMultiple(rdfclass, OntologyObjectLabels.member);
		Iterator<String> memberiter = members.iterator();
		while(memberiter.hasNext()) {
			String member = memberiter.next();
			Iterator<String> entityiter = entities.iterator();
			while(entityiter.hasNext()) {
				String entity = entityiter.next();
				RDFInformation rdfInformation = new RDFInformation(rdfclass, member,rdfclass, entity);
				lst.addRDFInformation(rdfInformation);
			}
		}
	}
	
	
	

}
