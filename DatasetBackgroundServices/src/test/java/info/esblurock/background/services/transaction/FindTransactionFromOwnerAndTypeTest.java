package info.esblurock.background.services.transaction;

import static org.junit.Assert.*;
import com.google.gson.JsonObject;

import org.junit.Test;

import info.esblurock.background.services.firestore.InitiallizeSystem;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class FindTransactionFromOwnerAndTypeTest {

	@Test
	public void test() {
		InitiallizeSystem.initialize();
		JsonObject activity = new JsonObject();
		activity.addProperty(ClassLabelConstants.CatalogObjectOwner, "UOqk0KtFtaXma5TGsi8Seh9RMbx1");
		activity.addProperty(ClassLabelConstants.TransactionEventType, "dataset:InitializerUserAccount");
		
		JsonObject responseJsonObject = FindTransactions.FindTransactionFromOwnerAndType(activity);
		JsonObjectUtilities.printResponse(responseJsonObject);
		}

}
