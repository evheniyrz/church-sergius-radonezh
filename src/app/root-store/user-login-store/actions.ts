import { createAction, props } from '@ngrx/store';
import { LoginPayload, UserLoginState } from './models/login-payload.model';


export enum AdminLoginActionTypes {
  ADMIN_ACCESS_ALLOWED = '[ADMIN DASHBOARD ] Admin access allowed',
  ADMIN_ACCESS_DENIED = '[ADMIN DASHBOARD ] Admin access denied',
  CHECK_USER_ACCESS = '[ADMIN DASHBOARD] Check user access',
  LOAD_POSTS = '[ADMIN DASHBOARD] Load posts',
  LOAD_POSTS_SUCCESS = '[ADMIN DASHBOARD] Load posts success',
  LOAD_POSTS_FAILURE = '[ADMIN DASHBOARD] Load posts failure',
  LOAD_TIMETABLE = '[ADMIN DASHBOARD] Load timetable',
  LOAD_TIMETABLE_SUCCESS = '[ADMIN DASHBOARD] Load timetable success',
  LOAD_TIMETABLE_FAILURE = '[ADMIN DASHBOARD] Load timetable failure',
  LOGIN_ADMIN_PAGE = '[ADMIN DASHBOARD LOGIN PAGE] Login',
  LOGIN_ADMIN_SUCCESS = '[ADMIN DASHBOARD LOGIN ] Login success',
  LOGIN_ADMIN_FAILURE = '[ADMIN DASHBOARD LOGIN ] Login failure',
  LOGIN_ADMIN_EXISTS = '[ADMIN DASHBOARD LOGIN ] Login admin exist',
  LOGIN_USER_DOES_NOT_EXIST = '[ADMIN DASHBOARD LOGIN ] Login user does not exist',
  LOGIN_USER_CHECK_EXPIRED_DATE = '[ADMIN DASHBOARD LOGIN] Login user check expired date',
  LOGIN_USER_REMOVE_CREDENTIAL = '[ADMIN DASHBOARD LOGIN] Login user remove credential',
  GET_ADMIN_ACCESS = '[USER CREDENTIAL] Get admin access'
}

/**
 * open login page
 * when Admin credentials are missing or the token has expired
 */
export const adminLogin = createAction(
  AdminLoginActionTypes.LOGIN_ADMIN_PAGE
);

/**
 * check if access to the admin panel is allowed
 * according to the provided registration data
 */
export const getAdminAccess = createAction(
  AdminLoginActionTypes.GET_ADMIN_ACCESS,
  props<{ credentials: LoginPayload }>()
);

/**
 * When access to resource is allowed
 */
export const adminAccessAllowed = createAction(
  AdminLoginActionTypes.ADMIN_ACCESS_ALLOWED,
  props<UserLoginState>()
);

/**
 * When access is denied
 */
export const adminAccessDenied = createAction(
  AdminLoginActionTypes.ADMIN_ACCESS_DENIED,
  props<any>()
);

/**
 * Check credential is expired
 */
export const checkExpiredDate = createAction(
  AdminLoginActionTypes.LOGIN_USER_CHECK_EXPIRED_DATE,
  props<{ id: string }>()
);

/**
 * Remove credential from store
 */
export const removeCredential = createAction(
  AdminLoginActionTypes.LOGIN_USER_REMOVE_CREDENTIAL,
  props<{ id: string }>()
);
