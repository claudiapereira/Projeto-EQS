import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule} from 'angularfire2/firestore';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
//import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { environment } from '../environments/environment';
import { firebaseConfig, appRoutes } from './app.config';

import { AppComponent } from './app.component';

import { DataService } from './data.service';

import { UserEffects }  from './effects/users.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from "@ngrx/store";
import { userReducer } from './reducers/user.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    EffectsModule.forRoot([
      UserEffects
    ]),
    StoreModule.forRoot({
      user: userReducer
    })
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }