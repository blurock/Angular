import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UserinterfaceconstantsService {

	fetchInformationfailed = 'Fetch information failed';
	fetchInformationCanceled = 'Fetch information canceled';
	getannotationsfnotsuccessful = 'Annotations not found';
	notimplemented = 'Not implemented';
	cancelled = 'Canceled';
	cancellednofileread = 'Canceled: no file read';
	noprerequisite = 'No Prerequisite set';
	needrepositoryfile = 'Need to set up repository file';

	failedtransaction = 'Transaction Failed';
	failedsubmission = 'Could not start Transaction';

	filenamehint = 'Can be changed from upload name';
	filesourceidentifierlabel = 'File Source Identifier'
	waiting = 'Waiting for Info call';
	fileuploaded = 'File successfully uploaded'
	norerequisitesetup = 'Prerequisite not set up';
	uploadactivitytitle = 'Setup Upload File Transaction'
	uploadtransactiontitle = 'Upload Transaction Result';
	parsetransactiontitle = 'Parse File Transaction Result';
	parsefiletitle = 'Parse File';
	parseactivitytitle = 'Setup Parse Transaction';

	displaybutton = 'Display';
	displaydescbutton = 'Display JSON of current object';
	loadfromfile = 'Load Catalog object from file';
	fetchobjectbutton = 'Fetch File';
	fetchactivtytitle = 'Fetch Input Information';
	cataloginfotitle = 'Catalog Object Information';
	catalogaddresstitle = 'Catalog Address';
	transactionpositiontitle = 'Transaction Address';
	firestoreIDtitle = 'Firestore ID Address';

	datasetspectitle = 'Specification for Data Set';
	getfileformatnotsuccessful = 'Error in retrieving File Format information';

	showaddressbutton = 'Show Firestore Address';
	refresh = 'Refresh Information';
	fetchinfo = 'Fetch Information';
	displayinfo = 'Display Information';
	changeinfo = 'Change Information';
	saveinfo = 'Save Information';
	deltransaction = 'Delete Transaction';
	deltransactiontooltip = 'Delete transaction from database';
	fetchtransaction = 'Fetch Transaction';
	fetchtransactiontooltip = 'Fetch Transaction from database';

	outputtransactions = 'Set of Output Catalog Objects (Address)';
	inputtransactions = 'Set of Required Transactions (Address)'
	outputcatalogobjects = 'Set of Output Catalog Objects'

	errorcatalogtypes = 'Error in determining catalog types';

	prereqdescbutton: string = 'Fetch information from prerequisite';
	prereqbutton: string = 'Prerequiste';
	displayactivitydescbutton: string = 'Display input information in JSON format';
	displayactivitybutton: string = 'Display Input Info';
	fetchactivitydescription: string = 'Fetch transaction input information';
	fetchactivtybutton: string = 'Fetch Input Info';
	submittransactiondescr: string = 'Submit transaction with the transaction input information';
	submittransactionbutton: string = 'Submit Transaction';

	uploadfiletitle = 'Upload File Information';
	uploadfileinfo = 'Upload Activity Information';

	initializing = 'Initializing...';

	firestoreinfotitle: string = 'Required Transactions: Firestore Information';
	retrievalunsuccessful: string = 'Catalog object retrieval unsuccessful';
	firestoreinfoobject: string = 'Required Info Element: ';
	requiredtransactionobjects: string = 'Required Transactions';
	displayobjectinoutputtab = 'Display object in Output Tab';
	deletelink = 'Delete Link';
	showaddress = 'Show Firestore Address';

	constructor() { }
}
