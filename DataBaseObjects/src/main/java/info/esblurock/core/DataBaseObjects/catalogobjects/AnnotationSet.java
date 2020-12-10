package info.esblurock.core.DataBaseObjects.catalogobjects;

import java.util.HashSet;
import java.util.Set;

import org.json.JSONObject;

import info.esblurock.core.DataBaseObjects.base.BaseObjectJSONInterface;
import info.esblurock.core.DataBaseObjects.catalogandrecords.SetOfStandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;


public class AnnotationSet extends BaseObjectJSONInterface {
	Set<BaseAnnotationObjects> annotations;
	
	public AnnotationSet() {
		annotations = new HashSet<BaseAnnotationObjects>();
	}

	public BaseAnnotationObjects getAnnotations(StandardOntologyCatalogElementHierarchy hierarchy) {
		BaseAnnotationObjects ann = hierarchy.getAnnotations();
		return ann;
	}
	public void fill(StandardOntologyCatalogElementHierarchy hierarchy) {
		System.out.println(hierarchy.getCatalogName());
		BaseAnnotationObjects ann = getAnnotations(hierarchy);
		annotations.add(ann);
		fill(hierarchy.getSubComponentsSinglet());
		fill(hierarchy.getSubRecordsSinglet());
		fill(hierarchy.getSubRecordsMultiple());	
		fill(hierarchy.getSubComponentsMultiple());
	}
	
	public void fill(SetOfStandardOntologyCatalogElementHierarchy compset) {
		Set<StandardOntologyCatalogElementHierarchy> compcatset = compset.getSetOfCatalogElements();
		for(StandardOntologyCatalogElementHierarchy comp : compcatset) {
			fill(comp);
		}
	}
	
	@Override
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		for(BaseAnnotationObjects ann : annotations) {
			JSONObject jann = ann.toJSONObject();
			obj.put(ann.getAltlabel(), jann);
		}
		return obj;
	}

	@Override
	public void fillJSONObject(JSONObject obj) {
		Set<String> keys = obj.keySet();
		for(String key : keys) {
			JSONObject jann = obj.getJSONObject(key);
			BaseAnnotationObjects ann = new BaseAnnotationObjects();
			ann.fillJSONObject(jann);
			annotations.add(ann);
		}
		
	}

}
