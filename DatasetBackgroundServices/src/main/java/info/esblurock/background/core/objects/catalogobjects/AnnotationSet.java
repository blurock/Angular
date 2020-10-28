package info.esblurock.background.core.objects.catalogobjects;

import java.util.HashSet;
import java.util.Set;

import org.json.JSONObject;

import info.esblurock.background.core.objects.base.BaseObjectJSONInterface;
import info.esblurock.background.core.objects.catalogandrecords.SetOfStandardOntologyCatalogElementHierarchy;
import info.esblurock.background.core.objects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.background.core.objects.ontology.BaseAnnotationObjects;


public class AnnotationSet extends BaseObjectJSONInterface {
	Set<BaseAnnotationObjects> annotations;
	
	public AnnotationSet() {
		this.annotations = new HashSet<BaseAnnotationObjects>();
	}
	
	public void fill(StandardOntologyCatalogElementHierarchy hierarchy) {
		BaseAnnotationObjects ann = hierarchy.getAnnotations();
		annotations.add(ann);
		fill(hierarchy.getSubComponentsSinglet());
		fill(hierarchy.getSubRecordsSinglet());
		fill(hierarchy.getSubRecordsMultiple());	
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
