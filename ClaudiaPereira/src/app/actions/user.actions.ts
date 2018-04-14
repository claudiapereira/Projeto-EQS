import { Action } from '@ngrx/store';
import { User, Roles } from '../models/user.model';
export const GET_USER               = '[Auth] Buscar usuario';
export const AUTHENTICATED          = '[Auth] Autentificação';
export const NOT_AUTHENTICATED      = '[Auth] Não autentificado';
export const GOOGLE_LOGIN           = '[Auth] Login com google';
export const LOGOUT                 = '[Auth] Logout';
export const AUTH_ERROR             = '[Auth] Erro autentificação';
/// Buscar estado do usuario
export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload?: any) {}
}
export class Authenticated implements Action {
    readonly type = AUTHENTICATED;
    constructor(public payload?: any) {}
}
export class NotAuthenticated implements Action {
    readonly type = NOT_AUTHENTICATED;
    constructor(public payload?: any) {}
}
export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload?: any) {}
}
export class GoogleLogin implements Action {
    readonly type = GOOGLE_LOGIN;
    constructor(public payload?: any) {}
}
/// Logout Actions
export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload?: any) {}
}
export type All
= GetUser 
| Authenticated
| NotAuthenticated
| GoogleLogin
| AuthError
| Logout;