import * as userActions from '../actions/heroes.actions';

import { Hero } from '../models/heroe.model';
export type Action = userActions.All;

export interface HeroReducer {
    hero: Hero;
    data: Hero[];
}

const initialState: HeroReducer = {
    hero: {} as Hero,
    data: [],
};

export function HeroReducer(state = initialState, action: Action): HeroReducer {
    switch (action.type) {
        case userActions.GET_HEROES_SUCCESS:
            return { ...state, data: action.payload };

        case userActions.GET_HERO_SUCCESS:
            return { ...state, hero: action.payload };

        case userActions.ADD_HEROES_SUCCESS:
            return { ...state, hero: {} as Hero };

        case userActions.EDIT_HEROES_SUCCESS:
            return { ...state, hero: {} as Hero };

        case userActions.REMOVE_HEROES_SUCCESS:
            return { ...state, data: state.data.filter(x => !(x.id === action.payload)) };

        default:
            return state;
    }
}
