import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './components/create/create.component';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { HeaderComponent } from './components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AppFirebaseModule } from './app-firebase/app-firebase.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RepositorydatafileComponent } from './catalogobjects/repository/repositorydatafile/repositorydatafile.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatStepperModule} from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

import { CatalogbaseextraComponent } from './catalogobjects/catalogbaseextra/catalogbaseextra.component';
import { CatalogbasedataComponent } from './catalogobjects/catalogbasedata/catalogbasedata.component';
import { DatadatadescriptionComponent } from './catalogobjects/datadatadescription/datadatadescription.component';
import { OnelineprimitiveComponent } from './primitives/onelineprimitive/onelineprimitive.component';
import { TextareaprimitiveComponent } from './primitives/textareaprimitive/textareaprimitive.component';
import { CatalogconceptpurposeComponent } from './catalogobjects/catalogconceptpurpose/catalogconceptpurpose.component';
import { KeywordlistprimitiveComponent } from './primitives/keywordlistprimitive/keywordlistprimitive.component';
import { CatalogidComponent } from './catalogobjects/catalogid/catalogid.component';
import { SimplechoiceprimitiveComponent } from './primitives/simplechoiceprimitive/simplechoiceprimitive.component';
import { MultiplerecordsComponent } from './catalogobjects/multiplerecords/multiplerecords.component';
import { ReferenceinformationComponent } from './catalogobjects/catalogbaseobjects/referenceinformation/referenceinformation.component';
import { NameofpersonComponent } from './catalogobjects/catalogbaseobjects/nameofperson/nameofperson.component';
import { DoiComponent } from './primitives/doi/doi.component';
import { ClassificationtreeComponent } from './primitives/classificationtree/classificationtree.component';
import { ObjectsitereferenceComponent } from './catalogobjects/catalogbaseobjects/objectsitereference/objectsitereference.component';
import { HttpaddressComponent } from './primitives/httpaddress/httpaddress.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { AuthService } from './services/auth.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { USE_DEVICE_LANGUAGE, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule, USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { AngularFireStorageModule, USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { ToppageComponent } from './layout/toppage/toppage.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TopnavComponent } from './layout/topnav/topnav.component';
import { TextcardComponent } from './layout/homepage/textcard/textcard.component';
import { UploadstepsComponent } from './upload/uploadsteps/uploadsteps.component';
import { UploadfiletostorageComponent } from './upload/uploadfiletostorage/uploadfiletostorage.component';
import { UploadfileinformationComponent } from './upload/uploadfileinformation/uploadfileinformation.component';
import { BibliographicinformationComponent } from './upload/bibliographicinformation/bibliographicinformation.component';
import { SetofauthorsComponent } from './upload/setofauthors/setofauthors.component';
import { SubmitfileandinformatioonComponent } from './upload/submitfileandinformatioon/submitfileandinformatioon.component';
import { ParseuploadedfileComponent } from './upload/parseuploadedfile/parseuploadedfile.component';
import { CreatecatalogobjectsfrompartitionsComponent } from './upload/createcatalogobjectsfrompartitions/createcatalogobjectsfrompartitions.component';
import { UnitspecificationComponent } from './upload/unitspecification/unitspecification.component';
import { SimpledatabaseobjectstructureComponent } from './catalogobjects/simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { DatasetrepositoryfilestagingComponent } from './catalogobjects/repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { FiresytorecatalogidComponent } from './catalogobjects/firesytorecatalogid/firesytorecatalogid.component';
import { CollectiondocumentidpairaddressComponent } from './catalogobjects/recordobjects/collectiondocumentidpairaddress/collectiondocumentidpairaddress.component';
import { DatasetreferenceComponent } from './catalogobjects/datasetreference/datasetreference.component';
import { BibsetofauthorsComponent } from './catalogobjects/datasetreference/bibsetofauthors/bibsetofauthors.component';
import { DataobjectlinkComponent } from './catalogobjects/catalogbaseobjects/dataobjectlink/dataobjectlink.component';
import { SetofdataobjectlinksComponent } from './catalogobjects/catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { LoadchildDirective } from './catalogobjects/catalogbaseobjects/loadchild.directive';
import { RdftripleComponent } from './catalogobjects/catalogbaseobjects/rdftriple/rdftriple.component';
import { SetofsitereferencesComponent } from './catalogobjects/catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { GcsblobfileinformationstagingComponent } from './catalogobjects/repository/gcsblobfileinformationstaging/gcsblobfileinformationstaging.component';
import { SavecatalogdataobjectdialogComponent } from './dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import { SavecatalogdataobjectComponent } from './dialog/savecatalogdataobject/savecatalogdataobject.component';
import { MenutreedialogComponent, MenutreedialogWindow } from './primitives/menutreedialog/menutreedialog.component';
import { MenuItemComponent } from './primitives/menu-item/menu-item.component';
import { RepositorydatapartitionblockComponent } from './catalogobjects/repository/repositorydatapartitionblock/repositorydatapartitionblock.component';
import { VisualizefileComponent } from './dialog/visualizefile/visualizefile.component';
import { RuntransactiondialogComponent } from './dialog/runtransactiondialog/runtransactiondialog.component';
import { FetchcatalogobjectComponent } from './dialog/fetchcatalogobject/fetchcatalogobject.component';
import { ManagedatasetrepositoryfilestagingComponent } from './catalogobjects/repository/managedatasetrepositoryfilestaging/managedatasetrepositoryfilestaging.component';
import { ManagerepositorydatapartitionblockcomponentComponent } from './catalogobjects/repository/managerepositorydatapartitionblockcomponent/managerepositorydatapartitionblockcomponent.component';
import { RepositorythergasthermodynamicsblockComponent } from './catalogobjects/repository/partition/repositorythergasthermodynamicsblock/repositorythergasthermodynamicsblock.component';
import { RepositoryparsedtofixedblocksizeComponent } from './catalogobjects/repository/partition/repositoryparsedtofixedblocksize/repositoryparsedtofixedblocksize.component';
import { RepositorythermopartitionblockComponent } from './catalogobjects/repository/partition/repositorythermopartitionblock/repositorythermopartitionblock.component';
import { ViewcatalogandsavetolocalfileComponent } from './dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { LoadChildDirective } from './directives/load-child.directive';
import { ParsefiletransactionComponent } from './upload/parsefiletransaction/parsefiletransaction.component';
import { DatasettransactioneventobjectComponent } from './catalogobjects/transaction/datasettransactioneventobject/datasettransactioneventobject.component';
import { DatasettransactionspecificationforcollectionComponent } from './catalogobjects/datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { ManagedatasettransactioneventobjectComponent } from './catalogobjects/transaction/managedatasettransactioneventobject/managedatasettransactioneventobject.component';
import { FindspecifictransactionindatasetComponent } from './dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';
import { ActivityrepositoryinitialreadlocalfileComponent } from './catalogobjects/activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';
import {DatasetrepositoryfileComponent} from './catalogobjects/activity/repository/datasetrepositoryfile/datasetrepositoryfile.component';
import { ActivityinformationComponent } from './catalogobjects/transaction/activityinformation/activityinformation.component';
import { ListoffirestoreidsComponent } from './catalogobjects/listoffirestoreids/listoffirestoreids.component';
import { ActivityrepositorypartitiontocatalogComponent } from './catalogobjects/activity/repository/activityrepositorypartitiontocatalog/activityrepositorypartitiontocatalog.component';
import { FirestorelistelementComponent } from './catalogobjects/listoffirestoreids/firestorelistelement/firestorelistelement.component';
import { GeneralcatalogobjectvisualizationComponent } from './catalogobjects/generalcatalogobjectvisualization/generalcatalogobjectvisualization.component';
import { ActivityinformationinterpretdisassociationenergyComponent } from './catalogobjects/activity/repository/activityinformationinterpretdisassociationenergy/activityinformationinterpretdisassociationenergy.component';
import { ParameterspecificationComponent } from './catalogobjects/parameterspecification/parameterspecification.component';
import { ActivityinformationinterpretthermodynamicblockComponent } from './catalogobjects/activity/repository/activityinformationinterpretthermodynamicblock/activityinformationinterpretthermodynamicblock.component';
import { ActivityinformationinterpretvibrationalmodeComponent } from './catalogobjects/activity/repository/activityinformationinterpretvibrationalmode/activityinformationinterpretvibrationalmode.component';
import { ActivityinformationinterpretsymmetryinformationComponent } from './catalogobjects/activity/repository/activityinformationinterpretsymmetryinformation/activityinformationinterpretsymmetryinformation.component';
import { ActivityinformationinterpretmetaatomComponent } from './catalogobjects/activity/repository/activityinformationinterpretmetaatom/activityinformationinterpretmetaatom.component';
import { ActivityinformationdatasetcollectionsetadddatasetComponent } from './catalogobjects/activity/collectionset/activityinformationdatasetcollectionsetadddataset/activityinformationdatasetcollectionsetadddataset.component';
import { ActivityinformationdatasetcollectionsetcreationComponent } from './catalogobjects/activity/collectionset/activityinformationdatasetcollectionsetcreation/activityinformationdatasetcollectionsetcreation.component';
import { DatasetcollectionsetrecordidinfoComponent } from './catalogobjects/activity/collectionset/datasetcollectionsetrecordidinfo/datasetcollectionsetrecordidinfo.component';
import { ChemconnectthermodynamicsdatabaseComponent } from './catalogobjects/thermodynamics/chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { JthermodynamicdisassociationenergyComponent } from './catalogobjects/thermodynamics/jthermodynamicdisassociationenergy/jthermodynamicdisassociationenergy.component';
import { ManagegeneralcatalogobjectvisComponent } from './catalogobjects/managegeneralcatalogobjectvis/managegeneralcatalogobjectvis.component';
import { ParametervalueComponent } from './catalogobjects/parametervalue/parametervalue.component';
import { Jthermodynamics2dspeciesstructureComponent } from './catalogobjects/thermodynamics/jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';
import { JthermodynamicsatomcountsetComponent } from './catalogobjects/thermodynamics/jthermodynamicsatomcountset/jthermodynamicsatomcountset.component';
import { JthermodynamicsvibrationalstructureComponent } from './catalogobjects/thermodynamics/jthermodynamicsvibrationalstructure/jthermodynamicsvibrationalstructure.component';
import { JthermodynamicstandardthermodynamicsComponent } from './catalogobjects/thermodynamics/jthermodynamicstandardthermodynamics/jthermodynamicstandardthermodynamics.component';
import { Jthermodynamics2dmoleculethermodynamicsComponent } from './catalogobjects/thermodynamics/jthermodynamics2dmoleculethermodynamics/jthermodynamics2dmoleculethermodynamics.component';
import { Jthermodynamics2dsubstructurethermodynamicsComponent } from './catalogobjects/thermodynamics/jthermodynamics2dsubstructurethermodynamics/jthermodynamics2dsubstructurethermodynamics.component';
import { JthermodynamicsbensonrulestructureComponent } from './catalogobjects/thermodynamics/jthermodynamicsbensonrulestructure/jthermodynamicsbensonrulestructure.component';
import { ThermodynamicbensonruledefinitionComponent } from './catalogobjects/thermodynamics/thermodynamicbensonruledefinition/thermodynamicbensonruledefinition.component';
import { JthermodynamicsmetaatomdefinitionComponent } from './catalogobjects/thermodynamics/jthermodynamicsmetaatomdefinition/jthermodynamicsmetaatomdefinition.component';
import { JthermodynamicssymmetrystructuredefinitionComponent } from './catalogobjects/thermodynamics/jthermodynamicssymmetrystructuredefinition/jthermodynamicssymmetrystructuredefinition.component';
import { ChemconnectdatasetcollectionidssetComponent } from './catalogobjects/datasetcollection/chemconnectdatasetcollectionidsset/chemconnectdatasetcollectionidsset.component';
import { DatasetspecificationforcollectionsetComponent } from './catalogobjects/datasetcollection/datasetspecificationforcollectionset/datasetspecificationforcollectionset.component';
import { ThermodynamicsdatasetcollectionidssetComponent } from './catalogobjects/datasetcollection/thermodynamicsdatasetcollectionidsset/thermodynamicsdatasetcollectionidsset.component';
import { ManagedatasetcollectionsComponent } from './catalogobjects/datasetcollection/managedatasetcollections/managedatasetcollections.component';
import { CreatenewdatasetcollectionComponent } from './catalogobjects/datasetcollection/createnewdatasetcollection/createnewdatasetcollection.component';
import { VisualizedatasetcollectionidsComponent } from './catalogobjects/datasetcollection/visualizedatasetcollectionids/visualizedatasetcollectionids.component';
import { FetchcollectiondatasetidsComponent } from './dialog/fetchcollectiondatasetids/fetchcollectiondatasetids.component';
import { ModifydatasetcollectionidsComponent } from './catalogobjects/datasetcollection/modifydatasetcollectionids/modifydatasetcollectionids.component';
import { InitialreadinofrepositoryfileeventComponent } from './upload/initialreadinofrepositoryfileevent/initialreadinofrepositoryfileevent.component';
import { TransactioninterprettextblockComponent } from './upload/transactioninterprettextblock/transactioninterprettextblock.component';
import { InterprettextblockresultsComponent } from './upload/interprettextblockresults/interprettextblockresults.component';
import { ThermodynamiccontributionsComponent } from './catalogobjects/thermodynamics/calculations/thermodynamiccontributions/thermodynamiccontributions.component';
import { ComputethermodynamicsComponent } from './catalogobjects/thermodynamics/calculations/computethermodynamics/computethermodynamics.component';
import { ThermocalculationsetupComponent } from './catalogobjects/thermodynamics/calculations/thermocalculationsetup/thermocalculationsetup.component';
import { RundatabaseserviceComponent } from './dialog/rundatabaseservice/rundatabaseservice.component';
import { FinddatasetcollectionidsetsComponent } from './primitives/finddatasetcollectionidsets/finddatasetcollectionidsets.component';
import { UseraccountComponent } from './catalogobjects/user/useraccount/useraccount.component';
import { SetupuserinformationComponent } from './catalogobjects/user/setupuserinformation/setupuserinformation.component';
import { UseraccountadministrationComponent } from './catalogobjects/user/useraccountadministration/useraccountadministration.component';
import { DatabasepersonComponent } from './catalogobjects/user/databaseperson/databaseperson.component';
import { DatasertcollectionadministrationComponent } from './catalogobjects/datasetcollection/datasertcollectionadministration/datasertcollectionadministration.component';
import { ApplicationcardsComponent } from './layout/applicationcards/applicationcards.component';
import { FindintermediatettransactionComponent } from './dialog/findintermediatettransaction/findintermediatettransaction.component';
import { DatasetcollectionchoicemenuComponent } from './primitives/datasetcollectionchoicemenu/datasetcollectionchoicemenu.component';
import { CopysystemdatasetcollectionsComponent } from './catalogobjects/datasetcollection/copysystemdatasetcollections/copysystemdatasetcollections.component';
import { ExaminedatabaseelementsComponent } from './catalogobjects/examine/examinedatabaseelements/examinedatabaseelements.component';
import { ReactComponentDirective } from './directives/react-component.directive';
import { TodosPageComponent } from './components/react/todos-page/todos-page.component';
import { SpecificationfordatasetComponent } from './catalogobjects/specificationfordataset/specificationfordataset.component';



@NgModule({
	declarations: [
		AppComponent,
		CreateComponent,
		FeedComponent,
		ProfileCardComponent,
		HeaderComponent,
		RepositorydatafileComponent,
		CatalogbasedataComponent,
		CatalogbaseextraComponent,
		DatadatadescriptionComponent,
		OnelineprimitiveComponent,
		TextareaprimitiveComponent,
		CatalogconceptpurposeComponent,
		KeywordlistprimitiveComponent,
		CatalogidComponent,
		SimplechoiceprimitiveComponent,
		MultiplerecordsComponent,
		ReferenceinformationComponent,
		NameofpersonComponent,
		DoiComponent,
		ClassificationtreeComponent,
		ObjectsitereferenceComponent,
		HttpaddressComponent,
		SignInComponent,
		ForgotPasswordComponent,
		SignUpComponent,
		VerifyEmailComponent,
		DashboardComponent,
		HomepageComponent,
		ToppageComponent,
		TopnavComponent,
		TextcardComponent,
		UploadstepsComponent,
  UploadfiletostorageComponent,
  UploadfileinformationComponent,
  BibliographicinformationComponent,
  SetofauthorsComponent,
  SubmitfileandinformatioonComponent,
  ParseuploadedfileComponent,
  CreatecatalogobjectsfrompartitionsComponent,
  UnitspecificationComponent,
  SimpledatabaseobjectstructureComponent,
  DatasetrepositoryfilestagingComponent,
  FiresytorecatalogidComponent,
  CollectiondocumentidpairaddressComponent,
  DatasetreferenceComponent,
  BibsetofauthorsComponent,
  DataobjectlinkComponent,
  SetofdataobjectlinksComponent,
  LoadchildDirective,
  RdftripleComponent,
  SetofsitereferencesComponent,
  GcsblobfileinformationstagingComponent,
  SavecatalogdataobjectdialogComponent,
  SavecatalogdataobjectComponent,
  MenutreedialogComponent,
  MenuItemComponent,
  MenutreedialogWindow,
  RepositorydatapartitionblockComponent,
  VisualizefileComponent,
  RuntransactiondialogComponent,
  FetchcatalogobjectComponent,
  ManagedatasetrepositoryfilestagingComponent,
  ManagerepositorydatapartitionblockcomponentComponent,
  RepositorythergasthermodynamicsblockComponent,
  RepositoryparsedtofixedblocksizeComponent,
  RepositorythermopartitionblockComponent,
  ViewcatalogandsavetolocalfileComponent,
  LoadChildDirective,
  ParsefiletransactionComponent,
  DatasettransactioneventobjectComponent,
  DatasettransactionspecificationforcollectionComponent,
  ManagedatasettransactioneventobjectComponent,
  FindspecifictransactionindatasetComponent,
  ActivityrepositoryinitialreadlocalfileComponent,
  DatasetrepositoryfileComponent,
  ActivityinformationComponent,
  ListoffirestoreidsComponent,
  ActivityrepositorypartitiontocatalogComponent,
  FirestorelistelementComponent,
  GeneralcatalogobjectvisualizationComponent,
  ActivityinformationinterpretdisassociationenergyComponent,
  ParameterspecificationComponent,
  ActivityinformationinterpretthermodynamicblockComponent,
  ActivityinformationinterpretvibrationalmodeComponent,
  ActivityinformationinterpretsymmetryinformationComponent,
  ActivityinformationinterpretmetaatomComponent,
  ActivityinformationdatasetcollectionsetadddatasetComponent,
  ActivityinformationdatasetcollectionsetcreationComponent,
  DatasetcollectionsetrecordidinfoComponent,
  ChemconnectthermodynamicsdatabaseComponent,
  JthermodynamicdisassociationenergyComponent,
  ManagegeneralcatalogobjectvisComponent,
  ParametervalueComponent,
  Jthermodynamics2dspeciesstructureComponent,
  JthermodynamicsatomcountsetComponent,
  JthermodynamicsvibrationalstructureComponent,
  JthermodynamicstandardthermodynamicsComponent,
  Jthermodynamics2dmoleculethermodynamicsComponent,
  Jthermodynamics2dsubstructurethermodynamicsComponent,
  JthermodynamicsbensonrulestructureComponent,
  ThermodynamicbensonruledefinitionComponent,
  JthermodynamicsmetaatomdefinitionComponent,
  JthermodynamicssymmetrystructuredefinitionComponent,
  ChemconnectdatasetcollectionidssetComponent,
  DatasetspecificationforcollectionsetComponent,
  ThermodynamicsdatasetcollectionidssetComponent,
  ManagedatasetcollectionsComponent,
  CreatenewdatasetcollectionComponent,
  VisualizedatasetcollectionidsComponent,
  FetchcollectiondatasetidsComponent,
  ModifydatasetcollectionidsComponent,
  InitialreadinofrepositoryfileeventComponent,
  TransactioninterprettextblockComponent,
  InterprettextblockresultsComponent,
  ThermodynamiccontributionsComponent,
  ComputethermodynamicsComponent,
  ThermocalculationsetupComponent,
  RundatabaseserviceComponent,
  FinddatasetcollectionidsetsComponent,
  UseraccountComponent,
  SetupuserinformationComponent,
  UseraccountadministrationComponent,
  DatabasepersonComponent,
  DatasertcollectionadministrationComponent,
  ApplicationcardsComponent,
  FindintermediatettransactionComponent,
  DatasetcollectionchoicemenuComponent,
  CopysystemdatasetcollectionsComponent,
  ExaminedatabaseelementsComponent,
  ReactComponentDirective,
  TodosPageComponent,
  SpecificationfordatasetComponent
	],
	imports: [
		AppFirebaseModule,
		AppMaterialModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatDividerModule,
		MatIconModule,
		MatToolbarModule,
		MatMenuModule,
		MatButtonModule,
		MatButtonModule,
		MatMenuModule,
		MatTooltipModule,
		MatSnackBarModule,
		HttpClientModule,
		MatCardModule,
		RouterModule,
		MatGridListModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatChipsModule,
		ReactiveFormsModule,
		FormsModule,
		MatExpansionModule,
		MatCheckboxModule,
		CdkScrollableModule,
		MatTreeModule,
		MatDialogModule,
		MatTabsModule,
		MatSelectModule,
		MatNativeDateModule,
		ReactiveFormsModule,
		CommonModule,
		ScrollingModule,
		MatSidenavModule,
		MatListModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireStorageModule,
		AngularFireDatabaseModule,
		
		LayoutModule,
		MatStepperModule,
  MatProgressBarModule,
  MatTableModule,
  MatProgressSpinnerModule
	],
	exports: [AngularFireModule, AngularFireAuthModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatNativeDateModule,
		MatSelectModule,
		MatSnackBarModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
	],
	providers: [
		{ provide: FIRESTORE_SETTINGS, useValue: { ignoreUndefinedProperties: true } },
		{ provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
		{ provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8083] : undefined },
		{ provide: USE_STORAGE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9199] : undefined },
		{ provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9000] : undefined },
		{ provide: USE_DEVICE_LANGUAGE, useValue: true },
        AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
