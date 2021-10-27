package info.esblurock.background.services.firestore.gcs;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.io.IOUtils;
import org.dom4j.Document;
import org.dom4j.Element;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.service.MessageConstructor;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;

public enum UploadFileToGCS {
	
	LocalFileSystem {

		@Override
		JsonObject process(String transactionID, String owner, JsonObject prerequisites, JsonObject info) {
			Document document = MessageConstructor.startDocument("InitialReadInLocalStorageSystem");
			Element body = MessageConstructor.isolateBody(document);
			String location = info.get(ClassLabelConstants.FileSourceIdentifier).getAsString();
			body.addElement("div").addText("File Location: '" + location + "'");
			Path filePath = Paths.get(location);
			JsonObject response = new JsonObject();
			try {
				String content = Files.readString(filePath);
				response = WriteCloudStorage.writeString(transactionID, owner, content ,info ,"dcat:LocalFileSystem");
				JsonArray arr = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
				JsonObject gcsstaging = arr.get(0).getAsJsonObject();
				gcsstaging.addProperty(ClassLabelConstants.CatalogObjectType, "dataset:InitialReadInLocalStorageSystem");				
			} catch (IOException e) {
				DatabaseServicesBase.standardErrorResponse(document, "Error in reading: '" + location + "'\n" + e.getMessage(), response);
			}
			return response;
		}
		
	}, URLSourceFile {
		
		@Override
		JsonObject process(String transactionID, String owner, JsonObject prerequisites, JsonObject info) {
			Document document = MessageConstructor.startDocument("InitialReadFromWebLocation");
			Element body = MessageConstructor.isolateBody(document);
			String location = info.get(ClassLabelConstants.FileSourceIdentifier).getAsString();
			body.addElement("div").addText("File Location: '" + location + "'");
			JsonObject response = new JsonObject();
			InputStream in = null;
			 try {
				in = new URL( location ).openStream();
			    String content =  IOUtils.toString( in, StandardCharsets.UTF_8);
				response = WriteCloudStorage.writeString(transactionID, owner, content,info, "dcat:URLSourceFile");
				JsonObject gcsstaging = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
				gcsstaging.addProperty(ClassLabelConstants.CatalogObjectType, "dataset:InitialReadFromWebLocation");
			 } catch (MalformedURLException e) {
					response = DatabaseServicesBase.standardErrorResponse(document, "Error in reading: '" + location + "'\n" + e.getMessage(), response);
			} catch (IOException e) {
				response = DatabaseServicesBase.standardErrorResponse(document, "Error in reading: '" + location + "'\n" + e.getMessage(), response);
			} finally {
					try {
						IOUtils.close(in);
					} catch (IOException e) {
						response = DatabaseServicesBase.standardErrorResponse(document, "Error in closing: '" + location + "'\n" + e.getMessage(), response);
					}
			}
			 return response;
		}
	}, StringSource {

		@Override
		JsonObject process(String transactionID, String owner, JsonObject prerequisites, JsonObject info) {
			Document document = MessageConstructor.startDocument("InitialReadFromWebLocation");
			Element body = MessageConstructor.isolateBody(document);
			String content = info.get(ClassLabelConstants.FileSourceIdentifier).getAsString();
			body.addElement("pre").addText("String content: '" + content + "'");
			JsonObject response = WriteCloudStorage.writeString(transactionID, owner, content,info,"dcat:StringSource");
			JsonObject gcsstaging = response.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
			gcsstaging.addProperty(ClassLabelConstants.CatalogObjectType, "dataset:InitialReadFromUserInterface");
			return response;
		}
		
	};

	abstract JsonObject process(String transactionID, String owner, JsonObject prerequisites, JsonObject info);
	
	public static JsonObject readFromSource(String transactionID, String owner, JsonObject prerequisites, JsonObject info) {
		
		String source  = info.get(ClassLabelConstants.UploadFileSource).getAsString();
		String sourcename = source.substring(8);
		UploadFileToGCS upload = UploadFileToGCS.valueOf(sourcename);
		JsonObject response = upload.process(transactionID, owner, prerequisites, info);
		return response;
	}



}