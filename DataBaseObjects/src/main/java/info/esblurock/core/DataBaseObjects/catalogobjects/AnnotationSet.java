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
		this.annotations = new HashSet<BaseAnnotationObjects>();
	}
	
	public void fill(StandardOntologyCatalogElementHierarchy hierarchy) {
		fill(hierarchy.getSubComponentsSinglet());
		fill(hierarchy.getSubRecordsSinglet());
		fill(hierarchy.getSubRecordsMultiple());	
	}
	
	public void fill(SetOfStandardOntologyCatalogElementHierarchy compset) {
		Set<StandardOntologyCatalogElementHierarchy> compcatset = compset.getSetOfCatalogElements();
		for(StandardOntologyCatalogElementHierarchy comp : compcatset) {
			BaseAnnotationObjects ann = comp.getAnnotations();
			annotations.add(ann);
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
