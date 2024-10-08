package esblurock.info.xml;

import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Set;

import javax.xml.parsers.ParserConfigurationException;

import org.junit.Test;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import com.google.gson.JsonArray;

import org.w3c.dom.Node;

import esblurock.info.respecth.json.JsonObjectUtilities;
import esblurock.info.respecth.xml.XMLUtilities;

public class XMLUtilitiesTest {
	
	
	public static Document getDocumentFromTestFile() {
		String fileS = "/g00000001_x.xml";
		return getDocumentFromTestFile(fileS);
	} 
	public static Document getDocumentFromTestFile(String fileS) {
		InputStream inputStream = XMLUtilitiesTest.class.getResourceAsStream(fileS);
		Document doc = null;
		try {
			doc = XMLUtilities.readXMLFromFileStream(inputStream);
		} catch (ParserConfigurationException | SAXException | IOException e) {
			System.out.println("Error in reading XML file");
			e.printStackTrace();
		}
		return doc;
	}

	@Test
	public void testReadXMLFromFileStream() {
		System.out.println("XMLUtilitiesTest: testReadXMLFromFileStream()");
		Document doc = getDocumentFromTestFile();
		if(doc != null) {
		System.out.println("Read Successful");
		Node root = doc.getDocumentElement();

        // Print the root element's tag name
        System.out.println("Root element: " + root.getNodeName());
        System.out.println("Number of children: " + root.getChildNodes().getLength());
		} else {
			fail("testReadXMLFromFileStream() failed");
		}
	}

	@Test
	public void testListNodesFromDocumentNode() {
		System.out.println("XMLUtilitiesTest: testListNodesFromDocumentNode()");
		Document doc = getDocumentFromTestFile();
		if(doc != null) {
			Node root = doc.getDocumentElement();
			System.out.println("Root element: " + root.getNodeName());
			JsonArray lst = XMLUtilities.listNodesFromDocumentNode(root);
			System.out.println("List of Child Element names");
			System.out.println(JsonObjectUtilities.toString(lst));
		} else {
			fail("Test failed on reading document");
		}
	}
	
	@Test
	public void testGetChildWithNameFromDocumentNode() {
		System.out.println("XMLUtilitiesTest: GetChildWithNameFromDocumentNode(root,experimentType)");
		
		String identifier = "experimentType";
		Document doc = getDocumentFromTestFile();
		if(doc != null) {
			Node root = doc.getDocumentElement();
			Node found = XMLUtilities.getChildWithNameFromDocumentNode(root, identifier);
			if(found != null) {
			System.out.println("Node found: " + found.getNodeName());
			} else {
				fail("node not found");
			}
		} else {
			fail("Couldn't read default document");
		}

	}

}
