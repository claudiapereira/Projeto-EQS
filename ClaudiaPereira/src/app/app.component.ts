import { Routes } from '@angular/router';
import { Component, OnInit, NgModule, ViewChild, VERSION, ElementRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { Store } from '@ngrx/store';
import { User } from './models/user.model';
import { Roles } from './models/user.model';
import { AppState } from './state/state';
import * as userActions from './actions/user.actions';
import { EffectsModule } from "@ngrx/effects";
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { GoogleAuthProvider } from '@firebase/auth-types';
export type Action = userActions.All;

@Component({
  //moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'aplicação web de autentificação';
  displayName = "GUEST";
  user$: Observable<User>;
  role$: Observable<Roles>;
  roles: Roles;
  private contentEditableRoles: boolean = false;
  private contentEditableUser: boolean = false;
  private contentEditableRolesUser: boolean = false;
  private contentEditableButtonsEmailorLogin: boolean = false;
  private contentEditableButtons: boolean = false;
  private styleRoles: String = 'none';
  private styleUser: String = 'none';
  private styleRolesUser: String = 'none';
  private styleUserButtonsUsers: String = 'block';
  private styleUserButtonsRoles: String = 'block';
  private styleUserButtonsRolesUsers: String = 'block';
  private styleUserButtonsUsersTables: String = 'none';
  private styleUserButtonsRolesUsersTables: String = 'none';
  private styleUserContentRoles: String = 'none'
  private styleUserButtonsRolesTable: String = 'none';
  private styleUserFielsetRolesUsers: String = 'none';
  private styleUserUsersTablesTr: String = '';
  private styleUsersTable: String = 'none';
  private getUserRoles = [];
  private getRoles = [];
  private getUser = [];
  private newAttribute: any = {};
  currentUserUid: string;
  currentUserName: string;
  index=1;
  users = new BehaviorSubject([]);
  group = 4;         //tamanho de cada query
  lastKey = ''      //chave para compensar a proxima query
  finished = false  //tipo boolean quando chega ao fim da base de dados 

  constructor( private store: Store<AppState>,  private _dataService: DataService, private afAuth: AngularFireAuth)  {}
  ngOnInit() {
    this.user$ = this.store.select('user');
    this.role$ = this.store.select('roles');
    this.store.dispatch(new userActions.GetUser());
    this._dataService.getUsers();
    this._dataService.getRoles();
    this.getUsersList();
  }
  onScroll () {
    //console.log('scrolled!!')
    this.getUsersList();
  }

  private getUsersList(key?) {
    if (this.finished) { return; }
    this._dataService.getUsersScroll(this.group+1, this.lastKey)
    .do (users => {
          // coloca a ultima key em preparação para a proxima
          this.lastKey = _.last(users)['$key']
          const newUsers = _.slice(users, 0, this.group)

          // Busca os utilizadores atuais no BehaviorSubject
          const currentUsers = this.users.getValue()

          /// Se a informação for identica, para de fazer queries
          if (this.lastKey == _.last(newUsers)['$key']) {
            this.finished = true
          }

          // Concatena novos utilizadores para users atuais
          this.users.next( _.concat(currentUsers, newUsers) )
        })
        .take(1)
        .subscribe()
  } 
  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
  }
  logout() {
    this.store.dispatch(new userActions.Logout());
  }
  isLoggedInWithGoogle() {
    if(this.user$ == null) {
      return false;
    }
    return true;
  }
  private googleUserLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this._dataService.oAuthLogin(provider);
  }
  public calleditUserPost(userUid, email, login) {
    this._dataService.editUserPost(userUid, email, login);
  }
  public calleditRolesPost(rolesId, newData) {
    this._dataService.editRolesPost(rolesId, newData);
  }
  public calleditRolesUserPost(roles, id, name) {
    const userUId = this.currentUserUid;
    this._dataService.editRolesUserPost(userUId, id, name);
  }
  public callcreateUserPost() {
    this._dataService.createUserPost();
  }
  public callcreateRolesPost() {
    this._dataService.createRolesPost();
  }
  public callcreateRolesUserPost() {
    const userUId = this.currentUserUid;
    this._dataService.createRolesUserPost(userUId);
  }
  public callcanUserDelete(user) {
    this._dataService.canUserDelete(user);
  }
  public callcanRolesDelete(roles) {
    this._dataService.canRolesDelete(roles);
  }
  public callcanRolesUserDelete(roles) {
    const userUId = this.currentUserUid;
    this._dataService.canRolesUserDelete(userUId, roles);
  }
  public callgetUserRole(userUid, userLogin) {
    for(var i = this.getUserRoles.length - 1; i >= 0; i--) {
      this.getUserRoles.splice(i, 1);
    }
    if (this.styleUserFielsetRolesUsers == 'none') {
      this.styleUserFielsetRolesUsers = 'inline-block';
    }
    else {
      this.styleUserFielsetRolesUsers = 'none';
    }/*
    if (this.styleUserButtonsRolesUsersTables == 'none') {
      this.styleUserButtonsRolesUsersTables = 'inline-block';
    }
    else {
      this.styleUserButtonsRolesUsersTables = 'none';
    }*/
    if (this.styleUserButtonsUsersTables == 'none') {
      this.styleUserButtonsUsersTables = 'inline-block';
    }
    else {
      this.styleUserButtonsUsersTables = 'none';
    }
    this.currentUserUid=userUid;
    this.currentUserName=userLogin;
    //console.log("username " + this.currentUserName);
    this._dataService.getUserRole(this.currentUserUid);
    this.getUserRoles = this._dataService.userRoles;
  }
  public callListUserRoles() {
    this.getUserRoles = this._dataService.userRoles;
    if (this.styleUserButtonsRolesUsersTables == 'none') {
      this.styleUserButtonsRolesUsersTables = 'inline-block';
    }
    else {
      this.styleUserButtonsRolesUsersTables = 'none';
    }
    if (this.getUserRoles.length == 0) {
      this.getUserRoles.push(this.newAttribute);
    }
  }
  public callgetUsers() {
    this.getUser = this._dataService.users;
    if (this.styleUserButtonsUsersTables == 'block') {
      this.styleUserButtonsUsersTables = 'none';
    }
    else {
      this.styleUserButtonsUsersTables = 'block';
    }
    if (this.styleUsersTable == 'none') {
      this.styleUsersTable = 'inline-block';
    }
    else {
      this.styleUsersTable = 'none';
    }
    
    if (this.getUser.length == 0) {
      this.getUser.push(this.newAttribute);
    }
  }
  public callgetRoles() {
    this.getRoles = this._dataService.roles;
    if (this.styleUserContentRoles == 'block') {
      this.styleUserContentRoles = 'none';
      this.styleUserButtonsRolesTable = 'none';
    }
    else {
      this.styleUserContentRoles = 'block';
      this.styleUserButtonsRolesTable = 'inline-block';
    }
    if (this.getRoles.length == 0) {
      this.getRoles.push(this.newAttribute);
    }
  }
  public selectContentRoles() {
    if (this.styleRoles == 'none') {
      this.styleRoles = 'block';
      this.contentEditableRoles = true;
      this.styleUserButtonsRoles = 'none';
    }
    else {
      this.styleRoles = 'none';
      this.contentEditableRoles = false;
      this.styleUserButtonsRoles = 'block';
    }
  }
  public selectContentUsers() {
    if (this.styleUser == 'none'){
      this.styleUser = 'block';
      this.contentEditableUser = true;
      this.styleUserButtonsUsers = 'none';
    }
    else {
      this.styleUser = 'none';
      this.contentEditableUser = false;
      this.styleUserButtonsUsers = 'block';
    }
  }
  public selectContentUserRoles() {
    if (this.styleRolesUser == 'none'){
      this.styleRolesUser = 'block';
      this.contentEditableRolesUser = true;
      this.styleUserButtonsRolesUsers = 'none';
    }
    else {
      this.styleRolesUser = 'none';
      this.contentEditableRolesUser = false;
      this.styleUserButtonsRolesUsers = 'block';
    }
  }
  public addColumnValueUser() {
    for(var i = this.getUser.length - 1; i >= 0; i--) {
      this.getUser.splice(i, 1);
    }
    this.getUser = this._dataService.users;
  }
  public addColumnValueRoles() {
    for(var i = this.getRoles.length - 1; i >= 0; i--) {
      //console.log("remove " + i);
      this.getRoles.splice(i, 1);
    }
    this.getRoles = this._dataService.roles;
  }
  public addColumnValueUserRoles(user) {
    for(var i = this.getUserRoles.length - 1; i >= 0; i--) {
      //console.log("remove " + i);
      this.getUserRoles.splice(i, 1);
    }
    this.addColumnValueUser();
    for(var i = this.getUser.length - 1; i >= 0; i--) {
      this.getUserRoles.splice(i, 1);
    }
    for(var i = this.getRoles.length - 1; i >= 0; i--) {
      this.getUserRoles.splice(i, 1);
    }
    this.getUserRoles = this._dataService.userRoles;
  }
  public deleteColumnValueUser(user) {
    for(var i = this.getUser.length - 1; i >= 0; i--) {
      //console.log("remove " + i);
      this.getUser.splice(i, 1);
    }
    this.getUser = this._dataService.users;
  }
  public deleteColumnValueRoles() {
    for(var i = this.getRoles.length - 1; i >= 0; i--) {
      //console.log("remove " + i);
      this.getRoles.splice(i, 1);
    }
    this.getRoles = this._dataService.roles;
  }
  public deleteColumnValueUserRoles(user) {
    for(var i = this.getUserRoles.length - 1; i >= 0; i--) {
        //console.log("remove " + i);
        this.getUserRoles.splice(i, 1);
    }
    this.getUserRoles = this._dataService.userRoles;
    this.deleteColumnValueUser(this.currentUserUid);
  }
}