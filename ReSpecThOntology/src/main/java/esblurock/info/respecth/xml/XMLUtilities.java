package esblurock.info.respecth.xml;

import java.io.IOException;
import java.io.InputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.google.gson.JsonArray;

/** Utility routines for parsing XML files
 * 
 */
public class XMLUtilities {
	
	/**
	 * @param inputStream The steam where the XML file resides
	 * @return the XML Document
	 * @throws ParserConfigurationException Exception if reading fails
	 * @throws SAXException Exception if reading fails
	 * @throws IOException Exception if reading fails
	 */
	public static Document readXMLFromFileStream(InputStream inputStream) throws ParserConfigurationException, SAXException, IOException {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(inputStream);
        return doc;
	}
	
	/** Find the list of unique nodes names of the children
	 * @param node The top document node (at this level)
	 * @return a list of node names
	 */
	public static JsonArray listNodesFromDocumentNode(Node node) {
		JsonArray names = new JsonArray();
        NodeList nodeList = node.getChildNodes();
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node childNode = nodeList.item(i);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
            	String name = childNode.getNodeName();
            	names.add(name);
            }
        }
        return names;
	}

	public static Node getChildWithNameFromDocumentNode(Node node, String identifier) {
		Node found = null;
        NodeList nodeList = node.getChildNodes();
        for (int i = 0; i < nodeList.getLength() && found == null; i++) {
            Node childNode = nodeList.item(i);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
            	
            	String name = childNode.getNodeName();
            	if(name.equals(identifier)) {
            		found = childNode;
            		

            	}
            }
        }
        return found;
	}

}
