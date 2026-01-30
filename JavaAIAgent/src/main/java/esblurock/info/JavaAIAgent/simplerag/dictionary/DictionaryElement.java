package esblurock.info.JavaAIAgent.simplerag.dictionary;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DictionaryElement {
	@JsonProperty("term")
    private String term;
	@JsonProperty("descriptiion")
    private String description;
	
	public DictionaryElement(String term, String description) {
		this.term = term;
		this.description = description;
	}

	public String getTerm() {
		return term;
	}

	public void setTerm(String term) {
		this.term = term;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
