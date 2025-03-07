import { Routes } from '@angular/router';
import {HomepageComponent} from './layout/homepage/homepage.component'
import { SignInComponent } from './components/login/sign-in/sign-in.component';

import {ToppageComponent} from './layout/toppage/toppage.component';
import {SetupuserinformationComponent} from './catalogobjects/user/setupuserinformation/setupuserinformation.component';
import {UsercreateGuard} from './usercreate.guard';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
		{ path: '', component: HomepageComponent },
			{ path: 'sign-in', component: SignInComponent }
			
	,{ path: 'usersetup', component: SetupuserinformationComponent, canActivate: [UsercreateGuard] },
	//{ path: 'toppage', component: ToppageComponent, canActivate: [AuthGuard]  },
	{ path: 'toppage', component: ToppageComponent}



];
