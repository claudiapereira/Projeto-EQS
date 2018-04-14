export * from '../actions/user.actions';
export * from '../models/user.model';
export * from '../reducers/user.reducer';
//export * from '../effects/users.effects';
export interface Post {
    text: string;
    likes: number;
    pushKey: string;
    loading: boolean;
    error?: string;
}