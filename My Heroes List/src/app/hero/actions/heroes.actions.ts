import { Action } from '@ngrx/store';

export const GET_HEROES             = '[Heroes] Buscar herois';
export const GET_HEROES_SUCCESS     = '[Heroes] Buscar herois sucesso';
export const GET_HERO               = '[Heroes] Buscar heroi por id';
export const GET_HERO_SUCCESS       = '[Heroes] Buscar heroi por id sucesso';
export const ADD_HEROES             = '[Heroes] Adicionar Heroi';
export const ADD_HEROES_SUCCESS     = '[Heroes] Adicionar Heroi sucesso';
export const EDIT_HEROES            = '[Heroes] Editar Heroi';
export const EDIT_HEROES_SUCCESS    = '[Heroes] Editar Heroi sucesso';
export const REMOVE_HEROES          = '[Heroes] Remover heroi';
export const REMOVE_HEROES_SUCCESS  = '[Heroes] Remover heroi sucesso';
export const HEROES_ERROR           = '[Heroes] Erro heroi';

export class GetHeroes implements Action {
    readonly type = GET_HEROES;
    constructor(public payload?: any) { }
}
export class GetHeroesSuccess implements Action {
    readonly type = GET_HEROES_SUCCESS;
    constructor(public payload?: any) { }
}
export class GetHeroById implements Action {
    readonly type = GET_HERO;
    constructor(public payload?: any) { }
}
export class GetHeroByIdSuccess implements Action {
    readonly type = GET_HERO_SUCCESS;
    constructor(public payload?: any) { }
}
export class AddHeroes implements Action {
    readonly type = ADD_HEROES;
    constructor(public payload?: any) { }
}
export class AddHeroesSuccess implements Action {
    readonly type = ADD_HEROES_SUCCESS;
    constructor(public payload?: any) { }
}
export class EditHeroes implements Action {
    readonly type = EDIT_HEROES;
    constructor(public payload?: any) { }
}
export class EditHeroesSuccess implements Action {
    readonly type = EDIT_HEROES_SUCCESS;
    constructor(public payload?: any) { }
}
export class RemoveHeroes implements Action {
    readonly type = REMOVE_HEROES;
    constructor(public payload?: any) { }
}
export class RemoveHeroesSuccess implements Action {
    readonly type = REMOVE_HEROES_SUCCESS;
    constructor(public payload?: any) { }
}
export class HeroesError implements Action {
    readonly type = HEROES_ERROR;
    constructor(public payload?: any) { }
}
export type All
    = GetHeroes
    | GetHeroesSuccess
    | GetHeroById
    | GetHeroByIdSuccess
    | AddHeroes
    | AddHeroesSuccess
    | EditHeroes
    | EditHeroesSuccess
    | RemoveHeroes
    | RemoveHeroesSuccess
    | HeroesError;
