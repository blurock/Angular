import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from './news/news/news.component';
import { ToppageComponent } from './toppage/toppage/toppage.component';
import {LoginComponent} from './toppage/login/login.component';
import {DashboardComponent} from './toppage/toppage/dashboard/dashboard.component';

const routes: Routes = [
{    
    path: '', 
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    }
  },
{path: 'news', component: NewsComponent},
{ path: '', redirectTo: 'app-login', pathMatch: 'full'},
{path: 'top', component: ToppageComponent},

];

@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
