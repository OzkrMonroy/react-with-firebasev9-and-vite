import {
  checkingCredentialsAction,
  onGoogleSignIn,
  onLogoutAction,
  onSignInWithEmailAndPassword,
} from "../../../src/store/auth/authThunks";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  signInWithGoogle,
  signOutUser,
  singInWithEmailAndPassword,
} from "../../../src/firebase/config";
import { demoUser } from "../../fixtures/authFixtures";
import { clearNotes } from "../../../src/store/journal/journalSlice";

jest.mock("../../../src/firebase/config");

describe("Tests for AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("[checkingCredentialsAction] - should call checkingCredentials", async () => {
    const result = await checkingCredentialsAction();
    result(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("[onGoogleSignIn - success] - should return the user when signInWithGoogle is called and set the user as authenticated", async () => {
    await signInWithGoogle.mockResolvedValue({ user: demoUser });
    await onGoogleSignIn()(dispatch);

    const { displayName, email, photoURL, uid } = demoUser;
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({ displayName, email, photoURL, uid })
    );
  });

  test("[onGoogleSignIn - error] - should return a message error when signInWithGoogle is called and call logout with the message", async () => {
    await signInWithGoogle.mockRejectedValue({ message: "error 1" });
    await onGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: "error 1" }));
  });

  test("[onSignInWithEmailAndPassword - success] - should return the user when onSignInWithEmailAndPassword is called and call checkingCredentials and login reducers", async () => {
    await singInWithEmailAndPassword.mockResolvedValue({ user: demoUser });
    await onSignInWithEmailAndPassword(demoUser.email, "123456")(dispatch);

    const { displayName, email, photoURL, uid } = demoUser;
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({ displayName, email, photoURL, uid })
    );
  });

  test("[onLogoutAction] - should call signOutUser, clearNotes and logout", async () => {
    await onLogoutAction()(dispatch);

    expect(signOutUser).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(clearNotes());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
