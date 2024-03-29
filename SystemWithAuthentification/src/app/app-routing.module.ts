import {
	AngularFireAuthGuard,
	redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateComponent } from './components/create/create.component';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ToppageComponent } from './layout/toppage/toppage.component';
import {UploadstepsComponent} from './upload/uploadsteps/uploadsteps.component';
import {RepositorydatafileComponent} from '../app/catalogobjects/repository/repositorydatafile/repositorydatafile.component';
import {ManagerepositorydatapartitionblockcomponentComponent} from '../app/catalogobjects/repository/managerepositorydatapartitionblockcomponent/managerepositorydatapartitionblockcomponent.component';
import {ManagedatasetrepositoryfilestagingComponent} from '../app/catalogobjects/repository/managedatasetrepositoryfilestaging/managedatasetrepositoryfilestaging.component';
import { ManagedatasettransactioneventobjectComponent} from '../app/catalogobjects/transaction/managedatasettransactioneventobject/managedatasettransactioneventobject.component';
import { ActivityrepositoryinitialreadlocalfileComponent } from '../app/catalogobjects/activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';
import { ManagegeneralcatalogobjectvisComponent } from '../app/catalogobjects/managegeneralcatalogobjectvis/managegeneralcatalogobjectvis.component';
import {ManagedatasetcollectionsComponent} from '../app/catalogobjects/datasetcollection/managedatasetcollections/managedatasetcollections.component';
import {ComputethermodynamicsComponent} from '../app/catalogobjects/thermodynamics/calculations/computethermodynamics/computethermodynamics.component';
import {HomepageComponent} from './layout/homepage/homepage.component'
import {SetupuserinformationComponent} from '../app/catalogobjects/user/setupuserinformation/setupuserinformation.component';
import {UseraccountadministrationComponent} from '../app/catalogobjects/user/useraccountadministration/useraccountadministration.component';
import {DatasertcollectionadministrationComponent} from '../app/catalogobjects/datasetcollection/datasertcollectionadministration/datasertcollectionadministration.component';
import {CopysystemdatasetcollectionsComponent} from '../app/catalogobjects/datasetcollection/copysystemdatasetcollections/copysystemdatasetcollections.component';
import {UsercreateGuard} from './usercreate.guard';
import {ExaminedatabaseelementsComponent} from '../app/catalogobjects/examine/examinedatabaseelements/examinedatabaseelements.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'toppage', component: ToppageComponent, canActivate: [AuthGuard]  },
	{ path: 'usersetup', component: SetupuserinformationComponent, canActivate: [UsercreateGuard] },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'register-user', component: SignUpComponent },
	{ path: 'uploaddatabaseitem', component: UploadstepsComponent, canActivate: [AuthGuard] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'verify-email-address', component: VerifyEmailComponent },
	{ path: 'compute', component: ComputethermodynamicsComponent },
	{ path: 'catalog/repositorystaging', component: ManagedatasetrepositoryfilestagingComponent},
	{ path: 'catalog/partition', component: ManagerepositorydatapartitionblockcomponentComponent},
	{ path: 'catalog/catalogobj', component: ManagegeneralcatalogobjectvisComponent},
	{ path: 'catalog/collection', component: ManagedatasetcollectionsComponent},
	{ path: 'useradmin' , component: UseraccountadministrationComponent, canActivate: [AuthGuard] },
	{ path: 'datasetadmin' , component: DatasertcollectionadministrationComponent},
	{ path: 'copycollection' , component: CopysystemdatasetcollectionsComponent},
	{ path: 'examine' , component: ExaminedatabaseelementsComponent},
	{ path: 'catalog/transaction', component: ManagedatasettransactioneventobjectComponent,
	children: [
      
        { path: 'InitialReadInOfRepositoryFile', component:  ActivityrepositoryinitialreadlocalfileComponent, outlet: "activity"}
     
    ],},
	{
		path: 'feed',
		component: RepositorydatafileComponent,
	},
	{
		path: 'create',
		component: CreateComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
	}
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
