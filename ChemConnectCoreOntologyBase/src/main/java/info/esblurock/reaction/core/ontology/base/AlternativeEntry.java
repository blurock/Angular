package info.esblurock.reaction.core.ontology.base;

public abstract class AlternativeEntry {
	
	public String getDataCubeURL() {
		return "http://purl.org/linked-data/cube";
	}
	public String getSSNURL() {
		return "http://www.w3.org/ns/ssn/";
	}
	public String getVcardURL() {
		return "http://www.w3.org/2006/vcard/ns";
	}
	public String getDCatURL() {
		return "http://www.w3.org/ns/dcat";
	}	
	public String getDctermsURL() {
		return "http://purl.org/dc/terms/";
	}
	public String getDCITypeURL() {
		return "http://purl.org/dc/dcmitype";
	}
	public String getProvoURL() {
		return "http://www.w3.org/ns/prov-o-20130430";
	}
	public String getOrgURL() {
		return "http://www.w3.org/ns/org#";
	}
	public String getFoafURL() {
		return "http://xmlns.com/foaf/0.1/";
	}
	public String getSKOSURL() {
		return "https://www.w3.org/2009/08/skos-reference/skos.rdf";
	}
	public String getDataCiteURL() {
		return "http://purl.org/spar/datacite/";
	}
	public String getGEOURL() {
		return "http://www.w3.org/2003/01/geo/wgs84_pos";
	}
	public String getDcTermsURL() {
		return "http://purl.org/dc/terms/";
	}
	
	public String getOwlURL() {
		return "http://www.w3.org/2002/07/owl#";
	}
	abstract public String getOwlLocal();
	public String getRDFSURL() {
		return "http://www.w3.org/2000/01/rdf-schema";
	}
	abstract public String getRDFSLocal();
	public String getXMLSchema() {
		return "http://www.w3.org/2001/XMLSchema";
	}
	
	public String getQUDTUnitOwl() {
		return "http://data.qudt.org/qudt/owl/1.0.0/unit.owl";
	}
	abstract public String getQUDTUnitOwlLocal();
	public String getQUDTUnit() {
		return "http://data.nasa.gov/qudt/owl/unit";
	}
	abstract public String getQUDTUnitLocal();
	public String getQUDTUnitPrefix() {
		return "unit:";
	}
	public String getPhysicsUnit() {
		return "http://qudt.org/2.0/vocab/VOCAB_QUDT-UNITS-PHYSICAL-CHEMISTRY-AND-MOLECULAR-PHYSICS-v2.0.ttl";
	}
	abstract public String getPhysicsUnitLocal();
	public String getPhysicsUnitPrefix() {
		return "unit:";
	}
	
	public String getQUDTQuantity() {
		//return "http://data.nasa.gov/qudt/owl/quantity";
		return "http://data.qudt.org/qudt/owl/1.0.0/quantity.owl";
	}
	abstract public String getQUDTQuantityLocal();

	public String getQUDTOwl() {
		return "http://data.qudt.org/qudt/owl/1.0.0/qudt.owl";
	}
	abstract public String getQUDTOwlLocal();
	
	public String getQUDTQudt() {
		return "http://data.nasa.gov/qudt/owl/qudt";
	}
	abstract public String getQUDTQudtLocal();
	public String getQUDTDimension() {
		return "http://data.qudt.org/qudt/owl/1.0.0/dimension.owl";
	}
	abstract public String getQUDTDimensionLocal();
	public String getElements() {
		return "http://purl.org/dc/elements/1.1/";
	}
	abstract public String getElementsLocal();
	public String getSOSA() {
		return "http://www.w3.org/ns/sosa/";
	}
	abstract public String getSOSALocal();
}
