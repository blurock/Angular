package info.esblurock.core.DataBaseObjects.catalogobjects;

import java.util.Set;

import org.json.JSONObject;

import info.esblurock.core.DataBaseObjects.constants.SupplementaryConstants;

public class BaseCatalogObject  extends BaseRecordObject {
	
	String sourceID; 
	String creation; 
	String access; 
	String owner; 
	String type;

	
	public BaseCatalogObject() {
		super();
		this.sourceID = "";
		this.creation = "";
		this.access = "";
		this.owner = "";
		this.type = "";
	}
	public BaseCatalogObject(String sourceID, String creation, String access, String owner, String type) {
		super();
		this.sourceID = sourceID;
		this.creation = creation;
		this.access = access;
		this.owner = owner;
		this.type = type;
	}

	public void fillBaseInfo(String sourceID, String creation, String access, String owner, String type) {
		this.sourceID = sourceID;
		this.creation = creation;
		this.access = access;
		this.owner = owner;
		this.type = type;		
	}
	

	@Override
	public JSONObject toJSONObject() {
		JSONObject catobj = super.toJSONObject();
		catobj.put(SupplementaryConstants.sourceID, this.sourceID);
		catobj.put(SupplementaryConstants.date, this.creation);
		catobj.put(SupplementaryConstants.access, this.access);
		catobj.put(SupplementaryConstants.owner, this.owner);
		catobj.put(SupplementaryConstants.type, this.type);
		return catobj;
	}

	@Override
	public void fillJSONObject(JSONObject obj) {
		super.fillJSONObject(obj);
		this.sourceID = (String) obj.get(SupplementaryConstants.sourceID);
		obj.put(SupplementaryConstants.sourceID, (String) null);			
		this.creation = (String) obj.get(SupplementaryConstants.date);
		obj.put(SupplementaryConstants.date, (String) null);			
		this.access = (String) obj.get(SupplementaryConstants.owner);
		obj.put(SupplementaryConstants.access, (String) null);			
		this.owner = (String) obj.get(SupplementaryConstants.owner);
		obj.put(SupplementaryConstants.owner, (String) null);			
		this.type = (String) obj.get(SupplementaryConstants.type);
		obj.put(SupplementaryConstants.type, (String) null);
	}
	
}
