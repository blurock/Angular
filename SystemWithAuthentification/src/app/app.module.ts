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
import {MatMenuModule} from '@angular/material/menu';
import { AppFirebaseModule } from './app-firebase/app-firebase.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RepositorydatafileComponent } from './catalogobjects/repository/repositorydatafile/repositorydatafile.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

import {MatTreeModule} from '@angular/material/tree';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTabsModule} from '@angular/material/tabs';



import { CatalogbaseextraComponent } from './catalogobjects/catalogbaseextra/catalogbaseextra.component';
import { CatalogbasedataComponent } from './catalogobjects/catalogbasedata/catalogbasedata.component';
import { DatadatadescriptionComponent } from './catalogobjects/datadatadescription/datadatadescription.component';
import { OnelineprimitiveComponent } from './primitives/onelineprimitive/onelineprimitive.component';
import { TextareaprimitiveComponent } from './primitives/textareaprimitive/textareaprimitive.component';
import { CatalogconceptpurposeComponent } from './catalogobjects/catalogconceptpurpose/catalogconceptpurpose.component';
import { KeywordlistprimitiveComponent } from './primitives/keywordlistprimitive/keywordlistprimitive.component';
import { CatalogidComponent } from './catalogobjects/catalogid/catalogid.component';



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
    CatalogidComponent
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
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [AngularFireModule, AngularFireAuthModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
