import { Injectable } from '@angular/core';
import { Component, OnInit, NgModule, ViewChild, VERSION} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './models/user.model';
import { Roles } from './models/user.model';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { switchMap } from 'rxjs/operators';
//import * as angular from "angularfire";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import * as _ from 'lodash';
import { DataSnapshot } from '@firebase/database-types';
import { Query } from 'angularfire2/database-deprecated/interfaces';

@Injectable()
export class DataService {
  usersList: any;
  roleUserId: string;
  public listRoles: Roles[];
  public users = [];
  public roles = [];
  public userRoles = [];
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
  preserveSnapshot: true;
  constructor(private _db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    const roleUserId = "";
    const roleval = "";
    this.authState = this.afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.currentUser = user;
        this.roleUserId = user.uid;
      }
      else {
        this.currentUser = null;
      }
    })
  }
  getUsersScroll (group, lastKey?) {
    return this._db.list('user/', ref => {
      let q = ref.limitToLast(25).orderByKey();
      if (lastKey) q['startAt'] = lastKey
      return q;
    }).valueChanges();
  }
  getUserRole (userUid) {
    this._db.list(`user/${userUid}/roles/`).snapshotChanges()
        .subscribe(snapshots=>{
          var roleUserUid = "";
          var roleUserName = "";
          snapshots.forEach(snapshot => {
            if ((snapshot.payload.val().id != undefined) && (snapshot.payload.val().id != '')) {
              roleUserUid =snapshot.payload.val().id;
            }
            if (snapshot.payload.val().name != undefined) {
              roleUserName = snapshot.payload.val().name;
              //console.log("id " + roleUserUid);
              //console.log("name " + roleUserName);
              let userData = new Roles (roleUserUid, roleUserName);
              this.userRoles.push(userData);
            }
          });
        })
  }
  getUsers() {
    this._db.list('/user/').snapshotChanges()
    .subscribe(snapshots=>{
      var userUid = "";
      var userEmail = "";
      var roleUserLogin = "";
      var userRoles : Roles;
      snapshots.forEach(snapshot => {
      userUid =snapshot.payload.val().uid;
      roleUserLogin =snapshot.payload.val().login;
      userEmail =snapshot.payload.val().email;
      userRoles =snapshot.payload.val().roles;
      let userData = new User (userUid, userEmail, roleUserLogin, userRoles);
      this.users.push(userData);
      })
    });
  }
  getRoles() {
    this._db.list('roles/').snapshotChanges()
    .subscribe(snapshots=>{
      var rolesId = "";
      var rolesName = "";
      snapshots.forEach(snapshot => {
      //console.log("key " + snapshot.key);
      //console.log("val " + snapshot.payload.val().uid);
      if ((snapshot.payload.val().id != undefined) && (snapshot.payload.val().id != '')) {
        rolesId   = snapshot.payload.val().id;
      }
      if (snapshot.payload.val().name != undefined) {
        rolesName = snapshot.payload.val().name;
        let userData = new Roles (rolesId, rolesName);
        this.roles.push(userData);
      }
      //console.log("data id " + rolesId);
      //console.log("data login " + rolesName);
      })
    });
  }
  getUserByUid(uid: string) {
    this._db.object(`user/${uid}`).snapshotChanges()
    .subscribe(snapshots=>{
      var userUid = "";
      var userEmail = "";
      var roleUserLogin = "";
      var userRoles : Roles;
      userUid = snapshots.payload.val().uid;
      userEmail = snapshots.payload.val().email;
      roleUserLogin = snapshots.payload.val().login;
      userRoles = snapshots.payload.val().roles;
      let userData = new User (userUid, userEmail, roleUserLogin, userRoles);
      return userData;
    })
  }
  public makeIdOrName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  //faz update à base de dados com informação depois do login
  //apenas se o role do utilizador nao esta ja definido na base de dados
  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
       this.updateUserData(credential.user);
      })
  }
  private updateUserData(authData) {
    const rolesId ="";
    const rolesName = "";
    const rolesUserData = new Roles(rolesId, rolesName);
    const userData = new User(authData.uid, authData.email, authData.displayName, rolesUserData);
    const ref = this._db.object('user/' + authData.uid);
    ref.valueChanges().take(1)
       .subscribe(user => {
        if ( (authData.uid != undefined) && (authData.email != undefined) && (authData.displayName != undefined) && (rolesUserData != undefined) && (authData != null)  && (authData != undefined)) {
          if (!(this._db.object('user/uid/' + authData.uid) == this._db.object('roles/id/' + rolesUserData.id))) {
            //console.log(userData.uid);
            //console.log(userData.email);
            //console.log(userData.roles);
            //console.log(authData.displayName);
            ref.update(userData);
          }
          else {
            console.log("Este utilizador já está autenticado");
          }
      }
    })
   
    const ref2 = this._db.object('roles/' + rolesUserData.id);
    ref2.valueChanges().take(1)
       .subscribe(user => {
        if ( (rolesUserData.id != undefined) && (rolesUserData.name != undefined) && (rolesUserData != null)  && (rolesUserData != undefined)) {
          //console.log(rolesUserData.id);
          //console.log(rolesUserData.name);
          ref2.update(rolesUserData);
        }
    })
  }
  userlogout() {
    this.afAuth.auth.signOut();
  }
   // determina se o user está interligado com a role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  canEdit (user: User) : boolean {
    const allowed = ['id', 'name']
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['id']
    return this.checkAuthorization(user, allowed)
  }

  editUserPost(userUid, newDataemail, newDatalogin) {
    const rolesId ="";
    const rolesName = "";
    const rolesUserData = new Roles(rolesId, rolesName);
    const userData = new User(userUid, newDataemail, newDatalogin, rolesUserData);
    const ref1 = this._db.object('user/' + userUid);
   /* console.log("antes " + userUid);
      console.log("antes " + newDataemail);
      console.log("antes " + newDatalogin);
      console.log("antes " + rolesUserData);*/
    if (this.canEdit) {
      ref1.valueChanges().take(1)
        .subscribe(user => {
          if ( (userData.uid != undefined) && (userData.email != undefined) && (userData.login != undefined) && (userData.roles != undefined) && (userData != undefined) && (userData != null) && (newDataemail != "") && (newDatalogin != "") && (userUid !="")) {
              //console.log(userData.uid);
              //console.log(userData.email);
              //console.log(userData.roles);
              //console.log(userData.login);
              ref1.update(userData);
            }
        });
    }
    else {
      alert("Acção cancelada");
    }
  }
  editRolesPost(rolesId, newData) {
    const rolesData = new Roles(rolesId, newData);
    if (this.canEdit) {
      //console.log("antes id " + rolesId);
      //console.log("antes name" + newData);
      //console.log("type " + typeof newData);
      //console.log("type " + newData.length);
      if ( (rolesId != undefined) && (newData != undefined) && (newData != null) && (rolesId != '')  && (newData != '') ) {
        this._db.object( 'roles/' + rolesId).update(rolesData);
      }
    }
    else {
      alert("Acção cancelada");
    }
  }
  editRolesUserPost(userUid, rolesId, rolesname) {
    const userRolesData = new Roles(rolesId, rolesname);
    if (this.canEdit) {
      if ( (rolesId != undefined) && (rolesname != undefined) && (rolesId != '') && (rolesname != '') && (userUid != '')) {
        this._db.object(`user/${userUid}/roles/${rolesId}`).update(userRolesData);
      }
    }
    else {
      alert("Acção cancelada");
    }
  }
  createUserPost() {
    const rolesName = this.makeIdOrName();
    const rolesId = this.makeIdOrName();
    const authDataUid = this.makeIdOrName();
    const authDataEmail: string = 'example@gmail.com';
    const authDataName = this.makeIdOrName();
    const rolesUserData = new Roles(rolesId, rolesName);
    const userData = new User(authDataUid, authDataEmail, authDataName, rolesUserData);
    const ref = this._db.object('user/' + authDataUid);
    ref.valueChanges().take(1)
      .subscribe(user => {
      if ((authDataUid != undefined) && (authDataEmail != undefined) && (authDataName != undefined) && (rolesUserData != undefined) && (userData != null)  && (userData != undefined) && (authDataEmail != '') && (authDataName!= '') && (authDataUid != '')) {
          //console.log(userData.uid);
          //console.log(userData.email);
          //console.log(userData.roles);
          //console.log(authData.displayName);
          ref.update(userData);
        }
      })
  }
  createRolesPost() {
    const rolesId = this.makeIdOrName();
    const rolesName = this.makeIdOrName();
    const rolesUserData = new Roles(rolesId, rolesName);
    const ref2 = this._db.object('roles/' + rolesId);
      ref2.valueChanges().take(1)
         .subscribe(user => {
          if ( (rolesId != undefined) && (rolesName != undefined) && (rolesUserData != null) && (rolesId !='') && (rolesName != '')) {
            //console.log(rolesUserData.id);
            //console.log(rolesUserData.name);
            ref2.update(rolesUserData);
          }
      })
  }
  createRolesUserPost(userUid) {
    //console.log("uid " + userUid);
    const rolesId = this.makeIdOrName();
    const rolesName = this.makeIdOrName();
    const rolesUserData = new Roles(rolesId, rolesName);
    const ref2 = this._db.object(`user/${userUid}/roles/${rolesId}/`);
      ref2.valueChanges().take(1)
         .subscribe(user => {
          if ( (rolesId != undefined) && (rolesName != undefined) && (rolesUserData != null) && (rolesId != '') && (rolesName != '')) {
            //console.log(rolesUserData.id);
            //console.log(rolesUserData.name);
            ref2.update(rolesUserData);
          }
      })

  }
  canUserDelete(user) {
    if ( (user != undefined) && (user != null)) {
      if (this.canDelete) {
        this._db.object(`user/${user.uid}/`).remove();
      }
    }
    else {
      alert("Acção cancelada");
    } 
  }
  canRolesDelete(roles) {
    if ( (roles != undefined) && (roles != null)) {
      if (this.canDelete) {
          this._db.object( 'roles/' + roles.id).remove();
      }
      else {
        alert("Acção cancelada");
      }
    }
  }
  canRolesUserDelete(userUid,roles) {
    if ( (roles != undefined) && (roles != null) && (userUid != '')) {
      if (this.canDelete) {
          this._db.object(`user/${userUid}/roles/${roles.id}/`).remove();
      }
      else {
        alert("Acção cancelada");
      }
    }
  }
}