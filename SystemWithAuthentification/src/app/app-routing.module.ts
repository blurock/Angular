import {
	AngularFireAuthGuard,
	redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FEED } from './const/routes.const';
import { CreateComponent } from './components/create/create.component';
import { FeedComponent } from './components/feed/feed.component';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ToppageComponent } from './layout/toppage/toppage.component';
import {UploadstepsComponent} from './upload/uploadsteps/uploadsteps.component';
import {RepositorydatafileComponent} from '../app/catalogobjects/repository/repositorydatafile/repositorydatafile.component';
import {DatasetrepositoryfilestagingComponent} from '../app/catalogobjects/repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import {RepositorydatapartitionblockComponent} from '../app/catalogobjects/repository/repositorydatapartitionblock/repositorydatapartitionblock.component';
import {ManagedatasetrepositoryfilestagingComponent} from '../app/catalogobjects/repository/managedatasetrepositoryfilestaging/managedatasetrepositoryfilestaging.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([FEED]);

const routes: Routes = [
	{ path: '', component: ToppageComponent },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'register-user', component: SignUpComponent },
	{ path: 'uploaddatabaseitem', component: UploadstepsComponent, canActivate: [AuthGuard] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'verify-email-address', component: VerifyEmailComponent },
	{ path: 'catalog/repositorystaging', component: ManagedatasetrepositoryfilestagingComponent},
	{ path: 'catalog/partition', component: RepositorydatapartitionblockComponent},
	{
		path: 'feed',
		component: RepositorydatafileComponent,
	},
	{
		path: 'create',
		component: CreateComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
