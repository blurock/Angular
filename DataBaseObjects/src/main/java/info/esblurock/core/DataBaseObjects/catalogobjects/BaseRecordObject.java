package info.esblurock.core.DataBaseObjects.catalogobjects;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.core.DataBaseObjects.catalogandrecords.SetOfStandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;


public class BaseRecordObject extends BaseObjectJSONInterface {
	Set<PropertyValuePairs> pairs;
	Map<String, BaseRecordObject> records;
	Map<String, RecordArray> multrecords;
	
	BaseRecordObject() {
		pairs = new HashSet<PropertyValuePairs>();
		this.records = new HashMap<String, BaseRecordObject>();
		this.multrecords = new HashMap<String, RecordArray>();
	}
	
	public void fill(StandardOntologyCatalogElementHierarchy hierarchy) {
		//PropertyValuePairs pair = new PropertyValuePairs(SupplementaryConstants.type,hierarchy.getCatalogName());
		//pairs.add(pair);
		fillSingletComponents(hierarchy.getSubComponentsSinglet());
		fillSingletRecords(hierarchy.getSubRecordsSinglet());
		fillMultipleRecords(hierarchy.getSubRecordsMultiple());
	}

	public void fillSingletComponents(SetOfStandardOntologyCatalogElementHierarchy compset) {
		Set<StandardOntologyCatalogElementHierarchy> compcatset = compset.getSetOfCatalogElements();
		for(StandardOntologyCatalogElementHierarchy comp : compcatset) {
			BaseAnnotationObjects annotations = comp.getAnnotations();
			PropertyValuePairs pair = new PropertyValuePairs(annotations.getAltlabel(), annotations.getAltlabel());
			pairs.add(pair);
		}		
	}
	
	public void fillSingletRecords(SetOfStandardOntologyCatalogElementHierarchy compset) {
		Set<StandardOntologyCatalogElementHierarchy> compcatset = compset.getSetOfCatalogElements();
		for(StandardOntologyCatalogElementHierarchy comp : compcatset) {
			BaseRecordObject subobj = new BaseRecordObject();
			subobj.fill(comp);
			BaseAnnotationObjects annotations = comp.getAnnotations();
			records.put(annotations.getAltlabel(), subobj);
		}
	}
	
	public void fillMultipleRecords(SetOfStandardOntologyCatalogElementHierarchy compset) {
		Set<StandardOntologyCatalogElementHierarchy> compcatset = compset.getSetOfCatalogElements();
		for(StandardOntologyCatalogElementHierarchy comp : compcatset) {
			RecordArray subarray = new RecordArray();
			BaseAnnotationObjects annotations = comp.getAnnotations();
			subarray.setMultiplename(comp.getCatalogName());
			multrecords.put(annotations.getAltlabel(),subarray);
		}
	}

	
	@Override
	public JsonObject toJsonObject() {
		JsonObject catobj = new JsonObject();
		for(PropertyValuePairs pair : pairs) {
			catobj.put(pair.property, pair.value);
		}
		for(String name : records.keySet()) {
			catobj.put(name, records.get(name).toJsonObject());
		}
		Set<String> keys = multrecords.keySet();
		for(String key: keys) {
			RecordArray arr = new RecordArray();
			arr.setMultiplename(key);
			JsonObject obj = arr.toJsonObject();
			JsonArray jarr = obj.getJsonArray(key);
			catobj.put(key, jarr);
		}
		return catobj;
	}

	@Override
	public void fillJsonObject(JsonObject obj) {
		Set<String> keys = obj.keySet();
		for(String key : keys) {
				PropertyValuePairs pair = new PropertyValuePairs();
				pair.setProperty(key);
				Object subobj = obj.get(key);
				if(subobj instanceof String) {
					pair.setValue((String) obj.get(key));
				} else if(subobj instanceof JsonObject) {
					JsonObject jobj = (JsonObject) subobj;
					BaseRecordObject base = new BaseRecordObject();
					base.fillJsonObject(jobj);
					records.put(key, base);
				} else if(subobj instanceof JsonArray) {
					RecordArray recarr = new RecordArray();
					recarr.setMultiplename(key);
					JsonArray arr = (JsonArray) subobj;
					for(int i=0; i< arr.length();i++) {
						JsonObject arrobj = (JsonObject) arr.get(i);
						BaseRecordObject base = new BaseRecordObject();
						base.fillJsonObject(arrobj);
						recarr.addRecordObject(base);
					}
					//multrecords.add(recarr);
				}
			}
		}

}
