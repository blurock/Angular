package info.esblurock.background.services.firestore;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class WriteFirestoreCatalogObject {
	public static Timestamp write(Firestore db, JsonObject catalog, JsonObject firestorecatalogid) throws IOException {
		System.out.println(JsonObjectUtilities.toString(firestorecatalogid));
		DocumentReference docRef = SetUpDocumentReference.setup(db, firestorecatalogid);
		System.out.println(docRef);
		Type type = new TypeToken<HashMap<String, Object>>() {}.getType();
		Map<String, Object> mapObj = new Gson().fromJson(catalog, type);
		System.out.println(mapObj);
		ApiFuture<WriteResult> result = docRef.set(mapObj);
		Timestamp time = null;
		try {
			time = result.get().getUpdateTime();
		} catch (InterruptedException | ExecutionException e) {
			throw new IOException("Catalog write to database failed: \n" + e.getMessage());
		}
		return time;
	}
}
