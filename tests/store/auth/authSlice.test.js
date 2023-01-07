import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import { authState, demoUser, initialState } from "../../fixtures/authFixtures";

describe("AuthSlice tests", () => {
  test("should return the initial state and its name should to be auth", () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("[login] - should execute the authentication", () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      ...authState,
      ...demoUser,
    });
  });

  test("[logout] - should execute the logout action without error message", () => {
    const state = authSlice.reducer(authState, logout());

    expect(state).toEqual({
      ...initialState,
      status: "not-authenticated",
      errorMessage: undefined,
    });
  });

  test("[logout] - should execute the logout action with an error message", () => {
    const errorMessage = "Wrong credentials";
    const state = authSlice.reducer(authState, logout({ errorMessage }));

    expect(state).toEqual({
      ...initialState,
      status: "not-authenticated",
      errorMessage,
    });
  });

  test("[checkingCredentials] - should change the status value while the credentials are checked", () => {
    const state = authSlice.reducer(initialState, checkingCredentials());
    expect(state).toEqual({ ...initialState, status: "checking" });
  });
});
