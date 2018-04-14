import { userReducer }               from '../reducers/user.reducer';
import { NgModule }                  from '@angular/core';

import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }     from 'angularfire2/auth';

import { EffectsModule }             from '@ngrx/effects';
import { StoreModule }               from '@ngrx/store';
import { StoreDevtoolsModule }       from '@ngrx/store-devtools';

import { UserEffects }               from '../effects/users.effects';

import { environment }               from '../../environments/environment';
import { DataService }               from '../data.service';
import { AppComponent }              from '../app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCXfTBZ4dPRW3PCFvppPCua8fglLjMCJzg",
  authDomain: "claudia-rc-pereira.firebaseapp.com",
  databaseURL: "https://claudia-rc-pereira.firebaseio.com",
  projectId: "claudia-rc-pereira",
  storageBucket: "claudia-rc-pereira.appspot.com",
  messagingSenderId: "839999888794"
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    EffectsModule.forRoot([
        UserEffects
    ]),
    // Signature matches AppState interface
    StoreModule.forRoot({
      user: userReducer
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppStateModule { }