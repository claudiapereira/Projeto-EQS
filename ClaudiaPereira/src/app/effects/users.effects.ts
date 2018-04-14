import { Injectable } from "@angular/core";
import { Store }  from '@ngrx/store';
import { Effect, Actions } from "@ngrx/effects";

import { User } from "../models/user.model";
import { Roles } from "../models/user.model";
import { AppState } from '../state/state';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//import * as firebase from 'angularfire2';
import * as firebase from 'firebase/app';

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";

import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/delay";

import * as userActions from '../actions/user.actions';
export type Action = userActions.All;

import { DataService } from '../data.service';

@Injectable()
export class UserEffects {
  userData = new User (null, null, null, null);
  constructor(private actions: Actions, private afAuth: AngularFireAuth, private store: Store<AppState>,private db: AngularFireDatabase) {}
  
  @Effect()
  getUser:  Observable<Action> = this.actions.ofType(userActions.GET_USER)
    .map((action: userActions.GetUser) => action.payload )
    .switchMap(payload => this.afAuth.authState)
    .delay(2000)
    .map( (authData) => {
      if (authData ) {
        const user = new User(authData.uid, authData.email, authData.displayName, null);
        return new userActions.Authenticated(user);
      }
      else {
        return new userActions.Authenticated();
      }
    })
    .catch(err => Observable.of(new userActions.AuthError()) );
    
    @Effect()
    login:  Observable<Action> = this.actions.ofType(userActions.GOOGLE_LOGIN)
        .map((action: userActions.GoogleLogin) => action.payload)
        .switchMap(payload => {
          //return Observable.of((new userActions.GoogleLogin));
          return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        })
        .map( credential => {
            // login bem sucedido
            return new userActions.GetUser();
        })
        .catch(err => {
            return Observable.of(new userActions.AuthError({error: err.message}));
        });
    
    @Effect()
    logout:  Observable<Action> = this.actions.ofType(userActions.LOGOUT)
      .map((action: userActions.Logout) => action.payload)
      .switchMap(payload => {
          return Observable.of(this.afAuth.auth.signOut());
      })
      .map( authData => { 
        return new userActions.NotAuthenticated(); 
      })
      .catch(err => Observable.of(new userActions.AuthError({error: err.message})))

    getUserByUid(uid: string) : User {
      this.db.object(`user/${uid}`).snapshotChanges()
        .subscribe(snapshots=>{
          var userUid = "";
          var userEmail = "";
          var roleUserLogin = "";
          var userRoles : Roles;
          userUid = snapshots.payload.val().uid;
          userEmail = snapshots.payload.val().email;
          roleUserLogin = snapshots.payload.val().login;
          userRoles = snapshots.payload.val().roles;
          this.userData = new User (userUid, userEmail, roleUserLogin, userRoles);
        })
        return this.userData; 
      }
}