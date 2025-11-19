export class Ontologyconstants {
	public static rdfslabel = 'rdfs:label';
	public static rdfscomment = 'rdfs:comment';
	public static dctermsidentifier = '<http://purl.org/dc/elements/1.1/identifier>';
	public static dctype = 'dc:type';
	public static datacitePrimaryResourceIdentifier = 'datacite:PrimaryResourceIdentifier';
	public static dctermsdescription = 'dcterms:description';
	public static dctermstitle = 'dcterms:title';
	public static author = 'author';
	public static dccreator = 'dc:creator';
	public static foafFamilyName = 'foaf:familyName';
	public static foafGivenName = 'foaf:givenName';
	public static foaftitle = 'foaf:title';
	public static datasethttpaddress = 'dataset:HttpAddress';
	public static datasethttpaddresstype = 'dataset:HttpAddressType';
	public static datasethttpaddresssrcloc = 'dataset:HttpAddressSourceLocation';

	public static successful = 'dataset:servicesuccessful';
	public static message = 'dataset:serviceresponsemessage';
	public static catalogobject = 'dataset:simpcatobj';
	public static outputobject = 'dataobj';
	public static annotations = 'annotations';
	public static service = 'service';
	public static annoinfo = "annoinfo";
	
	public static DatabaseIDFromRequiredTransaction = 'dataset:transreqobj';
	
	public static TransactionEventObject = 'dataset:eventobject';
	public static TransactionEventType = 'prov:activity';
	public static ActivityInfo = 'dataset:activityinfo';
	public static UploadFileSource = 'dataset:uploadsrc';
	public static LocalFileSystem = 'dataset:LocalFileSystem';
	public static StringSource = 'dataset:StringSource';
	public static FileSourceIdentifier = 'dataset:fileidentifier';
	
	public static email = 'http://www.w3.org/2006/vcard/ns#:email';
	public static username = 'foaf:account';
	public static UID ='dataset:authorizationuid';
	public static AuthorizationType = 'dataset:AuthorizationType';
	public static UserAccount = 'prov:SoftwareAgent';
	public static DatabasePerson = 'vcard:Individual';
	public static UserAccountRole = 'dataset:UserAccountRole';
	
	public static DatasetObjectSummaryTableDescriptors = 'dataset:summarytabledescriptors';
	public static DatasetObjectSummaryTableSearchTerms = 'dataset:summarytablesearchterms';
	public static SummaryTableDescriptionKey           = 'dataset:summarytabledescriptionkey';
	public static SummaryTableSearchKey                = 'dataset:summarytablesearchkey';
	public static DataObjectSummaryTableDescriptionTerms = 'dataset:summarytabledescriptionterms';
	
	public static textfile = 'dataset:FileTypeText';
	
	public static ThermodynamicsSystemCollectionIDsSet = 'dataset:systemdatasetcollection';
	public static ThermodynamicsDatasetCollectionIDsSet = 'dataset:datasetcollectionids';
	
	public static FirebaseCatalogIDForModifiedObject = 'dataset:firebaseidmodified';
	public static FirestoreCatalogIDForSourceTransaction = 'dataset:idforsourcetransaction'
	public static FirestoreCatalogIDForTransaction = 'dataset:transactionforobject';
	public static ModifiedCatalogObject = 'dataset:modifiedcatalogobject';
	public static CatalogObjectModificationType = 'dataset:catmodtype';
	public static DateCreated = 'dcterms:created';
	public static JsonDifferences = 'dataset:differencejsonstring';
	public static DescriptionTitle = 'dcterms:title';
	public static  ShortTransactionDescription = 'dataset:transactiondescriptionshort';
	public static TransactionDebugMode = 'dataset:transactiondebugmode';
	public static catalogobjectmaintainer = 'dataset:catalogobjectmaintainer';
	
	public static FirestoreCatalogID = 'dataset:firestorecatalog';
	
	public static RepositoryFileStaging = 'dataset:RepositoryFileStaging';
	public static InitialReadInOfRepositoryFile = 'dataset:initreposfile';
	public static InitialReadInOfRepositoryFileTransactionParse = 'dataset:InitialReadInOfRepositoryFile';
	public static InitialReadInOfRepositoryFileTransaction = 'dataset:InitialReadInLocalStorageSystem';
	public static InitialReadInOfRepositoryFileActivity = 'dataset:InitialReadInOfRepositoryFileActivity';
	
	public static RepositoryDataPartitionBlock = 'dataset:RepositoryDataFilePartition';
	public static PartiionSetWithinRepositoryFileTransaction = 'dataset:PartiionSetWithinRepositoryFile';
	public static PartiionSetWithinRepositoryFile = 'dataset:partitionfile';
	public static PartiionSetWithinRepositoryFileActivity = 'dataset:PartiionSetWithinRepositoryActivity';
	
	public static TransactionInterpretTextBlock = 'dataset:interprettextblocktransaction';
	public static TransactionInterpretTextBlockTransaction = 'dataset:TransactionInterpretTextBlock';
	//public static TransactionInterpretTextBlockActivity = 'dataset:PartiionSetWithinRepositoryActivity';
	public static ActivityInformationInterpretBensonRuleData = 'dataset:ActivityInformationInterpretBensonRuleData';
	public static ActivityInformationInterpretSubstructureThermodynamics = 'dataset:ActivityInformationInterpretSubstructureThermodynamics';
	public static ActivityInformationMolecularThermodynamics = 'dataset:ActivityInformationMolecularThermodynamics';
	public static ActivityInformationInterpretDisassociationEnergy = 'dataset:ActivityInformationInterpretDisassociationEnergy';
	public static ActivityInformationInterpretMetaAtom = 'dataset:ActivityInformationInterpretMetaAtom';
	public static ActivityInformationInterpretSymmetryInformation = 'dataset:ActivityInformationInterpretSymmetryInformation';
	public static ActivityInformationInterpretVibrationalMode = 'dataset:ActivityInformationInterpretVibrationalMode';
	
	public static RDFGeneralQueryResultRow = 'dataset:generalqueryresultrow';
	public static CatalogObjectUniqueGenericLabel = 'dataset:uniquegenericname';
	public static TransactionID = 'dataset:transactionid';
	
	public static RDFRelationClassName = 'dataset:relationclassname';
	public static DatabaseObjectType = 'dataset:objectype';
	public static CatalogObjectOwner = 'dcterms:creator';
	public static FirestoreID = 'dataset:firestorecatalog';
	public static RelatedCatalogObjectIDAndType = 'skos:related';
	public static DatabaseObjectTypeLink = 'dataset:objecttypeforlink';
	
	public static RequiredTransactionIDAndType = 'dataset:requiredtransitionfirestoreid';
	public static ShortDescription = 'dataset:shortdescription';
	public static CatalogObjectID = 'dataset:catobjid';
	
	public static CatalogObjectPrerequisiteTreeNode = 'dataset:catobjprerequisitetreenode';
	public static DescriptionTitleRequiredTransaction = 'dataset:descrtitlerequiredtransaction';
	public static RequiredTransactionInformation = 'dataset:requiredtransactioninfo';
	public static RequiredTransactionType = 'dataset:requiredtransactiontype';
	public static RequiredTransactionKey = 'dataset:requiredtransactionkey'
	
	public static ParameterSpecificationTemperature = 'dataset:thermotemperature';
	public static ParameterSpecificationHeatCapacity = 'dataset:paramspecheatcapacity';
	public static JThermodynamics2DSubstructureThermodynamicsDataSet = 'dataset:2dsubstructurethermodataset';
	public static ThermodynamicBensonRuleDefinitionDataSet = 'dataset:bensonruledataset';
	public static RepositoryTherGasThermodynamicsBlock = 'dataset:thergasthermoblock';
	public static JThermodynamicsSymmetryStructureDefinitionDataSet = 'dataset:symmetrystructuredefinitiondataset';
	public static RepositoryParsedToFixedBlockSize = 'dataset:parsetofixsize';
	public static JThermodynamicsMetaAtomDefinitionDataSet = 'dataset:metaatomdefinitiondataset';
	public static JThermodynamicsVibrationalStructureDataSet = 'dataset:vibrationstructuredataset';
	public static StructureVibrationalFrequency = 'dataset:vibrationalfrequency';
	public static JThermodynamicsDisassociationEnergyOfStructureDataSet = 'dataset:disassociationdataset';
	public static JThermodynamicDisassociationEnergy = 'dataset:disassociationenergyparameter';
}
