package info.esblurock.background.services.firestore.gcs;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.dom4j.Document;
import org.dom4j.Element;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;

public class WriteCloudStorage {

	/**
	 * @param transactionid The transaction id
	 * @param maintainer    The maintainer of the file
	 * @param content       The actual content that should be stored
	 * @param info          auxilliary information
	 * @param uploadsource  The upload source
	 * @return
	 */
	public static JsonObject writeString(String transactionid, String owner, String maintainer, String content,
			JsonObject info, String uploadsource) {
		Storage storage;
		Document document = MessageConstructor.startDocument("WriteCloudStorage");
		Element body = MessageConstructor.isolateBody(document);
		JsonObject response = new JsonObject();
		String formattype = info.get(ClassLabelConstants.FileSourceFormat).getAsString();
		body.addElement("div").addText("File Type: " + formattype);
		String mediatype = info.get(ClassLabelConstants.FileSourceMediaType).getAsString();
		body.addElement("div").addText("Media Type: " + mediatype);
		String mediasubtype = info.get(ClassLabelConstants.FileSourceMediaSubType).getAsString();
		body.addElement("div").addText("Media  SubType: " + mediasubtype);
		Bucket bucket = StorageClient.getInstance().bucket();
		storage = StorageOptions.getDefaultInstance().getService();
		// Create blob
		String formatallabel = formattype.substring(8);
		String dirpath = "upload/" + maintainer + "/" + formatallabel;
		String dir = dirpath + "/" + transactionid;

		body.addElement("div").addText("Write to: " + dir);
		BlobInfo blobInfo = BlobInfo.newBuilder(bucket.getName(), dir)
				.setContentEncoding(StandardCharsets.UTF_8.toString()).setContentType("text").build();
		// Upload blob to GCS (same as Firebase Storage)
		byte[] contentB = content.getBytes(StandardCharsets.UTF_8);
		storage.create(blobInfo, contentB);
		JsonObject catalog = BaseCatalogData.createStandardDatabaseObject("dataset:RepositoryFileStaging", owner,
				transactionid, "false");
		JsonObject gcsblobinfo = catalog.get(ClassLabelConstants.GCSBlobFileInformationStaging).getAsJsonObject();
		gcsblobinfo.addProperty(ClassLabelConstants.GCSFilePath, dirpath);
		gcsblobinfo.addProperty(ClassLabelConstants.GCSFileName, transactionid);
		gcsblobinfo.addProperty(ClassLabelConstants.FileSourceFormat, formattype);
		gcsblobinfo.addProperty(ClassLabelConstants.FileSourceMediaType, mediatype);
		gcsblobinfo.addProperty(ClassLabelConstants.FileSourceMediaSubType, mediasubtype);
		gcsblobinfo.addProperty(ClassLabelConstants.UploadFileSource, uploadsource);

		String descrtitle = info.get(ClassLabelConstants.DescriptionTitle).getAsString();
		catalog.addProperty(ClassLabelConstants.DescriptionTitle, descrtitle);

		JsonElement descr = info.get(ClassLabelConstants.DataDescriptionFileStaging);
		if (descr != null) {
			catalog.add(ClassLabelConstants.DataDescriptionFileStaging, descr);
		}
		JsonArray catalogarr = new JsonArray();
		catalogarr.add(catalog);
		response = DatabaseServicesBase.standardServiceResponse(document, "Success: WriteCloudStorage", catalogarr);
		return response;
	}
}
