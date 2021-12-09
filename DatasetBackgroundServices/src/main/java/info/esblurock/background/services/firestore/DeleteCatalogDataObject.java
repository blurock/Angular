package info.esblurock.background.services.firestore;

import java.io.IOException;
import java.util.List;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

public class DeleteCatalogDataObject {

	protected static Firestore db;
	protected static int batchsize = 1000;

	public static void getFirestoreID() {
		if (db == null) {
			try {
				db = FirestoreBaseClass.getFirebaseDatabase();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * @param query     The query with the conditions
	 * @param batchSize The default batch
	 * @return The number of deleted objects
	 */
	protected static int deleteCollection(Query query, int batchSize) {
		int deleted = 0;
		try {
			// retrieve a small batch of documents to avoid out-of-memory errors
			ApiFuture<QuerySnapshot> future = query.limit(batchSize).get();

			// future.get() blocks on document retrieval
			List<QueryDocumentSnapshot> documents = future.get().getDocuments();
			for (QueryDocumentSnapshot document : documents) {
				document.getReference().delete();
				++deleted;
			}
			if (deleted >= batchSize) {
				// retrieve and delete another batch
				deleteCollection(query, batchSize);
			}
		} catch (Exception e) {
			System.err.println("Error deleting collection : " + e.getMessage());
		}
		return deleted;
	}
}
