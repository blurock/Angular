package info.esblurock.reaction.core.ontology.dataset;


import org.junit.Test;

import info.esblurock.reaction.core.ontology.base.dataset.CompoundObjectDimensionSet;
import info.esblurock.reaction.core.ontology.base.dataset.ParseCompoundObject;

public class TestGetCompoundObjectDimensionElements {

	@Test
	public void test() {
		String element1 = "dataset:DatabasePerson";
		//String element1 = "dataset:ThermodynamicBensonSpecification";
		CompoundObjectDimensionSet set1 = ParseCompoundObject.getCompoundElements(element1);
		System.out.println(set1.toString());
	}

}
