import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from './news/news/news.component';
import { ToppageComponent } from './toppage/toppage/toppage.component';

const routes: Routes = [

{path: 'news', component: NewsComponent},
{ path: '', redirectTo: 'top', pathMatch: 'full'},
{path: 'top', component: ToppageComponent}

];

@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
