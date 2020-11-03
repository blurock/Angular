import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { DescriptiondataComponent } from './records/descriptiondata/descriptiondata.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import { InputlineComponent } from './utilities/inputline/inputline.component';
import {MatInputModule} from '@angular/material/input';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { GenericdatapickerComponent } from './utilities/genericdatapicker/genericdatapicker.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ConceptpurposepairComponent } from './utilities/conceptpurposepair/conceptpurposepair.component';

import {DpDatePickerModule} from 'ng2-date-picker';
import {MatTreeModule} from '@angular/material/tree';
import { TreeModule } from '@circlon/angular-tree-component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTabsModule} from '@angular/material/tabs';
import { NewsComponent } from './news/news/news.component';
import { AppRoutingModule } from './app-routing.module';
import { ToppageComponent } from './toppage/toppage/toppage.component';
import { HttpClientModule } from '@angular/common/http';
import { KeywordlistComponent } from './utilities/keywordlist/keywordlist.component';
import { ClassificationchooserComponent } from './utilities/classificationchooser/classificationchooser.component';
import { TreeitemselectionComponent } from './utilities/treeitemselection/treeitemselection.component';

import { DashboardComponent } from './toppage/toppage/dashboard/dashboard.component';
import {LoginComponent} from './toppage/login/login.component';
import {AuthServiceConfig} from 'angular-6-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';


export function socialConfigs() {
  const config = new AuthServiceConfig (
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('app -id')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('app-id')
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    DescriptiondataComponent,
    InputlineComponent,
    GenericdatapickerComponent,
    KeywordlistComponent,
    ConceptpurposepairComponent,
    ClassificationchooserComponent,
    TreeitemselectionComponent,
    NewsComponent,
    ToppageComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatGridListModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatInputModule,
    CdkScrollableModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    RouterModule,
    DpDatePickerModule,
    MatTreeModule,
    TreeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTabsModule,
    AppRoutingModule
  ],
  entryComponents: [
    TreeitemselectionComponent,
    GenericdatapickerComponent
  ],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

