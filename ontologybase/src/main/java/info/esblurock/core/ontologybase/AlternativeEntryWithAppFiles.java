package info.esblurock.core.ontologybase;

import java.net.URL;

public class AlternativeEntryWithAppFiles extends AlternativeEntry {

	public String getSKOSLocal() {
		String path = "file:info/esblurock/reaction/core/ontology/base/resources/skos.rdf";
		//URL url = getClass().getClassLoader().getResource(path);
		//return url.toString();
		return path;
	}
	public String getDataCubleLocal() {
		String path = "file:info/esblurock/reaction/core/ontology/base/resources/cube.ttl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	public String getVcardLocal() {
		String path = "file:info/esblurock/reaction/core/ontology/base/resources/vcard.ttl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	public String getDCatLocal() {
		String path = "file:info/esblurock/reaction/core/ontology/base/resources/dcat.ttl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	public String getElementsLocal() {
		String path = "file:info/esblurock/reaction/core/ontology/base/resources/dcelements.ttl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	public String getSSNLocal() {
		String path = "file:info/esblurock/reaction/core/ontology/base/resources/ssn.ttl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	public String getDcTermsLocal() {
		return "file:info/esblurock/reaction/core/ontology/base/resources/dcterms.ttl";
	}
	public String getDCITypeLocal() {
		return "file:info/esblurock/reaction/core/ontology/base/resources/dcterms.ttl";
	}
	public String getProvoLocal() {
		return "file:info/esblurock/reaction/core/ontology/base/resources/prov-o.ttl";
	}
	public String getOrgLocal() {
		return "file:info/esblurock/reaction/core/ontology/base/resources/org.ttl";
	}
	public String getFoafLocal() {
		String path = "file:info/esblurock/reaction/core/ontology/base/resources/foaf.rdf";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}

	@Override
	public String getRDFSLocal() {
		return "info/esblurock/reaction/ontology/rdf-schema.owl";
	}
	public String getOwlLocal() {
		return null;
	}

	public String getRDFLocal() {
		return "info/esblurock/core/ontologybase/resources/22-rdf-syntax-ns.owl";
	}

	public String getDataCiteLocal() {
		return "info/esblurock/core/ontologybase/resources";
	}
	public String getGEOLocal() {
		return "info/esblurock/core/ontologybase/resources/wgs84_pos.rdf";
	}

	
	
	
	@Override
	public String getQUDTUnitLocal() {
		String path = "info/esblurock/core/ontologybase/resources/unit.owl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	public String getPhysicsUnitLocal() {
		String path = "info/esblurock/core/ontologybase/resources/VOCAB_QUDT-UNITS-PHYSICAL-CHEMISTRY-AND-MOLECULAR-PHYSICS-v2.0.ttl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}

	@Override
	public String getQUDTQuantityLocal() {
		String path = "info/esblurock/core/ontologybase/resources/quantity.owl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	
	public String getQUDTOwlLocal() {
		String path = "info/esblurock/core/ontologybase/resources/qudt.owl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
		
	}
	public String getQUDTQudtLocal() {
		String path = "info/esblurock/core/ontologybase/resources/qudt.owl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}

	@Override
	public String getQUDTDimensionLocal() {
		String path = "info/esblurock/core/ontologybase/resources/dimension.owl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	public String getQUDTUnitOwlLocal() {
		String path = "info/esblurock/core/ontologybase/resources/unit.owl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	public String getSOSALocal() {
		String path = "info/esblurock/core/ontologybase/resources/sosa.ttl";
		URL url = getClass().getClassLoader().getResource(path);
		return url.toString();
	}
	
}
