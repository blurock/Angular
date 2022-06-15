package info.esblurock.background.services.firestore.gcs;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.io.IOUtils;
import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;

public enum UploadFileToGCS {

	LocalFileSystem {

		@Override
		JsonObject process(String transactionID, String owner, String maintainer, JsonObject info) {
			Document document = MessageConstructor.startDocument("InitialReadInLocalStorageSystem");
			Element body = MessageConstructor.isolateBody(document);
			String location = info.get(ClassLabelConstants.FileSourceIdentifier).getAsString();
			body.addElement("div").addText("File Location: '" + location + "'");
			Path filePath = Paths.get(location);
			JsonObject response = new JsonObject();
			try {
				String content = Files.readString(filePath);
				response = WriteCloudStorage.writeString(transactionID, owner, maintainer, content, info,
						"dcat:LocalFileSystem");
				if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
					JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
					JsonObject gcsstaging = arr.get(0).getAsJsonObject();
					gcsstaging.addProperty(ClassLabelConstants.CatalogObjectType,
							"dataset:InitialReadInLocalStorageSystem");
				}
			} catch (IOException e) {
				response = DatabaseServicesBase.standardErrorResponse(document,
						"Error in reading: '" + location + "'\n" + e.getMessage(), response);
			}
			return response;
		}

	},
	URLSourceFile {

		@Override
		JsonObject process(String transactionID, String owner, String maintainer, JsonObject info) {
			Document document = MessageConstructor.startDocument("InitialReadFromWebLocation");
			Element body = MessageConstructor.isolateBody(document);
			String location = info.get(ClassLabelConstants.FileSourceIdentifier).getAsString();
			body.addElement("div").addText("File Location: '" + location + "'");
			JsonObject response = new JsonObject();
			InputStream in = null;
			try {
				in = new URL(location).openStream();
				String content = IOUtils.toString(in, StandardCharsets.UTF_8);
				response = WriteCloudStorage.writeString(transactionID, owner, maintainer, content, info,
						"dcat:URLSourceFile");
				JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
					JsonObject gcsstaging = arr.get(0).getAsJsonObject();
					gcsstaging.addProperty(ClassLabelConstants.CatalogObjectType, "dataset:InitialReadFromWebLocation");
				}
			} catch (MalformedURLException e) {
				response = DatabaseServicesBase.standardErrorResponse(document,
						"Error in reading: '" + location + "'\n" + e.getMessage(), response);
			} catch (IOException e) {
				response = DatabaseServicesBase.standardErrorResponse(document,
						"Error in reading: '" + location + "'\n" + e.getMessage(), response);
			} finally {
				try {
					IOUtils.close(in);
				} catch (IOException e) {
					response = DatabaseServicesBase.standardErrorResponse(document,
							"Error in closing: '" + location + "'\n" + e.getMessage(), response);
				}
			}
			return response;
		}
	},
	StringSource {

		@Override
		JsonObject process(String transactionID, String owner, String maintainer, JsonObject info) {
			Document document = MessageConstructor.startDocument("InitialReadFromStringSource");
			Element body = MessageConstructor.isolateBody(document);
			String contentutf8 = info.get(ClassLabelConstants.FileSourceIdentifier).getAsString();
			String content = "";
            try {
                content = URLDecoder.decode(contentutf8,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            System.out.println("-------------");
            System.out.println(content);
            System.out.println("-------------");
			body.addElement("pre").addText("String content: '" + content + "'");
			JsonObject response = WriteCloudStorage.writeString(transactionID, owner, maintainer, content, info,
					"dcat:StringSource");
			if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
				JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				JsonObject gcsstaging = arr.get(0).getAsJsonObject();
				gcsstaging.addProperty(ClassLabelConstants.CatalogObjectType, "dataset:InitialReadFromUserInterface");
			}
			return response;
		}

	};

	/**
	 * Read content from source and upload to blob (dependent on source)
	 * 
	 * @param transactionID The transaction id
	 * @param maintainer    who can manipulate the file (usually the owner)
	 * @param info          Additional information that might be needed to perform
	 *                      the action
	 * @return The response of writing the file as a blob
	 * 
	 */
	abstract JsonObject process(String transactionID, String owner, String maintainer, JsonObject info);

	/**
	 * Read content from source and upload to blob
	 * 
	 * @param transactionID The transaction id
	 * @param owner         The owner of the catalog object
	 * @param info          Additional information that might be needed to perform
	 *                      the action
	 * @return The response of writing the file as a blob
	 * 
	 *         Here the info is used to specify the source type of the file (used in
	 *         the enum)
	 * 
	 */
	public static JsonObject readFromSource(String transactionID, String owner, JsonObject info) {

		JsonObject recordid = info.get(ClassLabelConstants.DatasetTransactionSpecificationForCollection)
				.getAsJsonObject();
		String maintainer = recordid.get(ClassLabelConstants.CatalogDataObjectMaintainer).getAsString();
		if (maintainer == null) {
			maintainer = owner;
		}
		String source = info.get(ClassLabelConstants.UploadFileSource).getAsString();
		String sourcename = source.substring(8);
		UploadFileToGCS upload = UploadFileToGCS.valueOf(sourcename);
		JsonObject response = upload.process(transactionID, owner, maintainer, info);
		if (response.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
			JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
			JsonObject gcsstaging = arr.get(0).getAsJsonObject();
			gcsstaging.addProperty(ClassLabelConstants.CatalogObjectType, "dataset:InitialReadInLocalStorageSystem");
			gcsstaging.add(ClassLabelConstants.DatasetTransactionSpecificationForCollection, recordid);
			JsonObject stagingblob = gcsstaging.get(ClassLabelConstants.GCSBlobFileInformationStaging)
					.getAsJsonObject();
			String description = info.get(ClassLabelConstants.DescriptionTitle).getAsString();
			stagingblob.addProperty(ClassLabelConstants.DescriptionAbstract, description);
		}
		return response;
	}

}