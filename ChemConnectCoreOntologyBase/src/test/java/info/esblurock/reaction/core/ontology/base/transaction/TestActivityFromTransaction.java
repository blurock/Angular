package info.esblurock.reaction.core.ontology.base.transaction;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Map;

import org.junit.Test;

public class TestActivityFromTransaction {

	@Test
	public void test() {
		System.out.println("--------------------   activityOfTransaction");
		String transaction1 = "dataset:InitialReadFromUserInterface";
		String activity1 = TransactionConceptParsing.activityOfTransaction(transaction1);
		System.out.println(transaction1 + "  activity: " + activity1);
		System.out.println("--------------------   activityOfTransaction");

		System.out.println("--------------------   requirementsOfTransaction");

		String dependent = " dataset:TransferFileIntoCatagoryHierarchy";
		Map<String,ArrayList<String>> requirementsMap = TransactionConceptParsing.requirementsOfTransaction(dependent);
		System.out.println("Transaction: " + dependent + "\n" + requirementsMap);
		System.out.println("--------------------   requirementsOfTransaction");
		
	}

}
