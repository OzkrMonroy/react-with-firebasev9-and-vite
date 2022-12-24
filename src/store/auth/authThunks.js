import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  updateUserProfile,
} from "../../firebase/config";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
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
