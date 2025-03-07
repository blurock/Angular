interface ParameterDefinition {
  "qudt:QuantityKind": string; // Or a more specific type if you have one
  "dataset:dynamicType": string;
  "skos:prefLabel": string;
  "qudt:Unit": string[];
};

type ParameterDefinitions = Record<string, ParameterDefinition>;
