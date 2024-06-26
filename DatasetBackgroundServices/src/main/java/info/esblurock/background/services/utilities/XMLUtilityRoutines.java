package info.esblurock.background.services.utilities;

import java.util.List;


import org.json.JSONObject;
import org.json.XML;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;

import com.google.gson.JsonObject;

import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

public class XMLUtilityRoutines {
	public static Document convertStringToXMLDocument(String xmlString) {
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xmlString);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc;
	}

	public static JsonObject convertXMLToJsonObject(Node node) {
		JsonObject json = null;
	       if (node.getNodeType() == Node.ELEMENT_NODE) {
	    	   Element element = (Element) node;
	    	   json = convertXMLToJsonObject(element);
	       } else {
	    	   System.out.println("Node not element: " + node.getNodeType());
	       }
	       return json;
	}

	public static JsonObject convertXMLToJsonObject(Element element) {
		JsonObject jsonobject = null;
		//try {
			/*
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(element);
			StreamResult result = new StreamResult(new StringWriter());
			transformer.transform(source, result);
			String strObject = result.getWriter().toString();
*/ 
			String strObject = element.asXML();
			JSONObject json = XML.toJSONObject(strObject);
			jsonobject = JsonObjectUtilities.jsonObjectFromString(json.toString());
			/*
		} catch (TransformerException ex) {
			System.out.println("Transformer error");
			System.out.println(ex);
		}
		*/
		return jsonobject;
	}

	public static String convertXMLToString(Node node) {
		String str = null;
		if (node.getNodeType() == Node.ELEMENT_NODE) {
			Element element = (Element) node;
			str = convertXMLToString(element);
		}
		return str;
	}

	public static String convertXMLToString(Element element) {
		/*
		String strObject = null;
		try {
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(element);
			StreamResult result = new StreamResult(new StringWriter());
			transformer.transform(source, result);
			strObject = result.getWriter().toString();
		} catch (TransformerException ex) {
			System.out.println(ex);
		}
		return strObject;
		*/
		return element.asXML();
	}
	
	public static JsonObject getJsonObjectFromDocument(Document doc, String identifier) {
		Element node = doc.getRootElement().element(identifier);
		/*
		NodeList list = doc.getElementsByTagName(identifier);
		Node node = list.item(0);
		JsonObject result = XMLUtilityRoutines.convertXMLToJsonObject(node);
		*/
		JsonObject result = XMLUtilityRoutines.convertXMLToJsonObject(node);
		JsonObject top = result.get(identifier).getAsJsonObject();
		return top;
	}
	
	public static String retrieveAsStringFromDocument(Document doc, String identifier) {
		Element node = doc.getRootElement().element(identifier);

		//NodeList list = doc.getElementsByTagName(identifier);
		//Node node = list.item(0);
		String strObject = XMLUtilityRoutines.convertXMLToString(node);
		return strObject;
	}
	
	public static String[] parseObjectsFromXMLString(String documentS, String identifier) {
	    System.out.println("parseObjectsFromXMLString: " + identifier);
		Document document = convertStringToXMLDocument(documentS);
		Element node = document.getRootElement().element(identifier);
		List<Element> childNodes = node.elements();
		String[] lst = new String[childNodes.size()];
		int i=0;
		for (Element child : childNodes) {
			String content = convertXMLToString(child);
			lst[i++] = content;
            
        }
		/*
		//NodeList nlst = document.getElementsByTagName(identifier);
        //System.out.println("parseObjectsFromXMLString: " + nlst.getLength());
		String[] lst = new String[nlst.getLength()];
		for(int i=0; i < nlst.getLength();i++) {
			Node node = nlst.item(i);
			String content = convertXMLToString(node);
			lst[i] = content;
		}
		
		*/
		return lst;
	}
}
