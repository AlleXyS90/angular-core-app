import {MetaData} from './meta-data';

export enum Meta {
  LOGIN = 'login',
  REGISTER = 'register',
  PROFILE = 'profile',
  HOMEPAGE = 'homepage'
}

export const MetaList: Map<string, MetaData> = new Map<string, MetaData>([
  [Meta.LOGIN, {title: 'Login', description: 'Login page'}],
  [Meta.REGISTER, {title: 'Register', description: 'Register page'}],
  [Meta.PROFILE, {title: 'Profile', description: 'Profile page'}],
  [Meta.HOMEPAGE, {title: 'Homepage', description: 'Homepage'}]
]);
