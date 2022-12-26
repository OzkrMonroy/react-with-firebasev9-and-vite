import {
  checkUserSession,
  signInWithGoogle,
  signOutUser,
  signUpWithEmailAndPassword,
  singInWithEmailAndPassword,
  updateUserProfile,
} from "../../firebase/config";
import { loadNotesAction } from "../journal";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    checkUserSession((user) => {
      if (user?.uid) {
        const { displayName, email, photoURL, uid } = user;
        dispatch(login({ displayName, email, photoURL, uid }));
        dispatch(loadNotesAction());
        return;
      }
      dispatch(logout());
    });
  };
};

export const onGoogleSignIn = () => async (dispatch) => {
  dispatch(checkingCredentials());
  try {
    const { user } = await signInWithGoogle();
    const { displayName, email, photoURL, uid } = user;
    dispatch(login({ displayName, email, photoURL, uid }));
  } catch (error) {
    dispatch(logout({ errorMessage: error.message }));
  }
};

export const onSignupWithEmailAndPassword =
  (email, password, displayName) => async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const { user } = await signUpWithEmailAndPassword(email, password);
      const { uid, photoURL } = user;
      await updateUserProfile(user, displayName);

      dispatch(login({ uid, photoURL, email, displayName }));
    } catch (error) {
      dispatch(logout({ errorMessage: error.message }));
    }
  };

export const onSignInWithEmailAndPassword =
  (email, password) => async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const { user } = await singInWithEmailAndPassword(email, password);
      const { uid, photoURL, displayName } = user;
      dispatch(login({ uid, photoURL, displayName, email }));
    } catch (error) {
      dispatch(logout({ errorMessage: error.message }));
    }
  };

export const onLogoutAction = () => async (dispatch) => {
  try {
    await signOutUser();
    dispatch(logout());
  } catch (error) {
    console.log("Error to execute logout", error);
  }
};
