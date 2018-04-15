import { combineReducers, createSelector, ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as fromHero from './reducers/heroes.reducers';

export default interface AppState {
    heroes: fromHero.HeroReducer;
}

export { AppState };

const reducersDefinition: ActionReducerMap<AppState> = {
    heroes: fromHero.HeroReducer,
};

export const appReducers = reducersDefinition;

// Heróis

export const getHeroesState = (state: AppState) => state.heroes;

export const getHeroesArray = (state: AppState) => state.heroes.data;

export const getHeroDetails = (state: AppState) => state.heroes.hero;
