package info.esblurock.background.services.firestore;

import java.util.Iterator;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;

public class SetUpDocumentReference {

	public static DocumentReference setup(Firestore db, JsonObject firestorecatalogid) {
		DocumentReference docref = loopPairs(db,firestorecatalogid);
		String collection = firestorecatalogid.get(ClassLabelConstants.DataCatalog).getAsString();
		String document = firestorecatalogid.get(ClassLabelConstants.SimpleCatalogName).getAsString();
		docref = update(db,docref,collection,document);
		return docref;
	}
	
	public static CollectionReference setupCollection(Firestore db, JsonObject firestorecatalogid) {
		DocumentReference docref = loopPairs(db,firestorecatalogid);
		String collection = firestorecatalogid.get(ClassLabelConstants.DataCatalog).getAsString();
		CollectionReference coll = null;
		if(docref == null) {
			coll = db.collection(collection);
		} else {
			coll = docref.collection(collection);
		}
		return coll;
	}
	
	
	public static DocumentReference loopPairs(Firestore db, JsonObject firestorecatalogid) {
		DocumentReference docref = null;
		JsonObject json = firestorecatalogid.get(ClassLabelConstants.CollectionDocumentIDPairAddress).getAsJsonObject();
		JsonArray jarr = json.get(ClassLabelConstants.CollectionDocumentIDPair).getAsJsonArray();
		int idsize = jarr.size();
		for(int i=1; i<idsize;i++) {
			JsonObject pair = getCollectionDocumentIDPair(i+1,jarr);
			String collection = pair.get(ClassLabelConstants.DatasetCollectionID).getAsString();
			String document = pair.get(ClassLabelConstants.DatasetDocumentID).getAsString();
			docref = update(db,docref,collection,document);
		}
		return docref;
	}
	
	private static DocumentReference update(Firestore db, DocumentReference docref, String collection, String document) {
		if(docref == null) {
			CollectionReference col = db.collection(collection);
			docref = col.document(document);
		} else {
			CollectionReference col = docref.collection(collection);
			docref = col.document(document);
		}
		return docref;
	}

	private static JsonObject getCollectionDocumentIDPair(int targetlevel, JsonArray firestorecatalogid) {
		JsonObject pair = null;
		Iterator<JsonElement> iter = firestorecatalogid.iterator();
		while(iter.hasNext() && pair == null) {
			JsonObject p = (JsonObject) iter.next();
			int level = p.get(ClassLabelConstants.DatasetIDLevel).getAsInt();
			if(level == targetlevel) {
				pair = p;
			}
		}
		return pair;
	}

}
