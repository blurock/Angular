import { Routes } from '@angular/router';
import {HomepageComponent} from './layout/homepage/homepage.component'
import { SignInComponent } from './components/login/sign-in/sign-in.component';

import {ToppageComponent} from './layout/toppage/toppage.component';
import {SetupuserinformationComponent} from './catalogobjects/user/setupuserinformation/setupuserinformation.component';
import {UsercreateGuard} from './usercreate.guard';
import {UploadstepsComponent} from './upload/uploadsteps/uploadsteps.component';
import {MoleculeCreatorComponent} from './jsme/moleculecreatorcomponent/moleculecreatorcomponent.component'
import { ManagegeneralcatalogobjectvisComponent } from './catalogobjects/managegeneralcatalogobjectvis/managegeneralcatalogobjectvis.component';
import { CreatenewdatasetcollectionComponent } from './catalogobjects/datasetcollection/createnewdatasetcollection/createnewdatasetcollection.component';
import { ManagedatasetcollectionsComponent } from './catalogobjects/datasetcollection/managedatasetcollections/managedatasetcollections.component';

//import { AuthGuard } from './auth.guard';

export const routes: Routes = [
		{ path: '', component: HomepageComponent },
			{ path: 'sign-in', component: SignInComponent }
			
	,{ path: 'usersetup', component: SetupuserinformationComponent, canActivate: [UsercreateGuard] },
	//{ path: 'toppage', component: ToppageComponent, canActivate: [AuthGuard]  },
	{ path: 'uploaddatabaseitem', component: UploadstepsComponent
	//, canActivate: [AuthGuard] 
	},
	{ path: 'toppage', component: ToppageComponent},
	{ path: 'examine', component: ManagegeneralcatalogobjectvisComponent},
	{path: 'drawmolecule', component: MoleculeCreatorComponent},
    { path: 'catalog/collection', component: ManagedatasetcollectionsComponent},
	{path: 'datasetadmin', component: ManagedatasetcollectionsComponent}
	


];
