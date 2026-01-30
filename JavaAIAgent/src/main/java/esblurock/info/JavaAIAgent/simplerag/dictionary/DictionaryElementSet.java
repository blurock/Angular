package esblurock.info.JavaAIAgent.simplerag.dictionary;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DictionaryElementSet {
	@JsonProperty("dictionaryName")
    private String dictionaryName;
	@JsonProperty("dictionaryDescriptiion")
    private String description;
	@JsonProperty("dictionaryDescriptiion")
	private List<DictionaryElement> elements;
	
	public DictionaryElementSet(String dictionaryName, String description, List<DictionaryElement> elements) {
		this.dictionaryName = dictionaryName;
		this.description = description;
		this.elements = elements;
	}
	
	public DictionaryElementSet(String dictionaryName, String description) {
		this.dictionaryName = dictionaryName;
		this.description = description;
		this.elements = new ArrayList<DictionaryElement>();
	}

	public String getDictionaryName() {
		return dictionaryName;
	}

	public void setDictionaryName(String dictionaryName) {
		this.dictionaryName = dictionaryName;
	}
		
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<DictionaryElement> getElements() {
		return elements;
	}

	public void setElements(List<DictionaryElement> elements) {
		this.elements = elements;
	}

	public void addElement(DictionaryElement element) {
		this.elements.add(element);
	}

	public String toRAGString() {
		String dictionaryString = this.elements.stream()
				.map(obj -> String.format("- ID: %s, Description: %s", obj.getTerm(), obj.getDescription()))
				.collect(Collectors.joining("\n"));
		System.out.println("Dictionary String:\n" + dictionaryString);
		return dictionaryString;
	}
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("Dictionary Name: ").append(dictionaryName).append("\n");
		sb.append("Description: ").append(description).append("\n");
		sb.append("Elements:\n");
		for (DictionaryElement element : elements) {
			sb.append(" - ID: ").append(element.getTerm()).append(", Description: ").append(element.getDescription())
					.append("\n");
		}
		return sb.toString();
	}
}
