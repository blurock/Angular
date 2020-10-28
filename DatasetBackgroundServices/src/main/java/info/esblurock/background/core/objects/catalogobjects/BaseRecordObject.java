package info.esblurock.background.core.objects.catalogobjects;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;
import info.esblurock.background.core.objects.catalogandrecords.SetOfStandardOntologyCatalogElementHierarchy;
import info.esblurock.background.core.objects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.background.core.objects.ontology.BaseAnnotationObjects;


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
			PropertyValuePairs pair = new PropertyValuePairs(annotations.getAltlabel());
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
	public JSONObject toJSONObject() {
		JSONObject catobj = new JSONObject();
		for(PropertyValuePairs pair : pairs) {
			catobj.put(pair.property, pair.value);
		}
		for(String name : records.keySet()) {
			catobj.put(name, records.get(name).toJSONObject());
		}
		Set<String> keys = multrecords.keySet();
		for(String key: keys) {
			RecordArray arr = new RecordArray();
			arr.setMultiplename(key);
			JSONObject obj = arr.toJSONObject();
			JSONArray jarr = obj.getJSONArray(key);
			catobj.put(key, jarr);
		}
		return catobj;
	}

	@Override
	public void fillJSONObject(JSONObject obj) {
		Set<String> keys = obj.keySet();
		for(String key : keys) {
				PropertyValuePairs pair = new PropertyValuePairs();
				pair.setProperty(key);
				Object subobj = obj.get(key);
				if(subobj instanceof String) {
					pair.setValue((String) obj.get(key));
				} else if(subobj instanceof JSONObject) {
					JSONObject jobj = (JSONObject) subobj;
					BaseRecordObject base = new BaseRecordObject();
					base.fillJSONObject(jobj);
					records.put(key, base);
				} else if(subobj instanceof JSONArray) {
					RecordArray recarr = new RecordArray();
					recarr.setMultiplename(key);
					JSONArray arr = (JSONArray) subobj;
					for(int i=0; i< arr.length();i++) {
						JSONObject arrobj = (JSONObject) arr.get(i);
						BaseRecordObject base = new BaseRecordObject();
						base.fillJSONObject(arrobj);
						recarr.addRecordObject(base);
					}
					//multrecords.add(recarr);
				}
			}
		}

}
