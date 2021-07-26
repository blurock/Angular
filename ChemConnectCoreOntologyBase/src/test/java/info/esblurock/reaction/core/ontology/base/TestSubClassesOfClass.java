package info.esblurock.reaction.core.ontology.base;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import info.esblurock.reaction.core.ontology.base.utilities.OntologyUtilityRoutines;

public class TestSubClassesOfClass {

	@Test
	public void testListOfSubClasses() {
		String top1 = "dataset:RepositoryFile";
		List<String> sub1 = OntologyUtilityRoutines.listOfSubClasses(top1, true);
		System.out.println("SubClasses: (true)\n" + sub1.toString());
		List<String> sub2 = OntologyUtilityRoutines.listOfSubClasses(top1, false);
		System.out.println("SubClasses: (false)\n" + sub2.toString());
	}

	@Test
	public void testIsSubClassOf() {
		String class1 = "dataset:RepositoryFile";
		String subclass1 = "dataset:InitialReadFromUserInterface";
		System.out.println("isSubClassOf");
		System.out.println(class1 + " subclass of " + subclass1 + " (indirect): " 
				+ OntologyUtilityRoutines.isSubClassOf(subclass1, class1, false));
		System.out.println(class1 + " subclass of " + subclass1 + "(direct): " 
				+ OntologyUtilityRoutines.isSubClassOf(subclass1, class1, true));
	}

	@Test
	public void testIsSameClass() {
		String class1 = "dataset:RepositoryFile";
		String subclass1 = "dataset:InitialReadFromUserInterface";
		System.out.println("isSameClassOf");
		System.out.println(class1 + " subclass of " + subclass1 + " (no): " 
				+ OntologyUtilityRoutines.isSameClass(subclass1, class1));
		System.out.println(class1 + " subclass of " + subclass1 + "(yes): " 
				+ OntologyUtilityRoutines.isSameClass(class1, class1));
		
	}

	@Test
	public void testtypesFromIdentifier() {
		String identifier = "dataset:initreadusrinterface";
		String classname = OntologyUtilityRoutines.typesFromIdentifier(identifier);
		System.out.println("identifier: " + identifier + " is of class: " + classname);
	}

}
