package esblurock.info.respecth.xml;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

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
	
	/** Find the list of nodes names of the children
	 * @param node The top document node (at this level)
	 * @return a list of node names
	 */
	public static List<String> listNodesFromDocumentNode(Node node) {
		List<String> names = new ArrayList<String>();
        NodeList nodeList = node.getChildNodes();
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node childNode = nodeList.item(i);
            String name = childNode.getNodeName();
            names.add(name);
        }
        return names;
	}

}
