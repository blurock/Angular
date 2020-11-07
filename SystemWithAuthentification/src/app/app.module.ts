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

import { CatalogbaseextraComponent } from './catalogobjects/catalogbaseextra/catalogbaseextra.component';
import { CatalogbasedataComponent } from './catalogobjects/catalogbasedata/catalogbasedata.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    FeedComponent,
    ProfileCardComponent,
    HeaderComponent,
    RepositorydatafileComponent,
    CatalogbasedataComponent,
    CatalogbaseextraComponent
  ],
  imports: [
    AppFirebaseModule,
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [AngularFireModule, AngularFireAuthModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
