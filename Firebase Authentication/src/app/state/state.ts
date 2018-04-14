import { Post } from '../posts/posts';
import { User } from "../models/user.model";
import { Roles } from "../models/user.model";

export interface AppState {
  post: Post;
  user: User;
  roles: Roles;
}