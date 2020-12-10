package info.esblurock.background.core.ontology.dataset;

import info.esblurock.core.DataBaseObjects.catalogandrecords.BaseCatalogRecordElementInformation;
import info.esblurock.core.DataBaseObjects.catalogandrecords.SetOfBaseCatalogRecordElementInformation;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElement;
import info.esblurock.core.DataBaseObjects.catalogandrecords.StandardOntologyCatalogElementHierarchy;
import info.esblurock.core.DataBaseObjects.constants.OntologyObjectLabels;
import info.esblurock.core.DataBaseObjects.ontology.BaseAnnotationObjects;

public class GenerateCatalogObject {

	public static StandardOntologyCatalogElement getStandardOntologyCatalogElement(String catalogname) {

		SetOfBaseCatalogRecordElementInformation records = DatasetOntologyParseBase.parseElements(catalogname,
				OntologyObjectLabels.recordlabel, OntologyObjectLabels.recordOntologylabel);
		SetOfBaseCatalogRecordElementInformation mapping = DatasetOntologyParseBase.parseElements(catalogname,
				OntologyObjectLabels.mappinglabel, OntologyObjectLabels.mappingOntologylabel);
		SetOfBaseCatalogRecordElementInformation haspart = DatasetOntologyParseBase.parseElements(catalogname,
				OntologyObjectLabels.hasPartlabel, OntologyObjectLabels.hasPartOntologyLabel);
		BaseAnnotationObjects annotations = DatasetOntologyParseBase.getSubElementStructureFromIDObject(catalogname);
		StandardOntologyCatalogElement catalog = new StandardOntologyCatalogElement(catalogname, annotations, records,
				haspart, mapping);

		return catalog;
	}

	public static StandardOntologyCatalogElementHierarchy generateSetOfStandardOntologyCatalogElement(
			String catalogname) {
		StandardOntologyCatalogElement standard = getStandardOntologyCatalogElement(catalogname);
		StandardOntologyCatalogElementHierarchy gen = new StandardOntologyCatalogElementHierarchy(catalogname,
				standard.getAnnotations(), standard.getRdfmappings());
		
		SetOfBaseCatalogRecordElementInformation records = standard.getRecords();
		for (BaseCatalogRecordElementInformation info : records.getSet()) {
			StandardOntologyCatalogElementHierarchy hierarchy = generateSetOfStandardOntologyCatalogElement(
					info.getElementInformation());
			if (info.isSinglet()) {
				gen.addRecordSinglet(hierarchy);
			} else {
				gen.addRecordMultiple(hierarchy);
			}
		}
		SetOfBaseCatalogRecordElementInformation comp = standard.getComponents();
		for (BaseCatalogRecordElementInformation info : comp.getSet()) {
			StandardOntologyCatalogElementHierarchy hierarchy = generateSetOfStandardOntologyCatalogElement(
					info.getElementInformation());
			if (info.isSinglet()) {
				gen.addComponentsSinglet(hierarchy);
			} else {
				gen.addComponentsMultiple(hierarchy);
			}
		}
		return gen;
	}

}
