import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class IdentifiersService {

	public DatabaseObjectType = 'dataset:objectype';
	public CatalogObjectAccessRead = 'dataset:readaccess';
	public CatalogObjectOwner = 'dcterms:creator';
	public CatalogObjectKey = 'dataset:catalogkey';
	public CatalogObjectAccessModify = 'dataset:accessmodify';
	public TransactionID = 'transaction';
	
	public FirestoreCatalogID = 'dataset:firestorecatalog';
	public DataCatalog = 'skos:inScheme';
	public SimpleCatalogName = 'qb:DataSet';
	public CollectionDocumentIDPairAddress = 'dataset:addressidpairs';
	public CollectionDocumentIDPair = 'dataset:collectiondocpair';
	public DatasetCollectionID = 'dataset:collectionid';
	public DatasetDocumentID = 'dataset:documentid';
	public DatasetIDLevel = 'dataset:idlevel';
	
	public DataSetReference = 'dcterms:BibliographicResource';
	public DOI = 'datacite:PrimaryResourceIdentifier';
	public ReferenceString = 'dataset:referencestring';
	public ReferenceTitle = 'dataset:referencetitle';
	
	public AuthorNameTitle = 'dataset:authortitle';
	public AuthorGivenName = 'dataset:authorgivenname';
	public AuthorFamilyName = 'dataset:authorfamilyname';
	public AuthorInformation = 'dc:creator';
	
	public DataObjectLink = 'skos:mappingRelation';
	public DataTypeConcept = 'qb:concept';
	
	public ObjectSiteReference = 'foaf:page';
	public HTTPAddress = 'dataset:HttpAddress';
	public HttpAddressInformationType = 'dataset:httpinformationtype';
	
	public GCSBlobFileInformationStaging = 'dataset:gcsstagingblob';
	public DescriptionAbstract = 'dcterms:description';
	public FileSourceFormat = 'dataset:filesourceformat';
	public GCSFileName = 'dataset:GCSFileName';
	public GCSFilePath = 'dataset:GCSFilePath';
	
	public RepositoryFileStaging = 'dataset:RepositoryFileStaging';
	public DescriptionTitle = 'dcterms:title';
	
	public DatasetTransactionSpecificationForCollection = 'dataset:datasettransactionspecification';
	public CatalogObjectUniqueGenericLabel = 'dataset:dataset:uniquegenericname';
	public DatasetName = 'dataset:datasetname';
	public DatasetVersion = 'dataset:datasetversion';
	public CatalogDataObjectMaintainer = 'dataset:catalogobjectmaintainer';
	public CatalogDataObjectStatus = 'dataset:dataobjstatus';
	
	public ActivityRepositoryInitialReadInfo = 'dataset:repinitialreadinfo';
	public ActivityRepositoryInitialReadLocalFile = 'dataset:initialrepositorylocal';
	public ActivityRepositoryInitialReadStringContent = 'dataset:initialrepositorystring';
	public ActivityRepositoryInitialReadURL = 'dataset:initialrepositoryurl';
	
	public UploadFileSource = 'dataset:uploadsrc';
	public FileSourceMediaType = 'dataset:filemediatype';
	public FileSourceMediaSubType = 'dataset:filesourcesubtype';
	public FileSourceIdentifier = 'dataset:fileidentifier';
	
	public ActivityRepositoryPartitionToCatalog = 'dataset:partitionfilefromrepository';
	public BlockLineCount = 'dataset:blocklinecount';
	public FilePartitionMethod = 'dataset:filepartitionmethod';
	
	
	constructor() { }
}
