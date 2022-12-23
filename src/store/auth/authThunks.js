import { signInWithGoogle } from "../../firebase/config";
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
    console.log({ error });
    dispatch(logout({ errorMessage: error.message }));
  }
};
